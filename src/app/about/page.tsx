import {
  Button,
  Column,
  Heading,
  Icon,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  Grid
} from "@once-ui-system/core";
import Image from "next/image";
import {
  baseURL,
  about,
  person,
  locationLabel,
  phone,
  aboutTimeline,
  aboutCreative,
  aboutLearning,
  aboutTools
} from "@/resources";
import styles from "@/components/about/about.module.scss";
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
    <Column maxWidth="m" fillWidth paddingY="32">
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
      
      <Row fillWidth s={{ direction: "column" }} horizontal="center" gap="24">
        
        {/* AVATAR & QUICK INFO */}
        <Column flex={3} gap="m" horizontal="center" style={{ position: 'sticky', top: '80px', height: 'max-content' }} s={{ position: 'relative', top: '0', paddingBottom: '32px' }}>
          <div className="glass-panel" style={{ padding: '8px', borderRadius: '50%' }}>
             <Image
                src={person.avatar}
                alt={person.name}
                width={200}
                height={200}
                priority
                style={{ borderRadius: '50%' }}
              />
          </div>
          <Row gap="8" vertical="center" onBackground="neutral-weak">
             <Icon name="globe" size="s"/> {locationLabel}
          </Row>
          <Row wrap gap="8" horizontal="center">
             <Tag size="m" shadow="m">{phone}</Tag>
          </Row>
        </Column>

        {/* DETAILS COLUMN */}
        <Column flex={9} gap="48" paddingY="16">
          
          {/* PROFESSIONAL SUMMARY */}
          <section className="fade-in-section is-visible glass-panel" style={{ padding: '32px' }}>
             <Heading variant="display-strong-xs" marginBottom="16" onBackground="brand-strong">About Me</Heading>
             {about.intro.description}
          </section>

          {/* EDUCATION */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">Education</Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
               {about.studies.institutions.map((inst, idx) => (
                  <Column key={idx} className="glass-panel" padding="24" gap="12">
                     <Heading variant="heading-strong-m">{inst.name}</Heading>
                     <Text variant="body-default-m" onBackground="neutral-weak">{inst.description}</Text>
                  </Column>
               ))}
            </div>
          </section>

          {/* TIMELINE (MY JOURNEY) */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">My Journey</Heading>
            <Column gap="8" style={{ marginTop: '16px', marginLeft: '16px' }}>
              {aboutTimeline.map((item, idx) => (
                 <div key={idx} className="about-timeline-item">
                    <Text variant="heading-strong-s" onBackground="brand-weak" style={{ display: 'block', marginBottom: '4px' }}>{item.year}</Text>
                    <Text variant="body-default-m" onBackground="neutral-strong">{item.text}</Text>
                 </div>
              ))}
            </Column>
          </section>

          {/* TECHNICAL SKILLS */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">Technical Skills</Heading>
            <Column gap="24">
              {about.technical.skills.map((skill, idx) => (
                 <Column key={idx} className="glass-panel" padding="24">
                    <Text variant="heading-strong-m" marginBottom="8">{skill.title}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak" marginBottom="16">{skill.description}</Text>
                    <Row wrap gap="8">
                       {skill.tags?.map((tag, tIdx) => (
                          <Tag key={tIdx} size="m" shadow="s">{tag.name}</Tag>
                       ))}
                    </Row>
                 </Column>
              ))}
            </Column>
          </section>

          {/* CREATIVE SIDE */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">Creative Side</Heading>
            <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', borderLeft: '4px solid #3b82f6' }}>
               <Text variant="heading-default-m" style={{ fontStyle: 'italic' }}>
                  "Every engineer carries a hidden camera eye — noticing details, angles, moments, and stories everywhere."
               </Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
               {aboutCreative.map((title, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: 'rgba(59,130,246,0.1)' }}>
                     <Text variant="heading-strong-s">{title}</Text>
                  </div>
               ))}
            </div>
          </section>

          {/* CURRENTLY LEARNING */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">Currently Learning</Heading>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
               {aboutLearning.map((item, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '16px 24px' }}>
                     <Row vertical="center" gap="12">
                        <Icon name="chevronRight" size="s" onBackground="brand-strong" />
                        <Text variant="heading-strong-xs">{item}</Text>
                     </Row>
                  </div>
               ))}
            </div>
          </section>

          {/* GITHUB ACTIVITY (Placeholder) */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">GitHub Activity</Heading>
            <Column className="glass-panel" padding="32" gap="24" horizontal="center">
               <Text>A consistent pattern of learning and building.</Text>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '4px', opacity: 0.8 }}>
                  {Array.from({ length: 140 }).map((_, i) => (
                     <div key={i} style={{
                        width: '12px', height: '12px',
                        borderRadius: '2px',
                        background: Math.random() > 0.7 ? '#1d4ed8' : Math.random() > 0.4 ? '#3b82f6' : 'rgba(255,255,255,0.05)'
                     }}/>
                  ))}
               </div>
               <Row wrap gap="16" horizontal="center">
                  <Tag>145 Contributions in 2024</Tag>
                  <Tag>24 Days Longest Streak</Tag>
               </Row>
            </Column>
          </section>

          {/* TOOLS I USE */}
          <section className="fade-in-section is-visible">
            <Heading variant="heading-strong-xl" marginBottom="32">Tools I Use</Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
               {aboutTools.map((tool, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                     <Text variant="body-strong-m">{tool}</Text>
                  </div>
               ))}
            </div>
          </section>

        </Column>
      </Row>
    </Column>
  );
}
