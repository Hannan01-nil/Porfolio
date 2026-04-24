"use client";

import React, { useRef, useEffect, useState } from "react";
import { Column, Heading, Text, Row, RevealFx } from "@once-ui-system/core";
import { motion } from "framer-motion";

const categoryIcons: Record<string, string> = {
  "Programming": "https://api.iconify.design/mdi:code-braces.svg?color=%2322d3ee",
  "Frontend": "https://api.iconify.design/mdi:palette-outline.svg?color=%2322d3ee",
  "Backend": "https://api.iconify.design/mdi:cog-outline.svg?color=%2322d3ee",
  "Database": "https://api.iconify.design/mdi:database-outline.svg?color=%2322d3ee",
  "Machine Learning": "https://api.iconify.design/mdi:brain.svg?color=%2322d3ee",
  "Tools": "https://api.iconify.design/mdi:tools.svg?color=%2322d3ee",
  "Concepts": "https://api.iconify.design/mdi:book-open-variant.svg?color=%2322d3ee"
};

const skillLogoMap: Record<string, string> = {
  // Programming
  "Python": "https://cdn.simpleicons.org/python/3776AB",
  "Java": "https://skillicons.dev/icons?i=java",
  "C++": "https://cdn.simpleicons.org/cplusplus/00599C",
  "JavaScript": "https://cdn.simpleicons.org/javascript/F7DF1E",
  "C": "https://cdn.simpleicons.org/c/A8B9CC",
  "PHP": "https://cdn.simpleicons.org/php/777BB4",
  
  // Frontend
  "HTML": "https://cdn.simpleicons.org/html5/E34F26",
  "CSS": "https://skillicons.dev/icons?i=css",
  "React.js": "https://cdn.simpleicons.org/react/61DAFB",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/white",
  "Tailwind": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  
  // Backend
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
  "Express.js": "https://cdn.simpleicons.org/express/white",
  "Flask": "https://cdn.simpleicons.org/flask/white",
  
  // Database
  "MySQL": "https://cdn.simpleicons.org/mysql/4479A1",
  "MongoDB": "https://cdn.simpleicons.org/mongodb/47A248",
  "SQL": "https://cdn.simpleicons.org/sqlite/003B57",
  "DBMS": "https://api.iconify.design/mdi:database-search.svg?color=white",
  
  // Machine Learning
  "Scikit-learn": "https://cdn.simpleicons.org/scikitlearn/F7931E",
  "Pandas": "https://cdn.simpleicons.org/pandas/150458",
  "NumPy": "https://cdn.simpleicons.org/numpy/013243",
  "Matplotlib": "https://api.iconify.design/logos:matplotlib.svg",
  "XGBoost": "https://cdn.simpleicons.org/xgboost/white",
  
  // Tools
  "Git": "https://cdn.simpleicons.org/git/F05032",
  "GitHub": "https://cdn.simpleicons.org/github/white",
  "VS Code": "https://skillicons.dev/icons?i=vscode",
  "Postman": "https://cdn.simpleicons.org/postman/FF6C37",
  "Canva": "https://cdn.simpleicons.org/canva/00C4CC",
  "Figma": "https://cdn.simpleicons.org/figma/F24E1E",
  "Colab": "https://cdn.simpleicons.org/googlecolab/F9AB00",
  "Antigravity": "https://api.iconify.design/mdi:alpha-a-circle-outline.svg?color=%2322d3ee",
  
  // Concepts
  "OOP": "https://api.iconify.design/mdi:layers-outline.svg?color=white",
  "DSA": "https://api.iconify.design/mdi:sitemap-outline.svg?color=white",
  "REST APIs": "https://api.iconify.design/mdi:api.svg?color=white",
  "Problem Solving": "https://api.iconify.design/mdi:puzzle-outline.svg?color=white"
};

const SkillChip = ({ name }: { name: string }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = skillLogoMap[name] || `https://api.iconify.design/mdi:code-tags.svg?color=white`;
  const needsFilter = ["Express.js", "Flask", "Next.js"].includes(name);

  return (
    <div className="skill-chip">
      {!imgError ? (
        <img 
          src={logoUrl} 
          alt={name}
          loading="lazy"
          style={{ 
              filter: needsFilter ? 'brightness(1.25) contrast(1.2)' : 'none'
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
            {name.substring(0, 2).toUpperCase()}
        </span>
      )}
      <div className="skill-tooltip">{name}</div>
    </div>
  );
};

export const SkillsSection = ({ skills }: { skills: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.left = `${x - 400}px`;
      glowRef.current.style.top = `${y - 400}px`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <Column 
      fillWidth 
      horizontal="center" 
      paddingTop="160"
      paddingBottom="80"
      className="skills-glow-container"
      style={{ 
          position: 'relative', 
          zIndex: 10,
          overflow: 'visible',
          marginBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px'
      }}
    >
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div ref={glowRef} className="skills-mouse-glow" />

      {/* SECTION HEADER - MATCHING ROADMAP STYLE */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto 80px', 
        padding: '0 24px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
              <Heading 
                  variant="display-strong-xs" 
                  className="sectionAnimatedTitle"
                  style={{ 
                      fontSize: 'clamp(56px, 8vw, 110px)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      paddingBottom: '1rem',
                      margin: '0 auto',
                      display: 'block',
                  }}
              >
                  TECHNICAL SKILLS
              </Heading>
              <Text 
                variant="body-default-l" 
                style={{ 
                    color: 'var(--text-secondary)', 
                    opacity: 0.8, 
                    maxWidth: '700px', 
                    lineHeight: 1.6,
                    marginTop: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
              >
                  Technologies, tools & frameworks I use to build modern products.
              </Text>
          </motion.div>
      </div>

      {/* CENTERED FLEX WRAPPER - ENSURES LAST ROW IS CENTERED */}
      <div style={{ 
          position: 'relative', 
          zIndex: 1,
          width: '100%',
          maxWidth: '1400px', 
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center'
      }}>
          {skills.map((category, idx) => (
            <RevealFx key={idx} translateY="40" delay={idx * 0.08} style={{ width: '320px' }}>
              <div className="skill-category-card" style={{ width: '100%' }}>
                <Row horizontal="between" vertical="center" marginBottom="20">
                  <Row gap="12" vertical="center">
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(34, 211, 238, 0.1)',
                      borderRadius: '8px',
                      padding: '6px'
                    }}>
                      <img 
                        src={categoryIcons[category.title] || "https://api.iconify.design/mdi:rocket-launch-outline.svg?color=%2322d3ee"} 
                        alt="" 
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <Heading variant="heading-strong-s" style={{ color: 'white', letterSpacing: '0.03em', fontSize: '1rem', fontWeight: 700 }}>
                      {category.title}
                    </Heading>
                  </Row>
                </Row>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '12px',
                  justifyItems: 'center',
                  alignItems: 'center'
                }}>
                  {category.tags?.map((tag: any, tIdx: number) => (
                    <SkillChip key={tIdx} name={tag.name} />
                  ))}
                </div>
              </div>
            </RevealFx>
          ))}
      </div>
    </Column>
  );
};
