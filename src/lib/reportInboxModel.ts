export type ReportSubmission = {
  restaurantName: string;
  address: string;
  message: string;
  nickname: string;
  email: string;
};

export type ReportStatus = "new" | "read" | "archived";
export type ReportFilter = "all" | ReportStatus;

export type ReportMessage = {
  id: string;
  restaurant_name: string;
  address: string | null;
  message: string | null;
  submitter_nickname: string | null;
  submitter_email: string | null;
  status: ReportStatus;
  created_at: string;
};

export const nicknameMaxLength = 40;
export const emailMaxLength = 254;
const pageSize = 100;
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

export function validateReportSubmission(submission: ReportSubmission) {
  const nickname = submission.nickname.trim();
  const email = submission.email.trim();
  const localPart = email.split("@", 1)[0];

  if (!submission.restaurantName.trim()) return "가게명을 입력해주세요.";
  if (nickname.length > nicknameMaxLength) return `닉네임은 ${nicknameMaxLength}자 이내로 입력해주세요.`;
  if (
    email &&
    (email.length > emailMaxLength ||
      localPart.length > 64 ||
      localPart.startsWith(".") ||
      localPart.endsWith(".") ||
      localPart.includes("..") ||
      !emailPattern.test(email))
  ) {
    return "이메일 주소 형식을 확인해주세요.";
  }

  return null;
}

export function makeReportPayload(submission: ReportSubmission) {
  if (validateReportSubmission(submission)) throw new Error("REPORT_INVALID");

  return {
    restaurant_name: submission.restaurantName.trim(),
    address: submission.address.trim() || null,
    message: submission.message.trim() || null,
    submitter_nickname: submission.nickname.trim() || null,
    submitter_email: submission.email.trim() || null,
  };
}

export function getReportCounts(messages: readonly ReportMessage[]) {
  return messages.reduce(
    (counts, { status }) => {
      counts[status] += 1;
      return counts;
    },
    { all: messages.length, new: 0, read: 0, archived: 0 },
  );
}

export function filterReportMessages(messages: ReportMessage[], filter: ReportFilter) {
  return filter === "all" ? messages : messages.filter(({ status }) => status === filter);
}

export function makeReportPageQuery(cursor?: Pick<ReportMessage, "created_at" | "id">) {
  const params = new URLSearchParams({
    order: "created_at.desc,id.desc",
    select: "id,restaurant_name,address,message,submitter_nickname,submitter_email,status,created_at",
    limit: String(pageSize),
  });
  if (cursor) {
    const { created_at: timestamp, id } = cursor;
    params.set("or", `(created_at.lt.${timestamp},and(created_at.eq.${timestamp},id.lt.${id}))`);
  }
  return params;
}

export async function collectReportMessages(fetchPage: (params: URLSearchParams) => Promise<ReportMessage[]>) {
  const messages: ReportMessage[] = [];
  let cursor: ReportMessage | undefined;

  // Continue to an empty page: the server may impose a lower cap than requested.
  for (;;) {
    const rows = await fetchPage(makeReportPageQuery(cursor));
    if (!rows.length) return messages;

    const tail = rows[rows.length - 1];
    if (tail.id === cursor?.id) throw new Error("REPORT_PAGE_DID_NOT_ADVANCE");
    messages.push(...rows);
    cursor = tail;
  }
}
