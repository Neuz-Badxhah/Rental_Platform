import { clone, db, delay, makeId, nowIso } from "@/api/mockDb";
import type { Favorite } from "@/api/mockDb";
export async function getFavoritesByUser(userId: string): Promise<Favorite[]> {
  await delay();
  const favorites = db.favorites.filter(
    (favorite) => favorite.user_id === userId,
  );
  return clone(favorites);
}

export async function addFavorite(
  userId: string,
  propertyId: string,
): Promise<Favorite> {
  await delay();
  const existing = db.favorites.find(
    (favorite) =>
      favorite.user_id === userId && favorite.property_id === propertyId,
  );
  if (existing) {
    return clone(existing);
  }
  const favorite: Favorite = {
    id: makeId("f"),
    user_id: userId,
    property_id: propertyId,
    created_at: nowIso(),
  };
  db.favorites.push(favorite);
  return clone(favorite);
}

export async function removeFavorite(
  userId: string,
  propertyId: string,
): Promise<void> {
  await delay();
  const index = db.favorites.findIndex(
    (favorite) =>
      favorite.user_id === userId && favorite.property_id === propertyId,
  );
  if (index >= 0) {
    db.favorites.splice(index, 1);
  }
}
