import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { BrowsingHistory } from "@/api/mockDb";
export interface CreateBrowsingHistoryPayload {
  user_id: string;
  property_id: string;
  viewed_at?: string;
}

export async function getBrowsingHistoryByUser(
  userId: string,
): Promise<BrowsingHistory[]> {
  await delay();
  const history = db.browsing_history.filter((item) => item.user_id === userId);
  return clone(history);
}

export async function getBrowsingHistoryByProperty(
  propertyId: string,
): Promise<BrowsingHistory[]> {
  await delay();
  const history = db.browsing_history.filter(
    (item) => item.property_id === propertyId,
  );
  return clone(history);
}

export async function addBrowsingHistory(
  payload: CreateBrowsingHistoryPayload,
): Promise<BrowsingHistory> {
  await delay();
  const history: BrowsingHistory = {
    id: makeId("bh"),
    user_id: payload.user_id,
    property_id: payload.property_id,
    viewed_at: payload.viewed_at ?? nowIso(),
  };
  db.browsing_history.push(history);
  return clone(history);
}

export async function clearBrowsingHistory(userId: string): Promise<void> {
  await delay();
  const remaining = db.browsing_history.filter(
    (item) => item.user_id !== userId,
  );
  db.browsing_history.length = 0;
  db.browsing_history.push(...remaining);
}
