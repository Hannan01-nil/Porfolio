import { Column, Heading, Text, Meta, Schema, Row, RevealFx, Icon } from "@once-ui-system/core";
import { baseURL, resume, person } from "@/resources";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: resume.title,
    description: resume.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(resume.title)}`,
    path: resume.path,
  });
}

export default function Resume() {
  return (
    <Column maxWidth="l" fillWidth paddingY="48" gap="48" horizontal="center" style={{ position: 'relative' }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={resume.title}
        description={resume.description}
        path={resume.path}
        image={`/api/og/generate?title=${encodeURIComponent(resume.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* SUBTLE GLOW BEHIND HERO */}
      <div style={{ 
        position: 'absolute', 
        top: '100px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '300px', 
        height: '200px', 
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', 
        filter: 'blur(40px)', 
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* TOP SECTION: RESTORED ORIGINAL CENTERED LAYOUT */}
      <Column 
        fillWidth 
        paddingX="24" 
        horizontal="center" 
        gap="40" 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          paddingTop: '64px',
          paddingBottom: '40px'
        }}
      >
        <Column horizontal="center" gap="16" style={{ textAlign: 'center' }}>
          <RevealFx translateY="12" delay={0.05} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Heading 
              variant="display-strong-xs" 
              className="text-magic-shimmer"
              style={{ 
                letterSpacing: '-0.03em', 
                textAlign: 'center', 
                margin: 0,
                fontSize: 'clamp(64px, 10vw, 88px)',
                fontWeight: 900,
                lineHeight: '1',
              }}
            >
              Resume
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Text 
              variant="heading-default-m" 
              style={{ 
                color: 'var(--text-secondary)', 
                opacity: 0.7, 
                maxWidth: '600px',
                textAlign: 'center'
              }}
            >
              Academic profile, technical skills, projects, and career-ready experience.
            </Text>
          </RevealFx>
        </Column>

        <RevealFx translateY="8" delay={0.18} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Row gap="20" wrap horizontal="center" vertical="center">
            <a 
              href="/resume.pdf" 
              download="Mohamed_Hannan_Resume.pdf"
              className="resume-btn-download"
            >
              <Icon name="download" size="16" />
              Download Resume
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              className="resume-btn-open"
            >
              <Icon name="arrowUpRight" size="16" />
              Open Resume
            </a>
          </Row>
        </RevealFx>
      </Column>
    </Column>
  );
}
