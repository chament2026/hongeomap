import { Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { isReportBackendConfigured, submitReport } from "../lib/reportBackend";

import {
  emailMaxLength,
  nicknameMaxLength,
  validateReportSubmission,
  type ReportSubmission,
} from "../lib/reportInboxModel";

const initialForm: ReportSubmission = {
  restaurantName: "",
  address: "",
  message: "",
  nickname: "",
  email: "",
};

export function ReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ReportSubmission>(initialForm);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const [formError, setFormError] = useState<string | null>(null);

  const updateField = (key: keyof ReportSubmission, value: string) => {
    if (submitState === "submitting") return;
    setForm((current) => ({ ...current, [key]: value }));
    setFormError(null);
    setSubmitState("idle");
  };

  const closeReport = () => {
    if (submitState === "submitting") return;
    setIsOpen(false);
    setForm(initialForm);
    setFormError(null);
    setSubmitState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "submitting") return;

    const validationError = validateReportSubmission(form);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (!isReportBackendConfigured) {
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");

    try {
      await submitReport(form);
      setSubmitState("sent");
      setForm(initialForm);
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <>
      <button className="report-fab" onClick={() => setIsOpen(true)} type="button">
        <Send size={18} />
        홍어맛집 제보하기
      </button>

      {isOpen && (
        <div className="report-overlay" role="presentation">
          <section className="report-modal" aria-label="홍어맛집 제보하기">
            <div className="report-header">
              <div>
                <h2>홍어맛집 제보하기</h2>
                <p>새로 가볼 만한 홍어집을 알려주세요.</p>
              </div>
              <button aria-label="제보창 닫기" disabled={submitState === "submitting"} onClick={closeReport} type="button">
                <X size={18} />
              </button>
            </div>

            <form className="report-form" onSubmit={handleSubmit}>
              <label>
                <span>가게명</span>
                <input
                  onChange={(event) => updateField("restaurantName", event.target.value)}
                  placeholder="예: 홍어한마리"
                  required
                  value={form.restaurantName}
                />
              </label>
              <label>
                <span>주소/지역</span>
                <input
                  onChange={(event) => updateField("address", event.target.value)}
                  placeholder="예: 서울 마포구"
                  value={form.address}
                />
              </label>
              <label>
                <span>제보 내용</span>
                <textarea
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="추천 이유, 메뉴, 가격 등을 적어주세요."
                  rows={4}
                  value={form.message}
                />
              </label>

              <label>
                <span>닉네임 (선택)</span>
                <input
                  aria-describedby="report-contact-purpose"
                  autoComplete="nickname"
                  maxLength={nicknameMaxLength}
                  name="report-nickname"
                  onChange={(event) => updateField("nickname", event.target.value)}
                  type="text"
                  value={form.nickname}
                />
              </label>
              <label>
                <span>이메일 (선택)</span>
                <input
                  aria-describedby="report-contact-purpose"
                  autoComplete="email"
                  maxLength={emailMaxLength}
                  name="report-email"
                  onChange={(event) => updateField("email", event.target.value)}
                  type="email"
                  value={form.email}
                />
              </label>
              <p className="report-contact-purpose" id="report-contact-purpose">
                이메일은 운영자가 제보를 확인하고 필요한 경우 연락하는 데만 사용합니다.
              </p>
              {formError && <p className="report-form-error" role="alert">{formError}</p>}

              <button className="report-submit" disabled={submitState === "submitting"} type="submit">
                {submitState === "submitting" ? "보내는 중" : "제보하기"}
              </button>
            </form>

            {submitState === "sent" && (
              <div className="report-result">
                <strong>제보가 전송됐습니다</strong>
                <p>운영자 쪽지함에서 확인할 수 있습니다.</p>
              </div>
            )}

            {submitState === "error" && (
              <div className="report-result is-error">
                <strong>전송에 실패했습니다</strong>
                <p>잠시 후 다시 시도해주세요.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
