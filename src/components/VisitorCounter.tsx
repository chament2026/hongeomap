import { useEffect, useState } from "react";
import { UsersRound } from "lucide-react";
import { isVisitorStatsConfigured, trackVisit, type VisitorStats } from "../lib/visitorStats";

type CounterState = "loading" | "ready" | "error" | "disabled";

export function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>();
  const [state, setState] = useState<CounterState>(() => (isVisitorStatsConfigured ? "loading" : "disabled"));

  useEffect(() => {
    if (!isVisitorStatsConfigured) {
      return;
    }

    let cancelled = false;

    trackVisit()
      .then((nextStats) => {
        if (cancelled) {
          return;
        }

        setStats(nextStats);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setState("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "disabled") {
    return null;
  }

  return (
    <aside className={`visitor-counter ${state === "error" ? "is-error" : ""}`} aria-label="방문자 수">
      <UsersRound size={17} />
      {state === "ready" && stats ? (
        <>
          <span>
            오늘 <strong>{stats.todayVisitors.toLocaleString("ko-KR")}</strong>
          </span>
          <span>
            누적 <strong>{stats.totalVisitors.toLocaleString("ko-KR")}</strong>
          </span>
        </>
      ) : state === "error" ? (
        <span>방문자 집계 준비 중</span>
      ) : (
        <span>방문자 집계 중</span>
      )}
    </aside>
  );
}
