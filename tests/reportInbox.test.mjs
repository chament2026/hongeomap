import assert from "node:assert/strict";
import test from "node:test";
import {
  collectReportMessages,
  filterReportMessages,
  getReportCounts,
  makeReportPageQuery,
  makeReportPayload,
  validateReportSubmission,
} from "../src/lib/reportInboxModel.ts";

const base = { restaurantName: " 홍어집 ", address: " 광주 ", message: " 추천합니다. ", nickname: "", email: "" };
const row = (n, status, created_at = "2026-11-23T09:00:00+00:00") => ({
  id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
  restaurant_name: `fixture ${n}`,
  address: null,
  message: null,
  submitter_nickname: null,
  submitter_email: null,
  status,
  created_at,
});

test("legacy form still submits without optional fields and does not supply status, time or id", () => {
  assert.equal(validateReportSubmission(base), null);
  assert.deepEqual(makeReportPayload(base), {
    restaurant_name: "홍어집", address: "광주", message: "추천합니다.",
    submitter_nickname: null, submitter_email: null,
  });
  assert.deepEqual(makeReportPayload({ ...base, nickname: " 손님 ", email: " user+report@example.com " }), {
    restaurant_name: "홍어집", address: "광주", message: "추천합니다.",
    submitter_nickname: "손님", submitter_email: "user+report@example.com",
  });
});

test("bad email, excessively long nickname, and whitespace restaurant name are rejected", () => {
  for (const email of ["a@localhost", "a..b@example.com", "a@-example.com", "a@example..com", "a@ex ample.com", "a".repeat(65) + "@example.com"]) {
    assert.ok(validateReportSubmission({ ...base, email }), email);
  }
  assert.ok(validateReportSubmission({ ...base, nickname: "가".repeat(41) }));
  assert.throws(() => makeReportPayload({ ...base, restaurantName: " " }), /REPORT_INVALID/);
  assert.equal(validateReportSubmission({ ...base, nickname: "가".repeat(40), email: " " }), null);
});

test("unread only in new; reading one fixture does not change old read or archived fixtures", () => {
  const messages = [row(3, "new"), row(2, "read"), row(1, "archived")];
  assert.deepEqual(getReportCounts(messages), { all: 3, new: 1, read: 1, archived: 1 });
  assert.deepEqual(filterReportMessages(messages, "new"), [messages[0]]);
  assert.deepEqual(filterReportMessages(messages, "read"), [messages[1]]);
  const after = [{ ...messages[0], status: "read" }, ...messages.slice(1)];
  assert.deepEqual(getReportCounts(after), { all: 3, new: 0, read: 2, archived: 1 });
  assert.deepEqual(filterReportMessages(after, "archived"), [messages[2]]);
  assert.equal(filterReportMessages(after, "all").length, 3);
});

test("stable pagination finds unread rows beyond 100, even with a lower server cap and tied dates", async () => {
  const recent = Array.from({ length: 105 }, (_, i) => row(106 - i, "new"));
  const oldestUnread = row(1, "new");
  const olderArchived = row(200, "archived", "2026-11-22T09:00:00+00:00");
  const fixtures = [row(107, "new"), ...recent, oldestUnread, olderArchived];
  let calls = 0;
  let offset = 0;
  const rows = await collectReportMessages(async (query) => {
    assert.equal(query.get("order"), "created_at.desc,id.desc");
    assert.equal(query.get("limit"), "100");
    assert.equal(query.get("or"), offset ? makeReportPageQuery(fixtures[offset - 1]).get("or") : null);
    calls += 1;
    const page = fixtures.slice(offset, offset + 40);
    offset += page.length;
    return page;
  });
  assert.equal(calls, 4);
  assert.deepEqual(rows, fixtures);
  assert.deepEqual(getReportCounts(rows), { all: 108, new: 107, read: 0, archived: 1 });
  assert.deepEqual(filterReportMessages(rows, "new"), [fixtures[0], ...recent, oldestUnread]);
  const cursor = makeReportPageQuery(oldestUnread);
  assert.equal(cursor.get("or"), `(created_at.lt.${oldestUnread.created_at},and(created_at.eq.${oldestUnread.created_at},id.lt.${oldestUnread.id}))`);
  assert.match(cursor.toString(), /%2B00/);
});

test("a stuck page fails instead of looping or presenting an incomplete new count", async () => {
  await assert.rejects(collectReportMessages(async () => [row(1, "new")]), /REPORT_PAGE_DID_NOT_ADVANCE/);
});
