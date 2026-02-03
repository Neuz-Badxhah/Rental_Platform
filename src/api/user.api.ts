import {  clone, db, delay, nowIso } from "@/api/mockDb";
import type { User } from "@/api/mockDb";

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
  role?: User["role"];
  phone?: string;
}

export async function getUsers(options?: {
  includeDeleted?: boolean;
}): Promise<User[]> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const users = includeDeleted
    ? db.users
    : db.users.filter((user) => user.deleted_at === null);
  return clone(users);
}

export async function getUserById(
  id: string,
  options?: { includeDeleted?: boolean }
): Promise<User | null> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const user = db.users.find((item) =>
    includeDeleted ? item.id === id : item.id === id && item.deleted_at === null
  );
  return user ? clone(user) : null;
}

export async function updateUser(
  id: string,
  payload: UserUpdatePayload
): Promise<User> {
  await delay();
  const user = db.users.find((item) => item.id === id);
  if (!user) {
    throw new Error("User not found");
  }

  if (payload.email) {
    const emailTaken = db.users.some(
      (item) =>
        item.email === payload.email &&
        item.id !== id &&
        item.deleted_at === null
    );
    if (emailTaken) {
      throw new Error("Email already in use");
    }
  }

  Object.assign(user, payload, { updated_at: nowIso() });
  return clone(user);
}

export async function deleteUser(id: string): Promise<User> {
  await delay();
  const user = db.users.find((item) => item.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  user.deleted_at = nowIso();
  user.updated_at = nowIso();
  return clone(user);
}

export async function restoreUser(id: string): Promise<User> {
  await delay();
  const user = db.users.find((item) => item.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  user.deleted_at = null;
  user.updated_at = nowIso();
  return clone(user);
}
