"use client";

import React, { useEffect, useState } from "react";

const navItems = [
  {
    id: "education",
    label: "Education",
    icon: "https://api.iconify.design/mdi:school-outline.svg?color=white",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "https://api.iconify.design/mdi:briefcase-outline.svg?color=white",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: "https://api.iconify.design/mdi:map-marker-path.svg?color=white",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "https://api.iconify.design/mdi:flash-outline.svg?color=white",
  },
  {
    id: "creativity",
    label: "Creativity",
    icon: "https://api.iconify.design/mdi:palette-outline.svg?color=white",
  },
];

const ACTIVE_VISIBILITY_THRESHOLD = 0.45;

export function AboutQuickNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const centeredVisibleEntry = entries
          .filter(
            (entry) =>
              entry.isIntersecting && entry.intersectionRatio >= ACTIVE_VISIBILITY_THRESHOLD,
          )
          .sort((a, b) => {
            const viewportCenter = window.innerHeight / 2;
            const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2;
            const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2;

            return Math.abs(aCenter - viewportCenter) - Math.abs(bCenter - viewportCenter);
          })[0];

        setActiveSection(centeredVisibleEntry?.target.id ?? null);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25, ACTIVE_VISIBILITY_THRESHOLD, 0.6, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="quick-nav-container">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`hero-nav-btn ${activeSection === item.id ? "active" : ""}`}
          onClick={() => setActiveSection(item.id)}
        >
          <img src={item.icon} alt="" className="hero-nav-icon" />
          {item.label}
        </a>
      ))}
    </div>
  );
}
