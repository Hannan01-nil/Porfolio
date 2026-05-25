import { ProjectCard } from "@/components";
import projectsData from "@/data/projects.json";
import { Column } from "@once-ui-system/core";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = [...projectsData];

  if ((exclude?.length ?? 0) > 0) {
    allProjects = allProjects.filter((post) => !(exclude ?? []).includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        gap: "clamp(24px, 4vw, 40px)",
        width: "100%",
        marginBottom: "clamp(40px, 8vw, 80px)",
        padding: "0 clamp(12px, 3vw, 24px)",
      }}
    >
      {displayedProjects.map((post, index) => (
        <div
          key={post.slug}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.images}
            title={post.title}
            description={post.summary}
            content={post.body}
            link={post.link || ""}
            tag={post.tag}
            extraLinks={post.extraLinks}
            readMoreLink={undefined}
            reportLink={
              post.reportLink || undefined
            }
            reportLabel="Project Report"
          />
        </div>
      ))}
    </div>
  );
}
