"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
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
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  priority,
}) => {
  return (
    <Column fillWidth gap="m" className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
      <Carousel
        priority={priority}
        radius="m"
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
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingTop="16"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap paddingTop="8">
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  href={href}
                >
                  <Text variant="heading-strong-xs" onBackground="brand-strong">Read Case Study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  href={link}
                >
                  <Text variant="heading-strong-xs" onBackground="neutral-strong">View Project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
