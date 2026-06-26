export type ReportSubmission = {
  restaurantName: string;
  address: string;
  message: string;
};

export type AdminSession = {
  accessToken: string;
  email: string;
};

export type ReportMessage = {
  id: string;
  restaurant_name: string;
  address: string | null;
  message: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
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
    body: JSON.stringify({
      restaurant_name: submission.restaurantName.trim(),
      address: submission.address.trim() || null,
      message: submission.message.trim() || null,
    }),
  });

  if (!response.ok) {
    throw new Error("REPORT_SUBMIT_FAILED");
  }
}

export async function signInAdmin(email: string, password: string) {
  const backend = assertReportBackend();
  const response = await fetch(`${backend.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("ADMIN_SIGN_IN_FAILED");
  }

  const data = (await response.json()) as { access_token: string; user: { email?: string } };
  const session: AdminSession = {
    accessToken: data.access_token,
    email: data.user.email ?? email,
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
  const params = new URLSearchParams({
    order: "created_at.desc",
    select: "id,restaurant_name,address,message,status,created_at",
  });
  const response = await fetch(`${backend.url}/rest/v1/hongeo_reports?${params.toString()}`, {
    headers: getHeaders(accessToken),
  });

  if (!response.ok) {
    throw new Error("REPORT_FETCH_FAILED");
  }

  return (await response.json()) as ReportMessage[];
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

export async function updateReportStatus(accessToken: string, id: string, status: ReportMessage["status"]) {
  const backend = assertReportBackend();
  const response = await fetch(`${backend.url}/rest/v1/hongeo_reports?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      ...getHeaders(accessToken),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("REPORT_UPDATE_FAILED");
  }
}
