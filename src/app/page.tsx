import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Avatar,
  Icon,
  Flex
} from "@once-ui-system/core";
import { home, person, baseURL, social, resume, contact, homeRotatingSubtitles, homeBadges } from "@/resources";
import React from 'react';
import Link from 'next/link';

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
    <Column fillWidth gap="xl" paddingY="12" horizontal="center">
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
      
      {/* HERO SECTION */}
      <Column fillWidth horizontal="center" gap="m" paddingBottom="64" paddingTop="32">
        <Column maxWidth="m" horizontal="center" align="center">
          
          <RevealFx translateY="12" delay={0.1} fillWidth horizontal="center" paddingBottom="24">
            <div className="glass-panel" style={{ padding: '8px', borderRadius: '50%', marginBottom: '16px' }}>
              <Avatar src={person.avatar} size="xl" />
            </div>
            <Heading wrap="balance" variant="display-strong-xl" style={{ fontSize: '3.5rem', marginTop: '16px', textShadow: '0 0 40px rgba(59,130,246,0.5)'}}>
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="24">
            <Heading variant="heading-strong-xl" onBackground="brand-strong">
              <span className="rotating-text-wrapper">
                <span className="rotating-text">
                  {homeRotatingSubtitles.map((text, i) => (
                    <Text as="span" key={i} style={{ display: 'block' }}>{text}</Text>
                  ))}
                  <Text as="span" style={{ display: 'block' }}>{homeRotatingSubtitles[0]}</Text> {/* Clone first element for smooth loop */}
                </span>
              </span>
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.3} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" align="center" onBackground="neutral-weak" variant="heading-default-m" style={{ maxWidth: '600px' }}>
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx delay={0.4} horizontal="center">
            <Row gap="16" wrap horizontal="center" paddingBottom="32">
              {social.map((item) => (
                <Button
                  key={item.name}
                  href={item.link}
                  size="m"
                  weight="default"
                  variant="secondary"
                  prefixIcon={item.icon}
                  className="glass-panel"
                >
                  {item.name}
                </Button>
              ))}
              <Button
                href={resume.path}
                size="m"
                weight="strong"
                variant="primary"
                prefixIcon="document"
                style={{ background: 'var(--brand-background-strong)', color: '#fff', boxShadow: '0 0 15px rgba(29, 78, 216, 0.5)' }}
              >
                Resume
              </Button>
              <Button
                href={contact.path}
                size="m"
                weight="default"
                variant="secondary"
                prefixIcon="email"
                className="glass-panel"
              >
                Contact
              </Button>
            </Row>
          </RevealFx>
          
          <RevealFx delay={0.5} horizontal="center">
            <Row gap="12" wrap horizontal="center">
              {homeBadges.map((badge, idx) => (
                <Badge
                  key={idx}
                  background="surface"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  className="glass-panel"
                >
                  <Row paddingY="2"><Icon name="check" size="xs" onBackground="brand-strong" style={{marginRight: '6px'}}/> {badge}</Row>
                </Badge>
              ))}
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* ABOUT PREVIEW */}
      <RevealFx translateY="24" delay={0.6} className="fade-in-section is-visible">
         <Column maxWidth="m" fillWidth padding="32" className="glass-panel" gap="16" horizontal="center">
            <Heading variant="heading-strong-xl">Ready to Learn More?</Heading>
            <Text align="center" onBackground="neutral-weak">
              Get an in-depth view of my educational journey, core technical skills, and what I am currently working toward.
            </Text>
            <Button
              href="/about"
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
              style={{ marginTop: '16px' }}
            >
              Go to About Page
            </Button>
         </Column>
      </RevealFx>
    </Column>
  );
}
