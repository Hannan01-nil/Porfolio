"use client";

import {
  Carousel,
  Column,
  Flex,
  Heading,
  Icon,
  SmartLink,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  link: string;
  tag?: string;
  extraLinks?: { label: string; link: string; icon?: string }[];
  readMoreLink?: string;
  reportLink?: string;
  reportLabel?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  link,
  priority,
  tag,
  extraLinks,
  readMoreLink,
  reportLink,
  reportLabel,
}) => {
  return (
    <Column 
      fillWidth 
      gap="m" 
      className="project-card-premium"
    >
      <div className="project-image-container">
        <Carousel
          priority={priority}
          radius="l"
          aspectRatio="16 / 9"
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
          {...(images.length > 1 && {
            indicator: "line",
            controls: true,
            play: {
              auto: true,
              interval: 2500,
              controls: true,
              progress: true,
            },
          })}
        />
      </div>
      <div className="project-card-content">
        {tag && (
          <div className={`project-badge ${tag === 'Group Project' ? 'badge-group' : 'badge-individual'}`}>
            {tag}
          </div>
        )}

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title && (
            <Heading 
              as="h2" 
              wrap="balance" 
              variant="heading-strong-xl" 
              style={{ 
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: 'white'
              }}
            >
              {title}
            </Heading>
          )}
        </div>

        {description?.trim() && (
          <Text 
            wrap="balance" 
            variant="body-default-m" 
            style={{ 
              lineHeight: '1.8', 
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '1rem',
              width: '100%',
              maxWidth: '100%'
            }}
          >
            {description}
          </Text>
        )}

        <div className="project-footer">
          <SmartLink
            href={readMoreLink || href}
            className="project-pill-btn project-pill-btn-primary"
            {...(readMoreLink && { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon name="arrowRight" size="18" />
            Read More
          </SmartLink>

          {link && (
            <SmartLink
              href={link}
              className="project-pill-btn project-pill-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={link.includes('github') ? 'github' : 'arrowUpRightFromSquare'} size="18" />
              View Project
            </SmartLink>
          )}

          {reportLink && (
            <SmartLink
              href={reportLink}
              className="project-pill-btn project-pill-btn-secondary report-btn pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="document" size="18" />
              {reportLabel || "Project Report"}
            </SmartLink>
          )}

          {extraLinks?.map((extra, idx) => (
            <SmartLink
              key={idx}
              href={extra.link}
              className="project-pill-btn project-pill-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={(extra.icon as any) || 'arrowUpRightFromSquare'} size="18" />
              {extra.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </Column>
  );
};
