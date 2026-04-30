import { AchievementWheel } from "@/components/AchievementWheel";
import { SkillsSection } from "@/components/SkillsSection";
import {
  about,
  aboutCreative,
  aboutTimeline,
  baseURL,
  homeBadges,
  locationLabel,
  person,
  phone,
} from "@/resources";
import {
  Button,
  Column,
  Heading,
  Icon,
  Meta,
  RevealFx,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import Image from "next/image";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column
      id="about-top"
      fillWidth
      horizontal="center"
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        width: "100%",
        maxWidth: "100%",
        border: "none",
      }}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1: ABOUT HERO (FIRST VIEWPORT)                              */}
      {/* ------------------------------------------------------------------ */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        style={{
          minHeight: "90svh",
          padding: "48px 24px 80px",
          justifyContent: "center",
          transform: "translateY(-60px)",
        }}
        s={{
          minHeight: "auto",
          transform: "none",
          padding: "100px 24px 64px",
        }}
      >
        <Row
          fillWidth
          maxWidth="xl"
          horizontal="between"
          vertical="center"
          gap="48"
          wrap={false}
          s={{ direction: "column", horizontal: "center", gap: "48" }}
        >
          {/* COLUMN 1: LEFT (IMAGE) */}
          <Column style={{ width: "28%" }} horizontal="center" s={{ width: "100%" }}>
            <RevealFx translateY="20" delay={0.1}>
              <div
                className="floating-avatar"
                style={{
                  overflow: "hidden",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "var(--magic-glass-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--card-shadow)",
                  border: "1px solid var(--magic-border)",
                }}
              >
                <div
                  style={{
                    width: 304,
                    height: 304,
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    border: "5px solid var(--page-background)",
                  }}
                >
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 280px, 304px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "3% 3%",
                      transform: "scale(1.38)",
                    }}
                    priority
                  />
                </div>
              </div>
            </RevealFx>
          </Column>

          {/* COLUMN 2: CENTER (CONTENT) */}
          <Column flex={1} gap="20" s={{ horizontal: "center", textAlign: "center" }}>
            <RevealFx translateY="16" delay={0.2}>
              <Heading
                variant="display-strong-xs"
                className="text-magic-shimmer"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                About Me!
              </Heading>
            </RevealFx>

            <Column gap="16">
              <RevealFx translateY="12" delay={0.3}>
                <Text
                  variant="body-default-l"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.15rem" }}
                >
                  Glad You're Here👋 I'm{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                    Mohamed Hannan N
                  </span>
                  , a BCA student at VIT Vellore who loves exploring{" "}
                  <span
                    style={{
                      background: "var(--g-violet)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    software development
                  </span>
                  ,{" "}
                  <span
                    style={{
                      background: "var(--g-cyan)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    web technologies
                  </span>
                  , and{" "}
                  <span
                    style={{
                      background: "var(--g-purple)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    AI/ML
                  </span>
                  .
                </Text>
              </RevealFx>

              <RevealFx translateY="12" delay={0.4}>
                <Text
                  variant="body-default-l"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.15rem" }}
                >
                  I enjoy building useful projects, learning modern tools, and constantly upgrading
                  my skills through{" "}
                  <span
                    style={{
                      background: "var(--g-orange)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    hands-on experience
                  </span>
                  .
                </Text>
              </RevealFx>

              <RevealFx translateY="12" delay={0.5}>
                <Text
                  variant="body-default-l"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.25rem" }}
                >
                  Turning ideas into real applications and solving practical problems is something I
                  genuinely enjoy.
                </Text>
              </RevealFx>

              <RevealFx translateY="12" delay={0.6}>
                <Text
                  variant="body-default-l"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.25rem" }}
                >
                  🎬 Beyond technology, I have a creative side with interests in{" "}
                  <span
                    style={{
                      background: "var(--g-pink)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    video editing
                  </span>
                  ,{" "}
                  <span
                    style={{
                      background: "var(--g-orange)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    photography
                  </span>
                  , design, and{" "}
                  <span
                    style={{
                      background: "var(--g-cyan)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    content creation
                  </span>
                  .
                </Text>
              </RevealFx>

              <RevealFx translateY="12" delay={0.7}>
                <Text
                  variant="body-default-l"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.25rem" }}
                >
                  🌍 I also enjoy exploring new places and staying updated with emerging digital
                  trends.
                </Text>
              </RevealFx>
            </Column>

            <RevealFx translateY="8" delay={0.4}>
              <Row wrap gap="12" s={{ horizontal: "center" }}>
                <div className="glass-tag" style={{ padding: "8px 16px" }}>
                  <Icon name="globe" size="s" style={{ color: "var(--c-cyan-2)" }} />
                  <Text variant="body-default-m" style={{ fontWeight: "bold" }}>
                    Vaniyambadi
                  </Text>
                </div>
                <div className="glass-tag" style={{ padding: "8px 16px" }}>
                  <Icon name="rocket" size="s" style={{ color: "var(--c-purple-2)" }} />
                  <Text variant="body-default-m" style={{ fontWeight: "bold" }}>
                    Open to Opportunities
                  </Text>
                </div>
                <div className="glass-tag" style={{ padding: "8px 16px" }}>
                  <Icon name="sparkles" size="s" style={{ color: "var(--c-orange-2)" }} />
                  <Text variant="body-default-m" style={{ fontWeight: "bold" }}>
                    Fast Learner
                  </Text>
                </div>
                <div className="glass-tag" style={{ padding: "8px 16px" }}>
                  <Icon name="eye" size="s" style={{ color: "var(--c-pink-2)" }} />
                  <Text variant="body-default-m" style={{ fontWeight: "bold" }}>
                    Creative Thinker
                  </Text>
                </div>
              </Row>
            </RevealFx>
          </Column>

          {/* COLUMN 3: RIGHT (NAV) */}
          <Column style={{ width: "260px" }} gap="16" s={{ width: "100%", horizontal: "center" }}>
            <RevealFx translateY="16" delay={0.4}>
              <div className="quick-nav-container">
                <a href="#education" className="hero-nav-btn">
                  <img
                    src="https://api.iconify.design/mdi:school-outline.svg?color=white"
                    alt=""
                    className="hero-nav-icon"
                  />
                  Education
                </a>
                <a href="#roadmap" className="hero-nav-btn">
                  <img
                    src="https://api.iconify.design/mdi:map-marker-path.svg?color=white"
                    alt=""
                    className="hero-nav-icon"
                  />
                  Roadmap
                </a>
                <a href="#skills" className="hero-nav-btn">
                  <img
                    src="https://api.iconify.design/mdi:flash-outline.svg?color=white"
                    alt=""
                    className="hero-nav-icon"
                  />
                  Skills
                </a>
                <a href="#creativity" className="hero-nav-btn">
                  <img
                    src="https://api.iconify.design/mdi:palette-outline.svg?color=white"
                    alt=""
                    className="hero-nav-icon"
                  />
                  Creativity
                </a>
              </div>
            </RevealFx>
          </Column>
        </Row>
      </Column>

      <Column
        id="education"
        fillWidth
        horizontal="center"
        style={{
          paddingBlock: "120px",
          background:
            "linear-gradient(to bottom, transparent, rgba(var(--c-purple-2), 0.05), transparent)",
        }}
      >
        <Column maxWidth="xl" fillWidth paddingX="24" gap="64">
          <RevealFx translateY="20">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "48px",
                marginTop: "100px",
              }}
            >
              <h2
                className="sectionAnimatedTitle"
                style={{
                  fontSize: "clamp(56px, 8vw, 110px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                EDUCATION
              </h2>
            </div>
          </RevealFx>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "40px",
            }}
          >
            {/* COLLEGE CARD */}
            <RevealFx translateY="20" delay={0.1}>
              <Column
                className="magic-card"
                padding="48"
                gap="32"
                style={{ height: "100%", position: "relative" }}
              >
                <Row horizontal="between" vertical="start">
                  <Column gap="8">
                    <Heading variant="heading-strong-l" className="text-primary">
                      VIT Vellore
                    </Heading>
                    <Text
                      variant="heading-default-s"
                      style={{ color: "var(--c-cyan-2)", fontWeight: 600 }}
                    >
                      Bachelor of Computer Applications (BCA) –{" "}
                      <span
                        style={{
                          background: "var(--g-violet)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        AI/ML Specialization
                      </span>
                    </Text>
                  </Column>
                  <div
                    style={{
                      background: "rgba(var(--c-purple-2), 0.1)",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid var(--magic-border)",
                    }}
                  >
                    <Icon name="academy" size="m" style={{ color: "var(--c-purple-2)" }} />
                  </div>
                </Row>

                <Row gap="16" vertical="center" wrap>
                  {/* Year Badge – violet */}
                  <div
                    className="edu-badge"
                    style={{
                      background: "rgba(139, 92, 246, 0.12)",
                      border: "1px solid rgba(139, 92, 246, 0.45)",
                      boxShadow:
                        "0 0 16px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <Icon name="calendar" size="xs" style={{ color: "#a78bfa" }} />
                    <span
                      style={{
                        color: "#e2d9ff",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      2024 – 2027
                    </span>
                  </div>

                  {/* CGPA Badge – cyan */}
                  <div
                    className="edu-badge"
                    style={{
                      background: "rgba(34, 211, 238, 0.08)",
                      border: "1px solid rgba(34, 211, 238, 0.45)",
                      boxShadow:
                        "0 0 16px rgba(34, 211, 238, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                      CGPA:{" "}
                      <span
                        style={{
                          background: "linear-gradient(to right, #22d3ee, #67e8f9)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        8.92
                      </span>
                    </span>
                  </div>
                </Row>

                <Text
                  variant="body-default-m"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.05rem" }}
                >
                  Currently pursuing BCA with{" "}
                  <span
                    style={{
                      background: "var(--g-violet)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    AI/ML specialization
                  </span>
                  , focusing on software development, machine learning, computer science
                  fundamentals, web technologies, and modern tools.
                </Text>
              </Column>
            </RevealFx>

            {/* SCHOOL CARD */}
            <RevealFx translateY="20" delay={0.2}>
              <Column className="magic-card" padding="48" gap="32" style={{ height: "100%" }}>
                <Row horizontal="between" vertical="start">
                  <Column gap="8">
                    <Heading variant="heading-strong-l" className="text-primary">
                      Islamiah Boys Hr Sec School
                    </Heading>
                    <Text
                      variant="heading-default-s"
                      style={{
                        background: "linear-gradient(to right, #34d399, #2dd4bf, #22d3ee)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 600,
                      }}
                    >
                      Higher Secondary Education
                    </Text>
                  </Column>
                  <div
                    style={{
                      background: "rgba(52, 211, 153, 0.08)",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid rgba(52, 211, 153, 0.25)",
                    }}
                  >
                    <Icon name="school" size="m" style={{ color: "#34d399" }} />
                  </div>
                </Row>

                {/* Location Badge – teal */}
                <div
                  className="edu-badge"
                  style={{
                    background: "rgba(45, 212, 191, 0.08)",
                    border: "1px solid rgba(45, 212, 191, 0.4)",
                    boxShadow:
                      "0 0 14px rgba(45, 212, 191, 0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
                    width: "fit-content",
                  }}
                >
                  <Icon name="globe" size="xs" style={{ color: "#2dd4bf" }} />
                  <span style={{ color: "#a7f3d0", fontWeight: 700, fontSize: "0.9rem" }}>
                    Vaniyambadi
                  </span>
                </div>

                <Row gap="16" wrap>
                  {/* 12th Badge – purple */}
                  <div
                    className="edu-badge"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.45)",
                      boxShadow:
                        "0 0 16px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                        color: "#e2d9ff",
                      }}
                    >
                      12th Grade:{" "}
                      <span
                        style={{
                          background: "linear-gradient(to right, #a78bfa, #c4b5fd)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        88%
                      </span>
                    </span>
                  </div>

                  {/* 10th Badge – emerald */}
                  <div
                    className="edu-badge"
                    style={{
                      background: "rgba(52, 211, 153, 0.08)",
                      border: "1px solid rgba(52, 211, 153, 0.45)",
                      boxShadow:
                        "0 0 16px rgba(52, 211, 153, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                        color: "#a7f3d0",
                      }}
                    >
                      10th Grade:{" "}
                      <span
                        style={{
                          background: "linear-gradient(to right, #34d399, #6ee7b7)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        79%
                      </span>
                    </span>
                  </div>
                </Row>

                <Text
                  variant="body-default-m"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.05rem" }}
                >
                  Built a strong academic foundation with consistent performance, with particular
                  strength in{" "}
                  <span
                    style={{
                      background: "var(--g-cyan)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    Mathematics
                  </span>{" "}
                  and{" "}
                  <span
                    style={{
                      background: "var(--g-violet)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    Computer Science
                  </span>
                  .
                </Text>
              </Column>
            </RevealFx>
          </div>
        </Column>
      </Column>

      <div id="roadmap">
        <AchievementWheel />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4: TECHNICAL SKILLS (FUTURISTIC DASHBOARD)                 */}
      {/* ------------------------------------------------------------------ */}
      <div id="skills">
        <SkillsSection skills={about.technical.skills} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5: CREATIVE SIDE (CINEMATIC & ARTISTIC)                   */}
      {/* ------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5: CREATIVE SIDE (CINEMATIC & ARTISTIC)                   */}
      {/* ------------------------------------------------------------------ */}
      <Column
        id="creativity"
        fillWidth
        horizontal="center"
        paddingTop="160"
        paddingBottom="160"
        className="creative-side-container"
      >
        {/* Background Blobs */}
        <div className="creative-blob creative-blob-1" />
        <div className="creative-blob creative-blob-2" />

        {/* Header Perfectly Centered (Roadmap Style) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <RevealFx translateY="20">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Heading
                variant="display-strong-xs"
                align="center"
                className="sectionAnimatedTitle"
                style={{
                  fontSize: "clamp(56px, 8vw, 110px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: "0 auto",
                }}
              >
                CREATIVE SIDE
              </Heading>
              <Text
                variant="body-default-l"
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.8,
                  textAlign: "center",
                  maxWidth: "700px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  lineHeight: 1.6,
                  marginTop: "12px",
                }}
              >
                Where technology meets imagination.
              </Text>
            </div>
          </RevealFx>
        </div>

        <Column
          maxWidth="xl"
          fillWidth
          paddingX="24"
          gap="64"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Hero Quote Card (Luxurious) */}
          <RevealFx translateY="32" delay={0.1}>
            <div className="quote-card">
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(168, 85, 247, 0.1)",
                  borderRadius: "50%",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)",
                }}
              >
                <img
                  src="https://api.iconify.design/mdi:camera-iris.svg?color=%23a855f7"
                  alt="Lens"
                  style={{ width: "32px", height: "32px" }}
                />
              </div>
              <Text
                variant="heading-default-m"
                style={{
                  fontStyle: "italic",
                  color: "white",
                  lineHeight: "1.7",
                  fontSize: "clamp(1.25rem, 4vw, 1.85rem)",
                  maxWidth: "850px",
                  margin: "0 auto",
                  fontWeight: 300,
                  letterSpacing: "0.015em",
                }}
              >
                "Every engineer carries a hidden camera instinct — always noticing frames, details,
                stories, and beauty."
              </Text>
            </div>
          </RevealFx>

          {/* Creative Premium Grid (Symmetrical & Polished) */}
          <div className="creative-premium-grid">
            {[
              {
                title: "Photography",
                desc: "Capturing stories through perspective.",
                icon: "mdi:camera-outline",
                cls: "item-cyan",
              },
              {
                title: "Videography",
                desc: "Turning motion into emotion.",
                icon: "mdi:video-outline",
                cls: "item-purple",
              },
              {
                title: "Video Editing",
                desc: "Crafting narratives with precision.",
                icon: "mdi:content-cut",
                cls: "item-pink",
              },
              {
                title: "Creative Framing",
                desc: "Designing every angle with purpose.",
                icon: "mdi:crop-free",
                cls: "item-blue",
              },
              {
                title: "Content Creation",
                desc: "Building digital experiences.",
                icon: "mdi:rocket-launch-outline",
                cls: "item-orange",
              },
            ].map((item, idx) => (
              <RevealFx key={item.title} translateY="20" delay={0.2 + idx * 0.1}>
                <div className={`creative-item ${item.cls}`}>
                  <div className="creative-icon-wrapper">
                    <img
                      src={`https://api.iconify.design/${item.icon}.svg?color=currentColor`}
                      alt={item.title}
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>
                  <Heading
                    variant="heading-strong-s"
                    style={{
                      color: "white",
                      marginBottom: "12px",
                      letterSpacing: "0.04em",
                      fontSize: "1.25rem",
                    }}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    variant="body-default-m"
                    style={{
                      color: "var(--text-secondary)",
                      opacity: 0.7,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.desc}
                  </Text>
                </div>
              </RevealFx>
            ))}
          </div>
        </Column>
      </Column>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER CLEANUP                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Column fillWidth horizontal="center" paddingY="64">
        <Column maxWidth="xl" fillWidth paddingX="24">
          <Row horizontal="end" vertical="center">
            <Row gap="24">
              <a
                href="#about-top"
                className="back-to-top-button"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://api.iconify.design/mdi:arrow-up.svg?color=white"
                  alt="Up"
                  className="back-to-top-icon"
                />
                Back to Top
              </a>
            </Row>
          </Row>
        </Column>
      </Column>
    </Column>
  );
}
