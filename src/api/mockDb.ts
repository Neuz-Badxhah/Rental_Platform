import rawDb from "@/data/mock-database.json";

/* ================= ENUM TYPES ================= */

export type UserRole = string;
export type PropertyStatus = string;
export type PaymentStatus = string;
export type PaymentMethod = string;
export type AuditAction = string;

/* ================= TABLE TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  status: PropertyStatus;
  host_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Location {
  id: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  property_id: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  property_id: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface BrowsingHistory {
  id: string;
  user_id: string;
  property_id: string;
  viewed_at: string;
}

export interface Inquiry {
  id: string;
  message: string;
  guest_id: string;
  host_id: string;
  property_id: string;
  created_at: string;
}

export interface Booking {
  id: string;
  guest_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Payment {
  id: string;
  booking_id: string;
  guest_id: string;
  host_id: string;
  amount: number;
  commission: number;
  method: PaymentMethod;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AuditLog {
  id: string;
  entity: string;
  entity_id: string;
  action: AuditAction;
  old_data: unknown;
  new_data: unknown;
  user_id: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

/* ================= DATABASE TYPE ================= */

export interface Database {
  enums: unknown;
  users: User[];
  properties: Property[];
  locations: Location[];
  property_images: PropertyImage[];
  favorites: Favorite[];
  browsing_history: BrowsingHistory[];
  inquiries: Inquiry[];
  bookings: Booking[];
  payments: Payment[];
  audit_logs: AuditLog[];
}

/* ================= HELPERS ================= */
/*====Make a safe copy so the original database is not changed*/
export function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/*======For timestamps like created_at, updated_at, deleted_at=======*/
export function nowIso(): string {
  return new Date().toISOString();
}

export function delay(ms: number = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*===========Generate Id according their record for eg. makeId("u") = u1 = (for user)============*/
const idCounters: Record<string, number> = {};

export function makeId(prefix: string): string {
  if (!idCounters[prefix]) {
    idCounters[prefix] = 1;
  } else {
    idCounters[prefix]++;
  }

  return prefix + idCounters[prefix];
}

/* ================= DATABASE INSTANCE ================= */

export const db: Database = clone(rawDb);
