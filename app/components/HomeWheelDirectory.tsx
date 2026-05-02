"use client";

import { useMemo, useState, useRef } from "react";
// Optional: import a confetti library if available
// import confetti from "canvas-confetti";
// Sound effect for spinning
import Link from "next/link";
import Image from "next/image";
import { LinkGroupCard } from "./LinkGroupCard";
import { PersistedDetails } from "./PersistedDetails";

type Category = {
  slug: string;
  name: string;
  description: string;
};

type Item = {
  slug: string;
  label: string;
  description: string;
  imageIndex: number;
  imageUrl: string;
};

type Group = {
  domain: string;
  siteName: string;
  items: Item[];
};

type CategoryWithGroups = {
  category: Category;
  groups: Group[];
};

const wheelColors = [
  "#c8553d",
  "#2f6690",
  "#9c6644",
  "#6b9080",
  "#a44a3f",
  "#4361ee",
  "#b56576",
  "#588157",
  "#b08968",
  "#3a86ff",
  "#bc6c25",
  "#457b9d",
];

export function HomeWheelDirectory({ categories }: { categories: CategoryWithGroups[] }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [bounce, setBounce] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const segmentSize = 360 / Math.max(categories.length, 1);
  const gradient = useMemo(() => {
    if (categories.length === 0) return "transparent";

    const segments = categories.map((_, index) => {
      const start = index * segmentSize;
      const end = start + segmentSize;
      return `${wheelColors[index % wheelColors.length]} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${segments.join(", ")})`;
  }, [categories, segmentSize]);

  const visibleCategories = selectedCategorySlug
    ? categories.filter(({ category }) => category.slug === selectedCategorySlug)
    : categories;

  const selectedName =
    categories.find(({ category }) => category.slug === selectedCategorySlug)?.category.name ?? null;
  const selectedCategoryData = categories.find(
    ({ category }) => category.slug === selectedCategorySlug,
  );

  const spinWheel = () => {
    if (isSpinning || categories.length === 0) return;

    const winnerIndex = Math.floor(Math.random() * categories.length);
    const fullSpins = 5 * 360;
    const targetOffset = winnerIndex * segmentSize + segmentSize / 2;
    const nextRotation = rotation + fullSpins + (360 - targetOffset);

    setIsSpinning(true);
    setBounce(false);
    setRotation(nextRotation);

    // Play spin sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    window.setTimeout(() => {
      setBounce(true);
      // Confetti effect (uncomment if using a confetti library)
      // confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 } });
      setSelectedCategorySlug(categories[winnerIndex].category.slug);
      setShowWinnerPopup(true);
      setIsSpinning(false);
    }, 3200);
  };

  return (
    <>
      <section className="wheel-section">
        <div className="wheel-left">
          <p className="eyebrow">Pick for me</p>
          <h2>Spin the wheel and get a surprise category</h2>
          <p className="hero-text">
            Hit spin and the homepage will instantly focus on one category. You can spin again
            anytime or reset to view everything.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-cta"
              onClick={spinWheel}
              disabled={isSpinning}
              data-ga-click="spin_wheel"
              data-ga-location="home_wheel"
            >
              {isSpinning ? "Spinning..." : "Spin wheel"}
            </button>
            <button
              type="button"
              className="secondary-cta"
              onClick={() => setSelectedCategorySlug(null)}
              data-ga-click="reset_wheel_filter"
              data-ga-location="home_wheel"
            >
              Show all categories
            </button>
          </div>
          <p className="wheel-result">
            {selectedName ? `Result: ${selectedName}` : "Result: all categories"}
          </p>
        </div>

        <div className="wheel-right">
          <div className="wheel-pointer">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <polygon points="18,0 36,36 0,36" fill="#ffb703" stroke="#333" strokeWidth="2" />
              <circle cx="18" cy="30" r="3" fill="#333" />
            </svg>
          </div>
          <div
            className={`wheel-disc ${isSpinning ? "is-spinning" : ""} ${bounce ? "is-bounce" : ""}`}
            style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
            aria-label="Category wheel"
          >
            <button
              type="button"
              className="wheel-center-cap"
              onClick={spinWheel}
              disabled={isSpinning}
              data-ga-click="spin_wheel_center"
              data-ga-location="home_wheel"
            >
              <span role="img" aria-label="Go">🎯</span>
              <span style={{ fontWeight: 700, fontSize: '1.1em', marginLeft: 6 }}>{isSpinning ? "..." : "GO"}</span>
            </button>
            {categories.map(({ category }, index) => {
              const angle = index * segmentSize + segmentSize / 2;
              return (
                <span
                  key={category.slug}
                  className="wheel-label"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-122px) rotate(${-angle}deg)`,
                  }}
                >
                  {category.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {showWinnerPopup && selectedCategoryData ? (
        <div className="wheel-modal-overlay" role="dialog" aria-modal="true" aria-label="Spin result">
          <div className="wheel-modal-card">
            <p className="eyebrow">Spin result</p>
            <h3>{selectedCategoryData.category.name}</h3>
            <p>{selectedCategoryData.category.description}</p>

            {selectedCategoryData.groups[0]?.items[0] ? (
              <div className="wheel-result-image-wrap">
                <Image
                  src={selectedCategoryData.groups[0].items[0].imageUrl}
                  alt={selectedCategoryData.category.name}
                  className="wheel-result-image"
                  width={960}
                  height={540}
                />
              </div>
            ) : null}

            <div className="wheel-modal-preview">
              {selectedCategoryData.groups.slice(0, 4).map((group) => (
                <article key={group.domain} className="wheel-modal-item">
                  <strong>{group.siteName}</strong>
                  <small>
                    {group.items.length} links on {group.domain}
                  </small>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <a
                href="#directory"
                className="primary-cta"
                onClick={() => setShowWinnerPopup(false)}
                data-ga-click="wheel_modal_show_result_section"
                data-ga-location="home_wheel_modal"
              >
                Show result section
              </a>
              <Link
                href="/links"
                className="secondary-cta"
                onClick={() => setShowWinnerPopup(false)}
                data-ga-click="wheel_modal_explore_full_directory"
                data-ga-location="home_wheel_modal"
              >
                Explore full directory
              </Link>
              <button
                type="button"
                className="secondary-cta"
                onClick={() => setShowWinnerPopup(false)}
                data-ga-click="wheel_modal_close"
                data-ga-location="home_wheel_modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
 
      <section id="directory" className="directory-section">
        <div className="section-heading">
          <p className="eyebrow">Homepage directory</p>
          <h1>{selectedName ? `Now showing: ${selectedName}` : "Browse by category and domain"}</h1>
        </div>

        <div className={`category-grid ${visibleCategories.length === 1 ? "single-result-grid" : ""}`}>
          {visibleCategories.map(({ category, groups }) => (
            <PersistedDetails
              key={`${category.slug}-${category.name}`}
              storageKey={`home-category-${category.slug}`}
              defaultOpen
              className="domain-group category-card"
              summaryClassName="domain-group-summary"
              summary={
                <article>
                  <div className="category-header">
                    <h3>{category.name}</h3>
                    <span>{groups.length} domains</span>
                  </div>
                  <p>{category.description}</p>
                </article>
              }
            >
              <div className="domain-group-list">
                {groups.map((group) => (
                  <LinkGroupCard
                    key={`${category.slug}-${group.domain}`}
                    group={group}
                    domainCount={groups.length}
                  />
                ))}
              </div>
            </PersistedDetails>
          ))}
        </div>
      </section>
    </>
  );
}
