"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton, Button, Icon, Column } from "@once-ui-system/core";

import { about, contact, display, locationLabel, person, resume, routes, work } from "@/resources";

import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Fade removed — was causing grey-line artefact during scroll */}
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="fixed"
        as="header"
        fillWidth
        padding="8"
        top="0"
        style={{
          zIndex: 99999,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
          padding: "16px 24px",
          transition: "transform 0.3s ease",
        }}
      >
        <Row
          fillWidth
          vertical="center"
          textVariant="body-default-s"
          style={{ color: "var(--text-secondary)" }}
        >
          {display.location && <Row s={{ hide: true }}>{locationLabel}</Row>}
        </Row>

        <Row horizontal="center" className="desktop-nav" s={{ hide: true }}>
          <Row className="pill-nav" radius="m-4" padding="4" horizontal="center" zIndex={1}>
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" label="Home" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <ToggleButton prefixIcon="person" href="/about" label={about.label} selected={pathname === "/about"} />
              )}
              {routes["/work"] && (
                <ToggleButton prefixIcon="grid" href="/work" label={work.label} selected={pathname.startsWith("/work")} />
              )}
              {routes["/resume"] && (
                <ToggleButton prefixIcon="document" href="/resume" label={resume.label} selected={pathname === "/resume"} />
              )}
              {routes["/contact"] && (
                <ToggleButton prefixIcon="email" href="/contact" label={contact.label} selected={pathname === "/contact"} />
              )}
            </Row>
          </Row>
        </Row>

        {/* MOBILE HAMBURGER TOGGLE */}
        <Row hide s={{ hide: false }} horizontal="center" zIndex={10}>
          <Button
            variant="secondary"
            size="m"
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ borderRadius: "50%", padding: "12px", background: "var(--magic-glass-bg)", border: "1px solid var(--magic-border)", zIndex: 999999 }}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} size="m" />
          </Button>
        </Row>

        {/* FULL SCREEN MOBILE MENU OVERLAY */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay">
            <Column gap="24" horizontal="center" vertical="center" fillWidth>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" label="Home" selected={pathname === "/"} />
              )}
              {routes["/about"] && (
                <ToggleButton prefixIcon="person" href="/about" label={about.label} selected={pathname === "/about"} />
              )}
              {routes["/work"] && (
                <ToggleButton prefixIcon="grid" href="/work" label={work.label} selected={pathname.startsWith("/work")} />
              )}
              {routes["/resume"] && (
                <ToggleButton prefixIcon="document" href="/resume" label={resume.label} selected={pathname === "/resume"} />
              )}
              {routes["/contact"] && (
                <ToggleButton prefixIcon="email" href="/contact" label={contact.label} selected={pathname === "/contact"} />
              )}
            </Column>
          </div>
        )}

        <Flex
          fillWidth
          horizontal="end"
          vertical="center"
          textVariant="body-default-s"
          style={{ color: "var(--text-secondary)" }}
        >
          <Flex paddingRight="12" horizontal="end" vertical="center" gap="20">
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
