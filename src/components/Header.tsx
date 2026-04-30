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

        <Row horizontal="center">
          <Row className="pill-nav" radius="m-4" padding="4" horizontal="center" zIndex={1}>
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon="home" href="/" label="Home" selected={pathname === "/"} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon="person" href="/about" label={about.label} selected={pathname === "/about"} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="person" href="/about" selected={pathname === "/about"} />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon="grid" href="/work" label={work.label} selected={pathname.startsWith("/work")} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="grid" href="/work" selected={pathname.startsWith("/work")} />
                  </Row>
                </>
              )}
              {routes["/resume"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon="document" href="/resume" label={resume.label} selected={pathname === "/resume"} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="document" href="/resume" selected={pathname === "/resume"} />
                  </Row>
                </>
              )}
              {routes["/contact"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton prefixIcon="email" href="/contact" label={contact.label} selected={pathname === "/contact"} />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="email" href="/contact" selected={pathname === "/contact"} />
                  </Row>
                </>
              )}
            </Row>
          </Row>
        </Row>

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
