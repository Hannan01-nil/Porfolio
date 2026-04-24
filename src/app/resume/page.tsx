import { Button, Column, Heading, Text, Meta, Schema, Row } from "@once-ui-system/core";
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
    <Column maxWidth="l" fillWidth paddingY="32" gap="48" horizontal="center">
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
      <Column className="fade-in-section is-visible" fillWidth padding="24" horizontal="center" gap="32">
        <Column horizontal="center" gap="l">
            <Heading variant="display-strong-xs" onBackground="neutral-strong">{resume.title}</Heading>
            <Text align="center" variant="heading-default-m" onBackground="neutral-weak">
                {resume.description}
            </Text>
        </Column>

        <Row gap="24" wrap horizontal="center">
          <Button href="/resume.pdf" size="l" variant="primary" prefixIcon="download" weight="strong" style={{ background: '#fff', color: '#000', boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
            Download Resume
          </Button>
          <Button href="/resume.pdf" target="_blank" size="l" variant="secondary" prefixIcon="arrowUpRightFromSquare">
            Open Resume
          </Button>
        </Row>
      </Column>

      <Column className="magic-card fade-in-section is-visible" fillWidth style={{ height: '800px', overflow: 'hidden' }}>
        <iframe
          src="/resume.pdf#toolbar=0"
          width="100%"
          height="100%"
          style={{ border: 'none', borderRadius: '16px' }}
          title="Resume Preview"
        />
      </Column>
    </Column>
  );
}
