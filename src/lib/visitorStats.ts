export type VisitorStats = {
  todayVisitors: number;
  totalVisitors: number;
};

const defaultSupabaseUrl = "https://lqlccyghzxhrbvyzpqkr.supabase.co";
const defaultSupabaseAnonKey = "sb_publishable_9ncEs05_DBWkoncijqYT6Q_sfF0AzV8";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? defaultSupabaseUrl;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? defaultSupabaseAnonKey;
const visitorStorageKey = "hongeomap:visitor-id";

export const isVisitorStatsConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function getBackend() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("VISITOR_STATS_NOT_CONFIGURED");
  }

  return {
    anonKey: supabaseAnonKey,
    url: supabaseUrl.replace(/\/$/, ""),
  };
}

function getKoreaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date());
}

function createVisitorId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function getVisitorId() {
  const storedId = window.localStorage.getItem(visitorStorageKey);

  if (storedId) {
    return storedId;
  }

  const nextId = createVisitorId();
  window.localStorage.setItem(visitorStorageKey, nextId);
  return nextId;
}

export async function trackVisit() {
  const backend = getBackend();
  const response = await fetch(`${backend.url}/rest/v1/rpc/hongeo_track_visit`, {
    method: "POST",
    headers: {
      apikey: backend.anonKey,
      Authorization: `Bearer ${backend.anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_visit_date: getKoreaDate(),
      p_visitor_id: getVisitorId(),
    }),
  });

  if (!response.ok) {
    throw new Error("VISITOR_STATS_FAILED");
  }

  const data = (await response.json()) as Array<{
    today_visitors: number | string;
    total_visitors: number | string;
  }>;
  const stats = data[0];

  if (!stats) {
    throw new Error("VISITOR_STATS_EMPTY");
  }

  return {
    todayVisitors: Number(stats.today_visitors),
    totalVisitors: Number(stats.total_visitors),
  } satisfies VisitorStats;
}
