import { FormEvent, useEffect, useState } from "react";
import { Lock, X } from "lucide-react";
import {
  clearStoredAdminSession,
  getStoredAdminSession,
  isReportBackendConfigured,
  signInAdmin,
  verifyAdminSession,
  type AdminSession,
} from "../lib/reportBackend";

export function AdminAccess() {
  const [session, setSession] = useState<AdminSession | undefined>(() =>
    isReportBackendConfigured ? getStoredAdminSession() : undefined,
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "not-configured">("idle");

  useEffect(() => {
    if (!session) {
      return;
    }

    verifyAdminSession(session.accessToken).then((isAdmin) => {
      if (!isAdmin) {
        clearStoredAdminSession();
        setSession(undefined);
      }
    });
  }, [session]);

  const handleOpenLogin = () => {
    setStatus(isReportBackendConfigured ? "idle" : "not-configured");
    setIsLoginOpen(true);
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReportBackendConfigured) {
      setStatus("not-configured");
      return;
    }

    setStatus("checking");

    try {
      await signInAdmin(loginId, password);
      setLoginId("");
      setPassword("");
      setIsLoginOpen(false);
      setStatus("idle");
      window.location.assign("/admin");
    } catch {
      setStatus("error");
    }
  };

  const handleSignOut = () => {
    clearStoredAdminSession();
    setSession(undefined);
  };

  return (
    <div className="admin-access">
      {session ? (
        <button aria-label="잠금" className="admin-login-button" onClick={handleSignOut} type="button">
          <Lock size={16} />
        </button>
      ) : (
        <button aria-label="잠금" className="admin-login-button" onClick={handleOpenLogin} type="button">
          <Lock size={16} />
        </button>
      )}

      {isLoginOpen && (
        <div className="admin-login-popover" role="dialog" aria-label="로그인">
          <div className="admin-login-popover-head">
            <div>
              <strong>홍어맵</strong>
            </div>
            <button aria-label="로그인 닫기" onClick={() => setIsLoginOpen(false)} type="button">
              <X size={16} />
            </button>
          </div>
          <form className="admin-login-popover-form" onSubmit={handleSignIn}>
            <label>
              <span>아이디</span>
              <input
                autoComplete="off"
                name="hongeomap-admin-login-id"
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
                name="hongeomap-admin-login-secret"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            <button disabled={status === "checking"} type="submit">
              {status === "checking" ? "확인 중" : "로그인"}
            </button>
          </form>
          {status === "not-configured" && (
            <p className="admin-login-note">잠시 후 다시 시도해주세요.</p>
          )}
          {status === "error" && <p className="admin-login-note is-error">로그인 정보를 확인해주세요.</p>}
        </div>
      )}
    </div>
  );
}
