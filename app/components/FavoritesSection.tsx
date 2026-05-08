"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FAVORITES_STORAGE_KEY, type FavoriteLink } from "@/lib/favorites";
import { getImageUrl } from "@/lib/utils";

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteLink[]) : [];
  } catch {
    return [];
  }
}

export function FavoritesSection() {
  const [favorites, setFavorites] = useState<FavoriteLink[]>([]);

  useEffect(() => {
    const syncFavorites = () => setFavorites(readFavorites());

    syncFavorites();
    window.addEventListener("storage", syncFavorites);
    window.addEventListener("play-fantacy-favorites-changed", syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("play-fantacy-favorites-changed", syncFavorites);
    };
  }, []);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="links-section favorites-section">
      <div className="section-heading">
        <p className="eyebrow">Favorites</p>
        <h2>Your saved pages</h2>
      </div>
      <div className="link-table">
        {favorites.map((item) => (
          <Link
            key={item.slug}
            href={`/links/${item.slug}`}
            className="table-link favorite-link"
            data-ga-click="open_favorite_link"
            data-ga-location="home_favorites"
            data-ga-label={item.slug}
          >
            <Image
              src={getImageUrl(item.imageIndex, "")}
              alt={item.label}
              loading="lazy"
              quality={70}
              width={150}
              height={150}
              sizes="100px"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <span>{item.label}</span>
            <small>{item.domain}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
