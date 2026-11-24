import { Archive, CheckCircle2, Inbox, LogOut, Mail, RefreshCw } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  clearStoredAdminSession,
  fetchReportMessages,
  getStoredAdminSession,
  isReportBackendConfigured,
  signInAdmin,
  updateReportStatus,
  verifyAdminSession,
  type AdminSession,
} from "../lib/reportBackend";
import { filterReportMessages, getReportCounts, type ReportFilter, type ReportMessage } from "../lib/reportInboxModel";

export function AdminInbox() {
  const [session, setSession] = useState<AdminSession | undefined>(() =>
    isReportBackendConfigured ? getStoredAdminSession() : undefined,
  );
  const [messages, setMessages] = useState<ReportMessage[]>([]);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [statusFilter, setStatusFilter] = useState<ReportFilter>("new");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const loadRevision = useRef(0);

  const messageCounts = useMemo(() => getReportCounts(messages), [messages]);
  const filteredMessages = useMemo(() => filterReportMessages(messages, statusFilter), [messages, statusFilter]);
  const statusTabs = [
    ["new", "새 제보", messageCounts.new],
    ["all", "전체", messageCounts.all],
    ["read", "읽음", messageCounts.read],
    ["archived", "보관", messageCounts.archived],
  ] as const;

  const loadMessages = async (activeSession = session) => {
    if (!activeSession) return;
    const revision = ++loadRevision.current;
    setStatus("loading");

    try {
      const nextMessages = await fetchReportMessages(activeSession.accessToken);
      if (revision !== loadRevision.current) return;
      setMessages(nextMessages);
      setHasLoaded(true);
      setStatus("idle");
    } catch {
      if (revision === loadRevision.current) {
        setMessages([]);
        setHasLoaded(false);
        setStatus("error");
      }
    }
  };

  useEffect(() => {
    if (!session) return;
    let isCurrent = true;

    verifyAdminSession(session.accessToken).then((isAdmin) => {
      if (!isCurrent) return;
      if (!isAdmin) {
        clearStoredAdminSession();
        setMessages([]);
        setHasLoaded(false);
        setSession(undefined);
        return;
      }

      void loadMessages(session);
    }).catch(() => {
      if (isCurrent) setStatus("error");
    });

    return () => {
      isCurrent = false;
      loadRevision.current += 1;
    };
  }, [session]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const nextSession = await signInAdmin(loginId, password);
      setSession(nextSession);
      setLoginId("");
      setPassword("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const handleStatusChange = async (report: ReportMessage, nextStatus: ReportMessage["status"]) => {
    if (!session || isChangingStatus) return;
    const revision = loadRevision.current;
    setIsChangingStatus(true);

    try {
      await updateReportStatus(session.accessToken, report, nextStatus);
      if (revision !== loadRevision.current) return;
      setMessages((current) =>
        current.map((message) => (message.id === report.id ? { ...message, status: nextStatus } : message)),
      );
    } catch {
      if (revision === loadRevision.current) setStatus("error");
    } finally {
      if (revision === loadRevision.current) setIsChangingStatus(false);
    }
  };

  const handleSignOut = () => {
    loadRevision.current += 1;
    clearStoredAdminSession();
    setSession(undefined);
    setMessages([]);
    setHasLoaded(false);
    setIsChangingStatus(false);
    setStatus("idle");
    setStatusFilter("new");
  };

  if (!isReportBackendConfigured) {
    return (
      <main className="admin-page">
        <section className="admin-panel">
          <div className="admin-title">
            <div>
              <h1>홍어맵</h1>
            </div>
          </div>
          <div className="admin-empty">
            <strong>준비 중입니다</strong>
          </div>
          <a className="admin-home-link" href="/">
            홍어맵으로 돌아가기
          </a>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <div className="admin-title">
            <div>
              <h1>홍어맵</h1>
            </div>
          </div>
          <form className="admin-login-form" onSubmit={handleSignIn}>
            <label>
              <span>아이디</span>
              <input
                autoComplete="off"
                name="hongeomap-admin-page-login-id"
                onChange={(event) => setLoginId(event.target.value)}
                required
                type="text"
                value={loginId}
              />
            </label>
            <label>
              <span>비밀번호</span>
              <input
                autoComplete="off"
                name="hongeomap-admin-page-login-secret"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            <button disabled={status === "loading"} type="submit">
              {status === "loading" ? "확인 중" : "로그인"}
            </button>
          </form>
          {status === "error" && <p className="admin-error">로그인 정보를 확인해주세요.</p>}
          <a className="admin-home-link" href="/">
            홍어맵으로 돌아가기
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-panel">
        <div className="admin-toolbar">
          <div className="admin-title">
            <Inbox size={22} />
            <div>
              <h1>홍어맛집제보</h1>
              <p>{session.loginId} 운영자 게시판</p>
            </div>
          </div>
          <div className="admin-actions">
            <a className="admin-home-link" href="/">
              홍어맵
            </a>
            <button disabled={status === "loading" || isChangingStatus} onClick={() => loadMessages()} type="button">
              <RefreshCw size={16} />
              새로고침
            </button>
            <button onClick={handleSignOut} type="button">
              <LogOut size={16} />
              로그아웃
            </button>
          </div>
        </div>

        {status === "error" && <p className="admin-error">쪽지함을 불러오지 못했습니다. 다시 시도해주세요.</p>}

        <div className="admin-status-tabs" aria-label="제보 상태 필터">
          {statusTabs.map(([key, label, count]) => (
            <button
              aria-pressed={statusFilter === key}
              className={statusFilter === key ? "is-active" : ""}
              key={key}
              onClick={() => setStatusFilter(key)}
              type="button"
            >
              <span>{label}</span>
              <strong>{hasLoaded ? count : "–"}</strong>
            </button>
          ))}
        </div>

        <div className="admin-message-list">
          {status === "loading" ? (
            <div className="admin-empty">
              <RefreshCw size={22} />
              <strong>제보글을 불러오는 중입니다</strong>
              <p>잠시만 기다려주세요.</p>
            </div>
          ) : !hasLoaded ? null : filteredMessages.length === 0 ? (
            <div className="admin-empty">
              <Mail size={22} />
              <strong>{messages.length === 0 ? "아직 도착한 제보가 없습니다" : "이 상태의 제보가 없습니다"}</strong>
              <p>
                {messages.length === 0
                  ? "방문자가 제보를 보내면 이곳에 게시글처럼 쌓입니다."
                  : "다른 상태 탭을 선택하면 이전 제보를 확인할 수 있습니다."}
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <article className={`admin-message ${message.status}`} key={message.id}>
                <div className="admin-message-head">
                  <div>
                    <span>{formatDate(message.created_at)}</span>
                    <h2>{message.restaurant_name}</h2>
                  </div>
                  <em>{getStatusLabel(message.status)}</em>
                </div>
                <dl>
                  <div>
                    <dt>주소/지역</dt>
                    <dd>{message.address || "미입력"}</dd>
                  </div>
                  <div>
                    <dt>제보 내용</dt>
                    <dd>{message.message || "미입력"}</dd>
                  </div>
                </dl>
                {(message.submitter_nickname || message.submitter_email) && (
                  <details className="admin-report-contact">
                    <summary>제보자 정보 (운영자 전용)</summary>
                    <dl>
                      {message.submitter_nickname && (
                        <div>
                          <dt>닉네임</dt>
                          <dd>{message.submitter_nickname}</dd>
                        </div>
                      )}
                      {message.submitter_email && (
                        <div>
                          <dt>이메일</dt>
                          <dd>{message.submitter_email}</dd>
                        </div>
                      )}
                    </dl>
                  </details>
                )}
                <div className="admin-message-actions">
                  <button disabled={isChangingStatus || message.status === "read"} onClick={() => handleStatusChange(message, "read")} type="button">
                    <CheckCircle2 size={15} />
                    읽음
                  </button>
                  <button disabled={isChangingStatus || message.status === "archived"} onClick={() => handleStatusChange(message, "archived")} type="button">
                    <Archive size={15} />
                    보관
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function getStatusLabel(status: ReportMessage["status"]) {
  if (status === "read") {
    return "읽음";
  }

  if (status === "archived") {
    return "보관";
  }

  return "새 제보";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
