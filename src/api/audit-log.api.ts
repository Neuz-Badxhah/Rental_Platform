import {
  AuditAction,
  AuditLog,
  clone,
  db,
  delay,
  makeId,
  nowIso,
} from "@/api/mockDb";

export interface CreateAuditLogPayload {
  entity: string;
  entity_id: string;
  action: AuditAction;
  old_data?: unknown;
  new_data?: unknown;
  user_id: string;
  ip_address?: string;
  user_agent?: string;
}

export interface AuditLogFilters {
  entity?: string;
  entity_id?: string;
  action?: AuditAction;
  user_id?: string;
}

export async function getAuditLogs(
  filters?: AuditLogFilters
): Promise<AuditLog[]> {
  await delay();
  let logs = db.audit_logs;

  if (filters?.entity) {
    logs = logs.filter((log) => log.entity === filters.entity);
  }

  if (filters?.entity_id) {
    logs = logs.filter((log) => log.entity_id === filters.entity_id);
  }

  if (filters?.action) {
    logs = logs.filter((log) => log.action === filters.action);
  }

  if (filters?.user_id) {
    logs = logs.filter((log) => log.user_id === filters.user_id);
  }

  return clone(logs);
}

export async function createAuditLog(
  payload: CreateAuditLogPayload
): Promise<AuditLog> {
  await delay();
  const log: AuditLog = {
    id: makeId("log"),
    entity: payload.entity,
    entity_id: payload.entity_id,
    action: payload.action,
    old_data: payload.old_data ?? null,
    new_data: payload.new_data ?? null,
    user_id: payload.user_id,
    ip_address: payload.ip_address ?? "",
    user_agent: payload.user_agent ?? "",
    created_at: nowIso(),
  };
  db.audit_logs.push(log);
  return clone(log);
}
