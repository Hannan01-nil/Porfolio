import { ScrollToHash } from "@/components";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import {
  Avatar,
  AvatarGroup,
  Carousel,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return projectsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = projectsData.find((p) => p.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.title,
    description: post.summary,
    baseURL: baseURL,
    image: `/api/og/generate?title=${post.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = projectsData.find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.title}
        description={post.summary}
        datePublished={post.publishedAt}
        dateModified={post.publishedAt}
        image={`/api/og/generate?title=${encodeURIComponent(post.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.publishedAt && formatDate(post.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.team?.map((member, idx) => (
              <span key={member.name}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.images.length > 1 ? (
        <Carousel
          fillWidth
          priority
          radius="m"
          aspectRatio="16 / 9"
          sizes="(max-width: 960px) 100vw, 960px"
          items={post.images.map((image) => ({
            slide: image,
            alt: post.title,
          }))}
          indicator="line"
          controls
          play={{
            auto: true,
            interval: 3000,
            controls: true,
            progress: true,
          }}
        />
      ) : (
        post.images.length > 0 && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt={post.title}
            src={post.images[0]}
          />
        )
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <MarkdownRenderer content={post.body} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
