import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type {
  Location,
  Property,
  PropertyImage,
  PropertyStatus,
  User,
} from "@/api/mockDb";

export interface PropertyFilters {
  status?: PropertyStatus;
  hostId?: string;
  city?: string;
  search?: string;
  includeDeleted?: boolean;
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  price: number;
  type: string;
  status?: PropertyStatus;
  host_id: string;
  location?: Omit<Location, "id" | "property_id">;
  images?: Array<Omit<PropertyImage, "id" | "property_id">>;
}

export interface UpdatePropertyPayload {
  title?: string;
  description?: string;
  price?: number;
  type?: string;
  status?: PropertyStatus;
}

export interface PropertyDetails extends Property {
  location: Location | null;
  images: PropertyImage[];
  host: User | null;
}

export async function getProperties(
  filters?: PropertyFilters,
): Promise<Property[]> {
  await delay();
  const includeDeleted = filters?.includeDeleted ?? false;
  let properties = includeDeleted
    ? db.properties
    : db.properties.filter((property) => property.deleted_at === null);

  if (filters?.status) {
    properties = properties.filter(
      (property) => property.status === filters.status,
    );
  }

  if (filters?.hostId) {
    properties = properties.filter(
      (property) => property.host_id === filters.hostId,
    );
  }

  if (filters?.city) {
    const propertyIds = new Set(
      db.locations
        .filter((location) => location.city === filters.city)
        .map((location) => location.property_id),
    );
    properties = properties.filter((property) => propertyIds.has(property.id));
  }

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    properties = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query),
    );
  }

  return clone(properties);
}

export async function getPropertyById(
  id: string,
  options?: { includeDeleted?: boolean },
): Promise<Property | null> {
  await delay();
  const includeDeleted = options?.includeDeleted ?? false;
  const property = db.properties.find((item) =>
    includeDeleted
      ? item.id === id
      : item.id === id && item.deleted_at === null,
  );
  return property ? clone(property) : null;
}

export async function getPropertyDetails(
  id: string,
): Promise<PropertyDetails | null> {
  await delay();
  const property = db.properties.find(
    (item) => item.id === id && item.deleted_at === null,
  );
  if (!property) {
    return null;
  }

  const location = db.locations.find((item) => item.property_id === id) ?? null;
  const images = db.property_images.filter((item) => item.property_id === id);
  const host = db.users.find((item) => item.id === property.host_id) ?? null;

  return clone({
    ...property,
    location,
    images,
    host,
  });
}

export async function createProperty(
  payload: CreatePropertyPayload,
): Promise<PropertyDetails> {
  await delay();
  const now = nowIso();
  const property: Property = {
    id: makeId("p"),
    title: payload.title,
    description: payload.description,
    price: payload.price,
    type: payload.type,
    status: payload.status ?? "AVAILABLE",
    host_id: payload.host_id,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };

  db.properties.push(property);

  let location: Location | null = null;
  if (payload.location) {
    location = {
      id: makeId("l"),
      property_id: property.id,
      ...payload.location,
    };
    db.locations.push(location);
  }

  const images: PropertyImage[] = [];
  if (payload.images?.length) {
    payload.images.forEach((image) => {
      const record: PropertyImage = {
        id: makeId("img"),
        property_id: property.id,
        ...image,
      };
      images.push(record);
      db.property_images.push(record);
    });
  }

  const host = db.users.find((item) => item.id === property.host_id) ?? null;

  return clone({
    ...property,
    location,
    images,
    host,
  });
}

export async function updateProperty(
  id: string,
  payload: UpdatePropertyPayload,
): Promise<Property> {
  await delay();
  const property = db.properties.find((item) => item.id === id);
  if (!property) {
    throw new Error("Property not found");
  }
  Object.assign(property, payload, { updated_at: nowIso() });
  return clone(property);
}

export async function deleteProperty(id: string): Promise<Property> {
  await delay();
  const property = db.properties.find((item) => item.id === id);
  if (!property) {
    throw new Error("Property not found");
  }
  property.deleted_at = nowIso();
  property.updated_at = nowIso();
  return clone(property);
}

export async function restoreProperty(id: string): Promise<Property> {
  await delay();
  const property = db.properties.find((item) => item.id === id);
  if (!property) {
    throw new Error("Property not found");
  }
  property.deleted_at = null;
  property.updated_at = nowIso();
  return clone(property);
}
