import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '40px',
        width: '100%',
        marginBottom: '80px',
        padding: '0 24px',
        justifyItems: 'center'
      }}
    >
      {displayedProjects.map((post, index) => {
        const isTrackMyTrain = post.metadata.title === "Track My Train";
        const card = (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            link={post.metadata.link || ""}
            tag={post.metadata.tag}
            extraLinks={post.metadata.extraLinks}
            readMoreLink={post.metadata.readMoreLink}
            reportLink={
              post.metadata.title === "AI-Based Smart Attendance System - IoT" 
                ? "/images/Attendance_System_IoT/AI_Smart_Attendance_System_Report.pdf"
                : post.metadata.title === "Student Stress Prediction System - Stressiq"
                ? "/images/Stress_Prediction/stressiq-report.pdf"
                : post.metadata.title === "HCI Case Study Project - Where Is My Train"
                ? "/images/HCI/HCI_CaseStudy-1.pdf"
                : undefined
            }
            reportLabel={
              post.metadata.title === "HCI Case Study Project - Where Is My Train"
                ? "Case Study Report"
                : "Project Report"
            }
          />
        );

        if (isTrackMyTrain) {
          return (
            <div
              key={post.slug}
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <div style={{ width: '100%', maxWidth: '560px', display: 'flex', justifyContent: 'center' }}>
                {card}
              </div>
            </div>
          );
        }

        return (
          <div key={post.slug} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {card}
          </div>
        );
      })}
    </div>
  );
}
