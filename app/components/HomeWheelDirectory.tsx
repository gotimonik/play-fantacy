"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Category = {
  slug: string;
  name: string;
  description: string;
};

type PreviewGroup = {
  domain: string;
  siteName: string;
  itemCount: number;
};

type WheelCategory = {
  category: Category;
  previewGroups: PreviewGroup[];
  imageUrl: string;
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

export function HomeWheelDirectory({ categories }: { categories: WheelCategory[] }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(
    null,
  );
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [questRound, setQuestRound] = useState(0);
  const [questScore, setQuestScore] = useState(0);
  const [questChoice, setQuestChoice] = useState<string | null>(null);

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

  const selectedName =
    categories.find(({ category }) => category.slug === selectedCategorySlug)?.category.name ?? null;
  const selectedCategoryData = categories.find(
    ({ category }) => category.slug === selectedCategorySlug,
  );
  const totalLinks = categories.reduce(
    (total, item) =>
      total + item.previewGroups.reduce((groupTotal, group) => groupTotal + group.itemCount, 0),
    0,
  );
  const quest = useMemo(() => {
    if (categories.length === 0) {
      return null;
    }

    const answer = categories[questRound % categories.length];
    const optionMap = new Map<string, WheelCategory>();
    optionMap.set(answer.category.slug, answer);

    let cursor = questRound + 1;
    while (optionMap.size < Math.min(3, categories.length)) {
      const option = categories[cursor % categories.length];
      optionMap.set(option.category.slug, option);
      cursor += 2;
    }

    const options = [...optionMap.values()].sort((a, b) => {
      const aScore = (a.category.slug.charCodeAt(0) + questRound * 7) % 11;
      const bScore = (b.category.slug.charCodeAt(0) + questRound * 7) % 11;
      return aScore - bScore;
    });

    return {
      answer,
      options,
      clues: answer.previewGroups.slice(0, 3),
    };
  }, [categories, questRound]);

  const spinWheel = () => {
    if (isSpinning || categories.length === 0) return;

    const winnerIndex = Math.floor(Math.random() * categories.length);
    const fullSpins = 5 * 360;
    const targetOffset = winnerIndex * segmentSize + segmentSize / 2;
    const nextRotation = rotation + fullSpins + (360 - targetOffset);

    setIsSpinning(true);
    setBounce(false);
    setRotation(nextRotation);

    window.setTimeout(() => {
      setBounce(true);
      setSelectedCategorySlug(categories[winnerIndex].category.slug);
      setShowWinnerPopup(true);
      setIsSpinning(false);
    }, 3200);
  };

  const handleQuestGuess = (slug: string) => {
    if (!quest || questChoice) {
      return;
    }

    setQuestChoice(slug);
    if (slug === quest.answer.category.slug) {
      setQuestScore((score) => score + 1);
    }
  };

  const nextQuestRound = () => {
    setQuestChoice(null);
    setQuestRound((round) => round + 1);
  };

  const browseSelectedCategory = () => {
    if (!selectedCategoryData) {
      return;
    }

    setShowWinnerPopup(false);

    window.requestAnimationFrame(() => {
      const selectedCard = document.getElementById(
        `category-${selectedCategoryData.category.slug}`,
      );

      if (selectedCard instanceof HTMLDetailsElement) {
        selectedCard.open = true;
        selectedCard.classList.remove("is-directory-target");
        void selectedCard.offsetWidth;
        selectedCard.classList.add("is-directory-target");
        selectedCard.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        document
          .getElementById("directory")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <>
      <section className="wheel-section">
        <div className="wheel-left">
          <div className="wheel-kicker-row">
            <p className="eyebrow">Pick for me</p>
            <span className="wheel-live-pill">{categories.length} categories</span>
          </div>
          <h2>Spin into a surprise route</h2>
          <p className="hero-text">
            Hit spin and let the homepage pick a category, preview the top domains, and give
            you a playful shortcut into the directory.
          </p>
          <div className="wheel-mini-stats" aria-label="Wheel stats">
            <span>
              <strong>{totalLinks}</strong>
              sampled links
            </span>
            <span>
              <strong>{categories[0]?.previewGroups.length ?? 0}</strong>
              quick clues
            </span>
          </div>
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
              Reset result
            </button>
          </div>
          <p className="wheel-result">
            {selectedName ? `Result: ${selectedName}` : "Result: all categories"}
          </p>
          {selectedCategoryData ? (
            <div className="wheel-result-strip" aria-label="Selected category preview">
              {selectedCategoryData.previewGroups.slice(0, 3).map((group) => (
                <span key={group.domain}>
                  {group.siteName}
                  <small>{group.itemCount}</small>
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="wheel-right">
          <div className="wheel-orbit" aria-hidden="true" />
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
              {isSpinning ? "..." : "GO"}
            </button>
            {categories.map(({ category }, index) => {
              const angle = index * segmentSize + segmentSize / 2;
              return (
                <span
                  key={category.slug}
                  className={`wheel-label${
                    category.slug === selectedCategorySlug ? " is-selected" : ""
                  }`}
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

      {quest ? (
        <section className="quest-section" aria-label="Link Quest game">
          <div className="quest-board">
            <div className="quest-copy">
              <div className="wheel-kicker-row">
                <p className="eyebrow">Link Quest</p>
                <span className="wheel-live-pill">Score {questScore}</span>
              </div>
              <h2>Guess the category from the clues</h2>
              <p>
                Three domains are on the board. Pick the category they belong to and keep
                your streak alive.
              </p>
            </div>

            <div className="quest-clues">
              {quest.clues.map((group, index) => (
                <article key={`${group.domain}-${index}`} className="quest-clue-card">
                  <span>Clue {index + 1}</span>
                  <strong>{group.siteName}</strong>
                  <small>
                    {group.itemCount} links on {group.domain}
                  </small>
                </article>
              ))}
            </div>

            <div className="quest-options">
              {quest.options.map(({ category }) => {
                const isPicked = questChoice === category.slug;
                const isAnswer = quest.answer.category.slug === category.slug;
                const resultClass = questChoice
                  ? isAnswer
                    ? " is-correct"
                    : isPicked
                      ? " is-wrong"
                      : ""
                  : "";

                return (
                  <button
                    key={category.slug}
                    type="button"
                    className={`quest-option${resultClass}`}
                    onClick={() => handleQuestGuess(category.slug)}
                    disabled={Boolean(questChoice)}
                    data-ga-click="quest_guess_category"
                    data-ga-location="home_link_quest"
                    data-ga-label={category.slug}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            <div className="quest-footer">
              <p>
                {questChoice
                  ? questChoice === quest.answer.category.slug
                    ? "Nice pick. That category was hiding in plain sight."
                    : `Close one. The answer was ${quest.answer.category.name}.`
                  : "Choose a category to reveal the answer."}
              </p>
              <button
                type="button"
                className="secondary-cta"
                onClick={nextQuestRound}
                data-ga-click="quest_next_round"
                data-ga-location="home_link_quest"
              >
                Next round
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {showWinnerPopup && selectedCategoryData ? (
        <div className="wheel-modal-overlay" role="dialog" aria-modal="true" aria-label="Spin result">
          <div className="wheel-modal-card">
            <p className="eyebrow">Spin result</p>
            <h3>{selectedCategoryData.category.name}</h3>
            <p>{selectedCategoryData.category.description}</p>

            {selectedCategoryData.imageUrl ? (
              <div className="wheel-result-image-wrap">
                <Image
                  src={selectedCategoryData.imageUrl}
                  alt={selectedCategoryData.category.name}
                  className="wheel-result-image"
                  width={600}
                  height={360}
                  sizes="(max-width: 720px) 92vw, 600px"
                />
              </div>
            ) : null}

            <div className="wheel-modal-preview">
              {selectedCategoryData.previewGroups.map((group) => (
                <article key={group.domain} className="wheel-modal-item">
                  <strong>{group.siteName}</strong>
                  <small>
                    {group.itemCount} links on {group.domain}
                  </small>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-cta"
                onClick={browseSelectedCategory}
                data-ga-click="wheel_modal_show_result_section"
                data-ga-location="home_wheel_modal"
              >
                Browse directory
              </button>
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
    </>
  );
}
