import { Send, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type ReportForm = {
  restaurantName: string;
  address: string;
  message: string;
  contact: string;
};

const initialForm: ReportForm = {
  restaurantName: "",
  address: "",
  message: "",
  contact: "",
};

export function ReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ReportForm>(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reportText = useMemo(
    () =>
      [
        "[홍어집 제보]",
        `가게명: ${form.restaurantName || "미입력"}`,
        `주소/지역: ${form.address || "미입력"}`,
        `제보 내용: ${form.message || "미입력"}`,
        `연락처: ${form.contact || "미입력"}`,
      ].join("\n"),
    [form],
  );

  const updateField = (key: keyof ReportForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const copyReport = async () => {
    await navigator.clipboard.writeText(reportText);
  };

  return (
    <>
      <button className="report-fab" onClick={() => setIsOpen(true)} type="button">
        <Send size={18} />
        홍어집 제보하기
      </button>

      {isOpen && (
        <div className="report-overlay" role="presentation">
          <section className="report-modal" aria-label="홍어집 제보하기">
            <div className="report-header">
              <div>
                <h2>홍어집 제보하기</h2>
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
                  placeholder="추천 이유, 삭힘 정도, 메뉴, 가격 등을 적어주세요."
                  rows={4}
                  value={form.message}
                />
              </label>
              <label>
                <span>연락처</span>
                <input
                  onChange={(event) => updateField("contact", event.target.value)}
                  placeholder="선택 입력"
                  value={form.contact}
                />
              </label>

              <button className="report-submit" type="submit">
                제보 내용 확인
              </button>
            </form>

            {isSubmitted && (
              <div className="report-result">
                <strong>제보 내용이 준비됐습니다</strong>
                <p>아직 관리자 쪽지함 연결 전이라, 아래 버튼으로 내용을 복사해서 전달할 수 있습니다.</p>
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
