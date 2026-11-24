import { collectReportMessages, makeReportPayload, type ReportMessage, type ReportSubmission } from "./reportInboxModel";
export type { ReportMessage } from "./reportInboxModel";

export type AdminSession = {
  accessToken: string;
  loginId: string;
};

const defaultSupabaseUrl = "https://lqlccyghzxhrbvyzpqkr.supabase.co";
const defaultSupabaseAnonKey = "sb_publishable_9ncEs05_DBWkoncijqYT6Q_sfF0AzV8";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? defaultSupabaseUrl;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? defaultSupabaseAnonKey;
const adminAuthDomain = (import.meta.env.VITE_ADMIN_AUTH_DOMAIN as string | undefined) ?? "hongeomap.local";
const sessionStorageKey = "hongeomap:admin-session";

export const isReportBackendConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function assertReportBackend() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("REPORT_BACKEND_NOT_CONFIGURED");
  }

  return {
    anonKey: supabaseAnonKey,
    url: supabaseUrl.replace(/\/$/, ""),
  };
}

function getHeaders(accessToken?: string) {
  const backend = assertReportBackend();

  return {
    apikey: backend.anonKey,
    Authorization: `Bearer ${accessToken ?? backend.anonKey}`,
    "Content-Type": "application/json",
  };
}

export async function submitReport(submission: ReportSubmission) {
  const backend = assertReportBackend();
  const response = await fetch(`${backend.url}/rest/v1/hongeo_reports`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(makeReportPayload(submission)),
  });

  if (!response.ok) {
    throw new Error("REPORT_SUBMIT_FAILED");
  }
}

export function getAdminAuthEmail(loginId: string) {
  const trimmedLoginId = loginId.trim().toLowerCase();

  if (trimmedLoginId.includes("@")) {
    return trimmedLoginId;
  }

  return `${trimmedLoginId}@${adminAuthDomain}`;
}

function getAdminLoginId(authEmail: string) {
  const suffix = `@${adminAuthDomain}`;
  return authEmail.endsWith(suffix) ? authEmail.slice(0, -suffix.length) : authEmail;
}

export async function signInAdmin(loginId: string, password: string) {
  const backend = assertReportBackend();
  const authEmail = getAdminAuthEmail(loginId);
  const response = await fetch(`${backend.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email: authEmail,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("ADMIN_SIGN_IN_FAILED");
  }

  const data = (await response.json()) as { access_token: string; user: { email?: string } };
  const session: AdminSession = {
    accessToken: data.access_token,
    loginId: getAdminLoginId(data.user.email ?? authEmail),
  };

  const isAdmin = await verifyAdminSession(session.accessToken);

  if (!isAdmin) {
    throw new Error("ADMIN_PERMISSION_REQUIRED");
  }

  window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(session));
  return session;
}

export function getStoredAdminSession() {
  const rawSession = window.sessionStorage.getItem(sessionStorageKey);

  if (!rawSession) {
    return undefined;
  }

  try {
    return JSON.parse(rawSession) as AdminSession;
  } catch {
    window.sessionStorage.removeItem(sessionStorageKey);
    return undefined;
  }
}

export function clearStoredAdminSession() {
  window.sessionStorage.removeItem(sessionStorageKey);
}

export async function fetchReportMessages(accessToken: string) {
  const backend = assertReportBackend();
  return collectReportMessages(async (params) => {
    const response = await fetch(`${backend.url}/rest/v1/hongeo_reports?${params.toString()}`, {
      headers: getHeaders(accessToken),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("REPORT_FETCH_FAILED");
    return (await response.json()) as ReportMessage[];
  });
}

export async function verifyAdminSession(accessToken: string) {
  const backend = assertReportBackend();
  const params = new URLSearchParams({
    limit: "1",
    select: "user_id",
  });
  const response = await fetch(`${backend.url}/rest/v1/hongeo_admins?${params.toString()}`, {
    headers: getHeaders(accessToken),
  });

  if (!response.ok) {
    return false;
  }

  const rows = (await response.json()) as Array<{ user_id: string }>;
  return rows.length > 0;
}

export async function updateReportStatus(accessToken: string, report: Pick<ReportMessage, "id" | "status">, status: ReportMessage["status"]) {
  const backend = assertReportBackend();
  const params = new URLSearchParams({ id: `eq.${report.id}`, status: `eq.${report.status}`, select: "id,status" });
  const response = await fetch(`${backend.url}/rest/v1/hongeo_reports?${params}`, {
    method: "PATCH",
    headers: {
      ...getHeaders(accessToken),
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("REPORT_UPDATE_FAILED");
  }
  const changed = (await response.json()) as Pick<ReportMessage, "id" | "status">[];
  if (changed.length !== 1 || changed[0].id !== report.id || changed[0].status !== status) {
    throw new Error("REPORT_NOT_UPDATED");
  }
}
