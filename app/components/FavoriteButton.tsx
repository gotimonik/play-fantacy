"use client";

import { useEffect, useState } from "react";
import { FAVORITES_STORAGE_KEY, type FavoriteLink } from "@/lib/favorites";

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteLink[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: FavoriteLink[]) {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event("play-fantacy-favorites-changed"));
}

export function FavoriteButton({ item }: { item: FavoriteLink }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().some((favorite) => favorite.slug === item.slug));
  }, [item.slug]);

  const toggleFavorite = () => {
    const favorites = readFavorites();
    const nextIsFavorite = !favorites.some((favorite) => favorite.slug === item.slug);
    const nextFavorites = nextIsFavorite
      ? [item, ...favorites.filter((favorite) => favorite.slug !== item.slug)]
      : favorites.filter((favorite) => favorite.slug !== item.slug);

    writeFavorites(nextFavorites);
    setIsFavorite(nextIsFavorite);
  };

  return (
    <button
      type="button"
      className={`favorite-button${isFavorite ? " is-active" : ""}`}
      onClick={toggleFavorite}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      data-ga-click={isFavorite ? "remove_favorite" : "add_favorite"}
      data-ga-location="link_detail_cta"
      data-ga-label={item.slug}
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
      {isFavorite ? "Favorited" : "Favorite"}
    </button>
  );
}
