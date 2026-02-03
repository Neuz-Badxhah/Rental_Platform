import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { Booking } from "@/api/mockDb";
export interface CreateBookingPayload {
  guest_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
}

export async function getBookingsByGuest(
  guestId: string,
  options?: { includeDeleted?: boolean },
): Promise<Booking[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const bookings = db.bookings.filter((booking) => {
    if (booking.guest_id !== guestId) {
      return false;
    }
    return includeDeleted ? true : booking.deleted_at === null;
  });
  return clone(bookings);
}

export async function getBookingsByHost(
  hostId: string,
  options?: { includeDeleted?: boolean },
): Promise<Booking[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const hostPropertyIds = new Set(
    db.properties
      .filter((property) => property.host_id === hostId)
      .map((p) => p.id),
  );

  const bookings = db.bookings.filter((booking) => {
    if (!hostPropertyIds.has(booking.property_id)) {
      return false;
    }
    return includeDeleted ? true : booking.deleted_at === null;
  });
  return clone(bookings);
}

export async function getBookingsByProperty(
  propertyId: string,
  options?: { includeDeleted?: boolean },
): Promise<Booking[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const bookings = db.bookings.filter((booking) => {
    if (booking.property_id !== propertyId) {
      return false;
    }
    return includeDeleted ? true : booking.deleted_at === null;
  });
  return clone(bookings);
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  await delay();
  const now = nowIso();
  const booking: Booking = {
    id: makeId("b"),
    guest_id: payload.guest_id,
    property_id: payload.property_id,
    start_date: payload.start_date,
    end_date: payload.end_date,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };
  db.bookings.push(booking);
  return clone(booking);
}

export async function cancelBooking(id: string): Promise<Booking> {
  await delay();
  const booking = db.bookings.find((item) => item.id === id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  booking.deleted_at = nowIso();
  booking.updated_at = nowIso();
  return clone(booking);
}
