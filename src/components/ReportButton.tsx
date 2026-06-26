import { Send, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { isReportBackendConfigured, submitReport } from "../lib/reportBackend";

type ReportForm = {
  restaurantName: string;
  address: string;
  message: string;
};

const initialForm: ReportForm = {
  restaurantName: "",
  address: "",
  message: "",
};

export function ReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ReportForm>(initialForm);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "sent" | "copy-ready" | "error">("idle");

  const reportText = useMemo(
    () =>
      [
        "[홍어맛집 제보]",
        `가게명: ${form.restaurantName || "미입력"}`,
        `주소/지역: ${form.address || "미입력"}`,
        `제보 내용: ${form.message || "미입력"}`,
      ].join("\n"),
    [form],
  );

  const updateField = (key: keyof ReportForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isReportBackendConfigured) {
      setSubmitState("copy-ready");
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

  const copyReport = async () => {
    await navigator.clipboard.writeText(reportText);
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
              <button aria-label="제보창 닫기" onClick={() => setIsOpen(false)} type="button">
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

            {submitState === "copy-ready" && (
              <div className="report-result">
                <strong>제보 내용이 준비됐습니다</strong>
                <p>쪽지함 연결값을 넣으면 자동 전송됩니다. 지금은 아래 버튼으로 내용을 복사할 수 있습니다.</p>
                <button onClick={copyReport} type="button">
                  제보 내용 복사
                </button>
              </div>
            )}

            {submitState === "error" && (
              <div className="report-result is-error">
                <strong>전송에 실패했습니다</strong>
                <p>잠시 후 다시 시도하거나 아래 내용 복사로 제보를 전달해주세요.</p>
                <button onClick={copyReport} type="button">
                  제보 내용 복사
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
