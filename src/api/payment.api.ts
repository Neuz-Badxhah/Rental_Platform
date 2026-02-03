import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { Payment, PaymentMethod, PaymentStatus } from "@/api/mockDb";

export interface CreatePaymentPayload {
  booking_id: string;
  guest_id: string;
  host_id: string;
  amount: number;
  commission: number;
  method: PaymentMethod;
  status?: PaymentStatus;
}

export async function getPaymentsByGuest(
  guestId: string,
  options?: { includeDeleted?: boolean },
): Promise<Payment[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const payments = db.payments.filter((payment) => {
    if (payment.guest_id !== guestId) {
      return false;
    }
    return includeDeleted ? true : payment.deleted_at === null;
  });
  return clone(payments);
}

export async function getPaymentsByHost(
  hostId: string,
  options?: { includeDeleted?: boolean },
): Promise<Payment[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const payments = db.payments.filter((payment) => {
    if (payment.host_id !== hostId) {
      return false;
    }
    return includeDeleted ? true : payment.deleted_at === null;
  });
  return clone(payments);
}

export async function getPaymentsByBooking(
  bookingId: string,
  options?: { includeDeleted?: boolean },
): Promise<Payment[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const payments = db.payments.filter((payment) => {
    if (payment.booking_id !== bookingId) {
      return false;
    }
    return includeDeleted ? true : payment.deleted_at === null;
  });
  return clone(payments);
}

export async function createPayment(
  payload: CreatePaymentPayload,
): Promise<Payment> {
  await delay();
  const now = nowIso();
  const payment: Payment = {
    id: makeId("pay"),
    booking_id: payload.booking_id,
    guest_id: payload.guest_id,
    host_id: payload.host_id,
    amount: payload.amount,
    commission: payload.commission,
    method: payload.method,
    status: payload.status ?? "PENDING",
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };
  db.payments.push(payment);
  return clone(payment);
}

export async function updatePaymentStatus(
  id: string,
  status: PaymentStatus,
): Promise<Payment> {
  await delay();
  const payment = db.payments.find((item) => item.id === id);
  if (!payment) {
    throw new Error("Payment not found");
  }
  payment.status = status;
  payment.updated_at = nowIso();
  return clone(payment);
}
