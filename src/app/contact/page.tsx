import { Button, Column, Heading, Text, Meta, Schema, Row, Icon } from "@once-ui-system/core";
import { baseURL, contact, person, social, locationLabel, phone, resume } from "@/resources";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function Contact() {
  return (
    <Column maxWidth="s" fillWidth paddingY="64" gap="32" horizontal="center">
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
      <Column className="glass-panel fade-in-section is-visible" fillWidth padding="48" horizontal="center" gap="32">
        <Column horizontal="center" gap="16">
            <Heading variant="display-strong-s" onBackground="brand-strong">{contact.label}</Heading>
            <Text align="center" variant="heading-default-m" onBackground="neutral-weak">
                {contact.description}
            </Text>
        </Column>

        <Column gap="24" fillWidth padding="24" className="glass-panel" style={{ background: 'rgba(59,130,246,0.05)' }}>
            <Row vertical="center" gap="16">
                <Icon name="email" size="m" onBackground="brand-strong"/>
                <Text variant="heading-strong-s">{person.email}</Text>
            </Row>
            <Row vertical="center" gap="16">
                <Icon name="mobile" size="m" onBackground="brand-strong" />
                <Text variant="heading-strong-s">{phone}</Text>
            </Row>
            <Row vertical="center" gap="16">
                <Icon name="globe" size="m" onBackground="brand-strong"/>
                <Text variant="heading-strong-s">{locationLabel}</Text>
            </Row>
        </Column>

        <Row gap="16" wrap horizontal="center">
          <Button href={`mailto:${person.email}`} size="m" variant="primary" prefixIcon="email" weight="strong" style={{ background: 'var(--brand-background-strong)', color: '#fff' }}>
            Email Me
          </Button>
          <Button href={resume.path} size="m" variant="secondary" prefixIcon="document">
            Resume
          </Button>
        </Row>

        <Row gap="16" wrap horizontal="center" paddingTop="16">
           {social.map((item) => (
             <Button
                key={item.name}
                href={item.link}
                size="l"
                variant="tertiary"
                prefixIcon={item.icon}
             />
           ))}
        </Row>
      </Column>
    </Column>
  );
}
