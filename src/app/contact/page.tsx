"use client";

import { 
  Column, 
  Heading, 
  Text, 
  Meta, 
  Schema, 
  Row, 
  Icon, 
  RevealFx 
} from "@once-ui-system/core";
import { 
  baseURL, 
  contact, 
  person, 
  social, 
  locationLabel, 
  phone
} from "@/resources";
import React from "react";

export default function Contact() {
  return (
    <Column 
      fillWidth 
      horizontal="center" 
      vertical="center"
      style={{ 
        position: 'relative', 
        minHeight: '80vh',
        padding: '48px 24px 120px',
        background: 'transparent',
        zIndex: 1
      }}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Main Container Container (720px max) */}
      <RevealFx translateY="20" speed="slow" style={{ width: '100%', maxWidth: '720px' }}>
        <Column 
          fillWidth
          className="magic-card"
          padding="64"
          horizontal="center"
          gap="48"
          style={{ 
            background: 'rgba(10, 10, 20, 0.45)',
            backdropFilter: 'blur(32px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            position: 'relative'
          }}
          s={{ padding: '40px 24px', gap: '40px' }}
        >
          {/* Header Section */}
          <Column horizontal="center" style={{ textAlign: 'center' }} gap="12" fillWidth>
            <Heading 
              variant="display-strong-s" 
              className="text-magic-shimmer" 
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                letterSpacing: '-0.02em', 
                lineHeight: 1.1,
                paddingBottom: '4px'
              }}
            >
              Contact Me!
            </Heading>
            <Text 
              variant="body-default-m" 
              style={{ 
                color: 'var(--text-secondary)', 
                maxWidth: '440px', 
                lineHeight: 1.6,
                opacity: 0.75
              }}
            >
              Feel free to connect anytime. I usually reply quickly and professionally.
            </Text>
          </Column>

          {/* Contact Info Box (Compact & Balanced) */}
          <Column 
            padding="24" 
            gap="20"
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              width: 'fit-content',
              minWidth: '280px'
            }}
            s={{ width: '100%', minWidth: '100%' }}
          >
            <Row vertical="center" gap="16">
              <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                <Icon name="email" size="s" style={{ color: 'var(--c-purple-2)' }}/>
              </div>
              <Text variant="body-default-m" weight="bold" style={{ fontSize: '0.95rem' }}>{person.email}</Text>
            </Row>
            <Row vertical="center" gap="16">
              <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                <Icon name="calendar" size="s" style={{ color: 'var(--c-cyan-2)' }}/>
              </div>
              <Text variant="body-default-m" weight="bold" style={{ fontSize: '0.95rem' }}>{phone}</Text>
            </Row>
            <Row vertical="center" gap="16">
              <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                <Icon name="globe" size="s" style={{ color: 'var(--c-orange-2)' }}/>
              </div>
              <Text variant="body-default-m" weight="bold" style={{ fontSize: '0.95rem' }}>{locationLabel}</Text>
            </Row>
          </Column>

          {/* Action Buttons Row */}
          <Column fillWidth gap="16" horizontal="center">
            <Row gap="16" fillWidth wrap horizontal="center">
              <a 
                href={`mailto:${person.email}`} 
                className="project-pill-btn project-pill-btn-primary"
                style={{ 
                  textDecoration: 'none', 
                  width: '220px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                s={{ width: '100%' }}
              >
                <Icon name="email" size="18" />
                Send Email
              </a>
              <a 
                href="/resume" 
                className="project-pill-btn project-pill-btn-secondary"
                style={{ 
                  textDecoration: 'none', 
                  width: '220px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                s={{ width: '100%' }}
              >
                <Icon name="document" size="18" />
                Download Resume
              </a>
            </Row>
          </Column>

          {/* Social Icons Row */}
          <Column horizontal="center" gap="24" fillWidth paddingTop="8">
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <Row gap="20" horizontal="center" vertical="center">
              {social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-glow-btn"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Icon name={item.icon} size="s" />
                </a>
              ))}
            </Row>
          </Column>

        </Column>
      </RevealFx>
    </Column>
  );
}
