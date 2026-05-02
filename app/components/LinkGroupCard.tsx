"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";

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

export function LinkGroupCard({
  group,
  domainCount: _domainCount,
  compact = false,
}: {
  group: Group;
  domainCount: number;
  compact?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (group.items.length === 1) {
    const item = group.items[0];

    return (
      <Link
        href={`/links/${item.slug}`}
        className="outbound-link"
        data-ga-click="open_link_detail"
        data-ga-location="group_card"
        data-ga-label={item.slug}
      >
        <Image
          src={item.imageUrl}
          alt={item.label}
          loading="lazy"
          quality={75}
          width={150}
          height={150}
          sizes="100px"
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Link>
    );
  }

  return (
    <>
      <div className="domain-group-summary group-image-card">
        <button
          type="button"
          className={`group-image-trigger${compact ? " compact-group-link" : ""}`}
          onClick={() => setIsModalOpen(true)}
          data-ga-click="open_group_modal"
          data-ga-location="group_card"
          data-ga-label={group.domain}
          aria-label={`Open ${group.items.length} links in ${group.siteName}`}
        >
          <Image
            src={group.items[0].imageUrl}
            alt={group.items[0].label}
            loading="lazy"
            quality={75}
            width={150}
            height={150}
            sizes="100px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <span className="group-image-overlay">
            <strong>{group.items.length}</strong> items
          </span>
        </button>
      </div>

      {isModalOpen && isMounted
        ? createPortal(
            <div
              className="wheel-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-label={`${group.siteName} links`}
              onClick={() => setIsModalOpen(false)}
            >
              <div className="wheel-modal-card" onClick={(event) => event.stopPropagation()}>
                <p className="eyebrow">More links</p>
                <h3>{group.siteName}</h3>
                <p>{group.domain}</p>
                <div className="wheel-modal-scroll">
                  <ul className="sub-link-list group-modal-link-list">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/links/${item.slug}`}
                          className="outbound-link"
                          data-ga-click="open_link_detail"
                          data-ga-location="group_modal"
                          data-ga-label={item.slug}
                          onClick={() => setIsModalOpen(false)}
                        >
                          <Image
                            src={item.imageUrl}
                            alt={item.label}
                            loading="lazy"
                            quality={75}
                            width={150}
                            height={150}
                            sizes="100px"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hero-actions">
                  <button
                    type="button"
                    className="secondary-cta"
                    onClick={() => setIsModalOpen(false)}
                    data-ga-click="close_group_modal"
                    data-ga-location="group_modal"
                    data-ga-label={group.domain}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
