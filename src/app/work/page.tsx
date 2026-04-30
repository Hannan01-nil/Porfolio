import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { Column, Heading, Meta, RevealFx, Schema, Text } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column
      id="work-top"
      fillWidth
      horizontal="center"
      style={{
        position: "relative",
        overflowX: "hidden",
        isolation: "isolate",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        style={{
          minHeight: "45svh",
          padding: "105px 24px 70px",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <RevealFx
          translateY="20"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h1
            className="sectionAnimatedTitle"
            style={{
              marginBottom: "20px",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            PROJECTS
          </h1>
        </RevealFx>

        <RevealFx
          translateY="12"
          delay={0.2}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Text
            variant="body-default-l"
            style={{
              color: "var(--text-secondary)",
              opacity: 0.8,
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "1.2rem",
              lineHeight: 1.6,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Selected work, ideas & real-world builds.
          </Text>
        </RevealFx>
      </Column>

      {/* ------------------------------------------------------------------ */}
      {/* PROJECTS GRID                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Column
        maxWidth="xl"
        fillWidth
        horizontal="center"
        style={{ position: "relative", zIndex: 1, paddingBottom: "160px" }}
      >
        <RevealFx translateY="16" delay={0.4} speed="fast">
          <Projects />
        </RevealFx>
      </Column>
    </Column>
  );
}
