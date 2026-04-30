"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  domainCount,
}: {
  group: Group;
  domainCount: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (group.items.length === 1) {
    const item = group.items[0];

    return (
      <Link href={`/links/${item.slug}`} className="outbound-link">
        <div style={{ display: "flex" }}>
          <Image
            src={item.imageUrl}
            alt={item.label}
            loading="lazy"
            quality={75}
            width={100}
            height={100}
            sizes="100px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div style={{ paddingLeft: 8, paddingRight: 8 }}>
            <div>
              <span style={{ wordBreak: "break-word" }}>{item.label}</span>
            </div>
            <div>
              <small>{item.description}</small>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <details
      className="domain-group"
      open={isOpen}
      onToggle={(event) => {
        setIsOpen(event.currentTarget.open);
      }}
    >
      <summary className="domain-group-summary">
        <div style={{ display: "flex" }}>
          <Image
            src={group.items[0].imageUrl}
            alt={group.items[0].label}
            loading="lazy"
            quality={75}
            width={100}
            height={100}
            sizes="100px"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div style={{ paddingLeft: 8, paddingRight: 8 }}>
            <div>
              <span style={{ wordBreak: "break-word" }}>
                {group.siteName} -{" "}
                <span
                  style={{
                    color: "var(--accent-deep)",
                    padding: 0,
                  }}
                >
                  {group.items.length} link
                  {group.items.length > 1 ? "s" : ""}
                </span>
              </span>
            </div>
            <div>
              <small>{group.domain}</small>
            </div>
          </div>
        </div>
      </summary>

      {isOpen && (
        <ul className="sub-link-list">
          {group.items.map((item) => (
            <li key={item.slug}>
              <Link href={`/links/${item.slug}`} className="outbound-link">
                <div style={{ display: "flex" }}>
                  <Image
                    src={item.imageUrl}
                    alt={item.label}
                    loading="lazy"
                    quality={75}
                    width={100}
                    height={100}
                    sizes="100px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <div
                    style={{
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                  >
                    <div>
                      <span style={{ wordBreak: "break-word" }}>
                        {item.label} |{" "}
                        <span>
                          {domainCount} domain
                          {domainCount > 1 ? "s" : ""}
                        </span>
                      </span>
                    </div>
                    <div>
                      <small>{item.description}</small>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}