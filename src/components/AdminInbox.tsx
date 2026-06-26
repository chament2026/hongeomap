import { Archive, CheckCircle2, Inbox, Lock, LogOut, Mail, RefreshCw } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  clearStoredAdminSession,
  fetchReportMessages,
  getStoredAdminSession,
  isReportBackendConfigured,
  signInAdmin,
  updateReportStatus,
  verifyAdminSession,
  type AdminSession,
  type ReportMessage,
} from "../lib/reportBackend";

export function AdminInbox() {
  const [session, setSession] = useState<AdminSession | undefined>(() =>
    isReportBackendConfigured ? getStoredAdminSession() : undefined,
  );
  const [messages, setMessages] = useState<ReportMessage[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const loadMessages = async (activeSession = session) => {
    if (!activeSession) {
      return;
    }

    setStatus("loading");

    try {
      setMessages(await fetchReportMessages(activeSession.accessToken));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    verifyAdminSession(session.accessToken).then((isAdmin) => {
      if (!isAdmin) {
        clearStoredAdminSession();
        setSession(undefined);
        return;
      }

      void loadMessages(session);
    });
  }, [session]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const nextSession = await signInAdmin(email, password);
      setSession(nextSession);
      setEmail("");
      setPassword("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const handleStatusChange = async (messageId: string, nextStatus: ReportMessage["status"]) => {
    if (!session) {
      return;
    }

    try {
      await updateReportStatus(session.accessToken, messageId, nextStatus);
      setMessages((current) =>
        current.map((message) => (message.id === messageId ? { ...message, status: nextStatus } : message)),
      );
    } catch {
      setStatus("error");
    }
  };

  const handleSignOut = () => {
    clearStoredAdminSession();
    setSession(undefined);
    setMessages([]);
  };

  if (!isReportBackendConfigured) {
    return (
      <main className="admin-page">
        <section className="admin-panel">
          <div className="admin-title">
            <Inbox size={22} />
            <div>
              <h1>홍어맛집제보</h1>
              <p>Supabase 연결값을 넣으면 제보글이 이곳에 쌓입니다.</p>
            </div>
          </div>
          <div className="admin-empty">
            <strong>쪽지함 연결 준비가 필요합니다</strong>
            <p>
              Vercel 환경변수에 <code>VITE_SUPABASE_URL</code>, <code>VITE_SUPABASE_ANON_KEY</code>를 추가하면
              로그인과 제보 저장이 활성화됩니다.
            </p>
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
            <Lock size={22} />
            <div>
              <h1>운영자 로그인</h1>
              <p>홍어맛집제보 게시판은 등록된 운영자만 확인할 수 있습니다.</p>
            </div>
          </div>
          <form className="admin-login-form" onSubmit={handleSignIn}>
            <label>
              <span>이메일</span>
              <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
            </label>
            <label>
              <span>비밀번호</span>
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
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
              <p>{session.email} 운영자 게시판</p>
            </div>
          </div>
          <div className="admin-actions">
            <button onClick={() => loadMessages()} type="button">
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

        <div className="admin-message-list">
          {messages.length === 0 && status !== "loading" ? (
            <div className="admin-empty">
              <Mail size={22} />
              <strong>아직 도착한 제보가 없습니다</strong>
              <p>방문자가 제보를 보내면 이곳에 게시글처럼 쌓입니다.</p>
            </div>
          ) : (
            messages.map((message) => (
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
                <div className="admin-message-actions">
                  <button onClick={() => handleStatusChange(message.id, "read")} type="button">
                    <CheckCircle2 size={15} />
                    읽음
                  </button>
                  <button onClick={() => handleStatusChange(message.id, "archived")} type="button">
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
