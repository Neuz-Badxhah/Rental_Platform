import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { Inquiry } from "@/api/mockDb";
export interface CreateInquiryPayload {
  message: string;
  guest_id: string;
  host_id: string;
  property_id: string;
}

export async function getInquiriesByHost(hostId: string): Promise<Inquiry[]> {
  await delay();
  const inquiries = db.inquiries.filter((item) => item.host_id === hostId);
  return clone(inquiries);
}

export async function getInquiriesByGuest(guestId: string): Promise<Inquiry[]> {
  await delay();
  const inquiries = db.inquiries.filter((item) => item.guest_id === guestId);
  return clone(inquiries);
}

export async function getInquiriesByProperty(
  propertyId: string,
): Promise<Inquiry[]> {
  await delay();
  const inquiries = db.inquiries.filter(
    (item) => item.property_id === propertyId,
  );
  return clone(inquiries);
}

export async function createInquiry(
  payload: CreateInquiryPayload,
): Promise<Inquiry> {
  await delay();
  const inquiry: Inquiry = {
    id: makeId("inq"),
    message: payload.message,
    guest_id: payload.guest_id,
    host_id: payload.host_id,
    property_id: payload.property_id,
    created_at: nowIso(),
  };
  db.inquiries.push(inquiry);
  return clone(inquiry);
}
