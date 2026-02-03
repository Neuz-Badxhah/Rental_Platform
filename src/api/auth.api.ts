import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { User, UserRole } from "@/api/mockDb";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export async function login(email: string, password: string): Promise<User> {
  await delay();
  const user = db.users.find(
    (item) => item.email === email && item.deleted_at === null,
  );
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }
  return clone(user);
}

export async function register(payload: RegisterPayload): Promise<User> {
  await delay();
  const emailExists = db.users.some(
    (item) => item.email === payload.email && item.deleted_at === null,
  );
  if (emailExists) {
    throw new Error("Email already in use");
  }

  const now = nowIso();
  const user: User = {
    id: makeId("u"),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role ?? "GUEST",
    phone: payload.phone ?? "",
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };

  db.users.push(user);
  return clone(user);
}

export async function logout(): Promise<void> {
  await delay();
}
