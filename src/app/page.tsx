import { TypingEffect } from "@/components/TypingEffect";
import { baseURL, home, homeRotatingSubtitles, person, social } from "@/resources";
import { Button, Column, Heading, Meta, RevealFx, Row, Schema, Text } from "@once-ui-system/core";
import Image from "next/image";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1: FULL SCREEN HERO (100VH)                                */}
      {/* ------------------------------------------------------------------ */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        style={{
          minHeight: "100svh",
          padding: "clamp(16px, 4vw, 32px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 24px)",
          justifyContent: "center",
          transform: "translateY(-80px)",
        }}
        s={{
          transform: "none",
          minHeight: "100svh",
          padding: "16px 16px 100px",
          justifyContent: "center",
        }}
        gap="24"
      >
        <RevealFx translateY="16" delay={0.1} horizontal="center">
          <div
            className="floating-avatar"
            style={{
              overflow: "hidden",
              width: "clamp(150px, 25vw, 240px)",
              height: "clamp(150px, 25vw, 240px)",
              borderRadius: "50%",
              background: "var(--magic-glass-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              style={{
                width: "calc(100% - 12px)",
                height: "calc(100% - 12px)",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                sizes="(max-width: 768px) 200px, 228px"
                style={{ objectFit: "cover", objectPosition: "3% 3%", transform: "scale(1.38)" }}
                priority
              />
            </div>
          </div>
        </RevealFx>

        <RevealFx translateY="12" delay={0.2} horizontal="center">
          <Heading
            className="text-magic-shimmer"
            wrap="balance"
            align="center"
            variant="display-strong-xs"
            style={{
              fontSize: "clamp(1.75rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
              fontWeight: 900,
              marginTop: "clamp(12px, 3vw, 24px)",
              lineHeight: 1.1,
              paddingBottom: "0.1em",
            }}
          >
            Mohamed Hannan N
          </Heading>
        </RevealFx>

        <RevealFx translateY="8" delay={0.3} horizontal="center">
          <div
            style={{
              minHeight: "clamp(40px, 6vw, 60px)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <Heading
              align="center"
              variant="heading-strong-xl"
              style={{
                fontSize: "clamp(0.95rem, 3vw, 2.5rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <TypingEffect titles={homeRotatingSubtitles} />
            </Heading>
          </div>
        </RevealFx>
      </Column>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2: INTRO AND CONNECT (SCROLL DOWN)                           */}
      {/* ------------------------------------------------------------------ */}
      <Column
        fillWidth
        horizontal="center"
        paddingY="80"
        gap="64"
        style={{ padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px) clamp(80px, 14vw, 120px)" }}
        s={{ gap: "40", padding: "24px 16px 100px" }}
      >
        {/* INTRO BLOCK */}
        <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center">
          <Column maxWidth="m" gap="32" horizontal="center">
            <Text
              wrap="balance"
              align="center"
              variant="heading-default-l"
              style={{ color: "var(--text-secondary)", maxWidth: "720px", lineHeight: "1.8" }}
            >
              Hey 👋 I'm Hannan, a BCA student who enjoys learning new{" "}
              <span
                style={{
                  background: "var(--g-purple)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(192,132,252,0.2)",
                  fontWeight: 600,
                }}
              >
                technologies
              </span>{" "}
              and building useful digital solutions.
            </Text>
            <Text
              wrap="balance"
              align="center"
              variant="heading-default-m"
              style={{ color: "var(--text-secondary)", maxWidth: "720px", lineHeight: "1.8" }}
            >
              I love creating websites, exploring{" "}
              <span
                style={{
                  background: "var(--g-violet)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(167,139,250,0.2)",
                  fontWeight: 600,
                }}
              >
                backend systems
              </span>
              , and understanding how software works behind the scenes.
            </Text>
            <Text
              wrap="balance"
              align="center"
              variant="heading-default-m"
              style={{ color: "var(--text-secondary)", maxWidth: "720px", lineHeight: "2.0" }}
            >
              I've gained hands-on experience with{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-python)",
                  textShadow: "0 0 15px rgba(34,211,238,0.2)",
                }}
              >
                Python
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-c)",
                  textShadow: "0 0 15px rgba(203,213,225,0.2)",
                }}
              >
                C
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-python)",
                  textShadow: "0 0 15px rgba(59,130,246,0.2)",
                }}
              >
                C++
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-java)",
                  textShadow: "0 0 15px rgba(249,115,22,0.2)",
                }}
              >
                Java
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-sql)",
                  textShadow: "0 0 15px rgba(34,211,238,0.2)",
                }}
              >
                SQL
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-python)",
                  textShadow: "0 0 15px rgba(59,130,246,0.2)",
                }}
              >
                MySQL
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--g-orange)",
                  textShadow: "0 0 15px rgba(200, 118, 24, 0.2)",
                }}
              >
                HTML
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-python)",
                  textShadow: "0 0 15px rgba(59,130,246,0.2)",
                }}
              >
                CSS
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-js)",
                  textShadow: "0 0 15px rgba(250,204,21,0.2)",
                }}
              >
                JavaScript
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-php)",
                  textShadow: "0 0 15px rgba(139,92,246,0.2)",
                }}
              >
                PHP
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-testing)",
                  textShadow: "0 0 15px rgba(16,185,129,0.2)",
                }}
              >
                Software Testing
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-uiux)",
                  textShadow: "0 0 15px rgba(236,72,153,0.2)",
                }}
              >
                UI/UX Design
              </span>
              ,{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-uiux)",
                  textShadow: "0 0 15px rgba(168,85,247,0.2)",
                }}
              >
                AI Tools
              </span>
              , and{" "}
              <span
                className="skill-badge"
                style={{
                  background: "var(--skill-iot)",
                  textShadow: "0 0 15px rgba(20,184,166,0.2)",
                }}
              >
                IoT
              </span>{" "}
              while continuously improving my practical skills.
            </Text>
            <Text
              wrap="balance"
              align="center"
              variant="heading-default-m"
              style={{ color: "var(--text-secondary)", maxWidth: "720px", lineHeight: "1.8" }}
            >
              My main focus areas include{" "}
              <span
                style={{
                  background: "var(--g-violet)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(167,139,250,0.2)",
                  fontWeight: 600,
                }}
              >
                Software Development
              </span>
              ,{" "}
              <span
                style={{
                  background: "var(--g-cyan)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(34,211,238,0.2)",
                  fontWeight: 600,
                }}
              >
                Web Development
              </span>
              ,{" "}
              <span
                style={{
                  background: "var(--g-purple)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(192,132,252,0.2)",
                  fontWeight: 600,
                }}
              >
                AI/ML
              </span>
              , AI-powered Tools, and Model-Based Development.
            </Text>
            <Text
              wrap="balance"
              align="center"
              variant="heading-default-m"
              style={{ color: "var(--text-secondary)", maxWidth: "720px", lineHeight: "1.8" }}
            >
              I enjoy turning ideas into real projects, learning modern technologies, and growing
              into a{" "}
              <span
                style={{
                  background: "var(--g-pink)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 16px rgba(232,121,249,0.2)",
                  fontWeight: 600,
                }}
              >
                future software engineer
              </span>{" "}
              🚀
            </Text>
          </Column>
        </RevealFx>

        {/* FIND ME ON SECTION */}
        <RevealFx delay={0.2} horizontal="center">
          <Column gap="24" horizontal="center">
            <Column gap="8" horizontal="center">
              <Text
                variant="heading-strong-s"
                style={{
                  background: "var(--g-purple)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(192,132,252,0.2)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Find Me On
              </Text>
              <Text align="center" variant="body-default-m" style={{ color: "var(--text-muted)" }}>
                Feel free to connect with me
              </Text>
            </Column>

            <Row gap="16" wrap horizontal="center" paddingTop="8">
              {social.slice(0, 3).map((item) => {
                let textColor = "var(--text-primary)";
                if (item.name === "LinkedIn") textColor = "#2563eb";
                if (item.name === "Instagram") textColor = "#9333ea";

                return (
                  <Button
                    key={item.name}
                    href={item.link}
                    size="l"
                    weight="default"
                    variant="secondary"
                    prefixIcon={item.icon}
                    className="magic-card"
                    style={{
                      background: "var(--magic-glass-bg)",
                      backdropFilter: "blur(10px)",
                      padding: "0 24px",
                      flex: "1 1 auto",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{ color: textColor, transition: "color 0.3s ease", fontWeight: 600 }}
                    >
                      {item.name}
                    </span>
                  </Button>
                );
              })}
            </Row>
          </Column>
        </RevealFx>
      </Column>
    </Column>
  );
}
