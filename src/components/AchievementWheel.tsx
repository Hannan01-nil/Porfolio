"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heading, Text } from "@once-ui-system/core";

const milestones = [
  { 
    year: "2024", 
    title: "Started BCA Journey", 
    desc: "Began learning software development fundamentals at VIT Vellore, laying the foundation for a career in tech.", 
    emoji: "🎓" 
  },
  { 
    year: "2025", 
    title: "Built Track My Train", 
    desc: "Developed a real-world DBMS project focused on efficient data handling and user experience for rail travelers.", 
    emoji: "🚆" 
  },
  { 
    year: "2025", 
    title: "Strengthened Coding Skills", 
    desc: "Mastered DSA, DBMS, and full-stack development through intensive practice and complex project building.", 
    emoji: "💻" 
  },
  { 
    year: "2025-2026", 
    title: "HCI Case Study – Where is My Train", 
    desc: "Conducted deep research on Human-Computer Interaction to solve real-world usability challenges in transport apps.", 
    emoji: "🎨" 
  },
  { 
    year: "2026", 
    title: "AI - Based Smart Attendance System IoT", 
    desc: "Created an IoT-powered system for automated, efficient attendance tracking in institutional environments.", 
    emoji: "🤖" 
  },
  { 
    year: "NOW", 
    title: "Exploring Modern Tech", 
    desc: "Deep diving into AI/ML, cloud architecture, and high-performance full-stack frameworks.", 
    emoji: "🚀",
    status: "now"
  },
  { 
    year: "FUTURE", 
    title: "Software / AI Engineer", 
    desc: "Aspiring to build world-scale AI solutions and join elite engineering teams to drive global innovation.", 
    emoji: "🌟",
    status: "future"
  },
];

export const AchievementWheel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="roadmap"
      style={{ 
        width: '100%',
        paddingTop: isMobile ? '5rem' : '9rem',
        paddingBottom: '8rem',
        overflow: 'visible',
        position: 'relative'
      }}
    >
      {/* SECTION HEADER */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto 80px', 
        padding: '0 24px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
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
                      fontSize: isMobile ? '3rem' : 'clamp(56px, 8vw, 110px)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      paddingBottom: '1rem',
                      margin: '0'
                  }}
              >
                  MY ROADMAP
              </Heading>
              <Text variant="body-default-l" style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }}>
                  A journey of learning, projects, growth, and future goals.
              </Text>
          </motion.div>
      </div>

      {/* PERFECT STRUCTURE - PARENT WRAPPER */}
      <div style={{ 
          position: 'relative', 
          maxWidth: '1280px', // max-w-7xl
          margin: '0 auto', 
          padding: isMobile ? '0 16px' : '0 24px',
          overflow: 'visible'
      }}>
          
          {/* ONE CONTINUOUS CENTER LINE */}
          <div style={{ 
              position: 'absolute', 
              left: isMobile ? '2rem' : '50%',
              top: 0, 
              height: '100%', 
              width: '2px', 
              transform: isMobile ? 'none' : 'translateX(-50%)',
              background: 'linear-gradient(to bottom, #22d3ee, #a855f7, #22d3ee)', // from-cyan-400 via-violet-400 to-cyan-400
              zIndex: 0
          }} />

          {/* ACHIEVEMENT ROWS */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              {milestones.map((ms, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                      <div 
                          key={idx} 
                          style={{ 
                              position: 'relative', 
                              display: 'grid', 
                              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', // grid-cols-2
                              alignItems: 'center', 
                              minHeight: '260px', // min-h-[260px]
                              overflow: 'visible'
                          }}
                      >
                          {/* CARD CONTENT */}
                          <div style={{ 
                              gridColumn: isMobile ? 1 : (isLeft ? 1 : 2),
                              justifySelf: isMobile ? 'start' : (isLeft ? 'end' : 'start'),
                              marginRight: isMobile ? 0 : (isLeft ? '5rem' : 0), // mr-20
                              marginLeft: isMobile ? '4.5rem' : (isLeft ? 0 : '5rem'), // ml-20
                              width: '100%',
                              maxWidth: isMobile ? 'calc(100% - 6rem)' : '448px'
                          }}>
                              <motion.div
                                  className={`journey-card ${ms.status === 'now' ? 'card-now' : ''} ${ms.status === 'future' ? 'card-future' : ''}`}
                                  initial={{ opacity: 0, x: isMobile ? 20 : (isLeft ? -40 : 40) }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: "-100px" }}
                                  transition={{ duration: 0.6 }}
                              >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                      <span style={{ fontSize: '1.4rem' }}>{ms.emoji}</span>
                                      <span className="journey-card-year">{ms.year}</span>
                                  </div>
                                  <h3 className="journey-card-title">{ms.title}</h3>
                                  <p className="journey-card-desc">{ms.desc}</p>
                              </motion.div>
                          </div>

                          {/* CENTER NODE */}
                          <div style={{ 
                              position: 'absolute', 
                              left: isMobile ? '2rem' : '50%', 
                              top: '50%', 
                              transform: isMobile ? 'translate(-50%, -50%)' : 'translate(-50%, -50%)', 
                              zIndex: 20 
                          }}>
                              <div style={{ 
                                  position: 'relative', 
                                  width: '20px', // w-5
                                  height: '20px', // h-5
                                  borderRadius: '9999px', // rounded-full
                                  backgroundColor: 'black', // bg-black
                                  border: '2px solid #22d3ee', // border-2 border-cyan-400
                                  boxShadow: '0 0 18px rgba(34, 211, 238, 0.95)' // shadow-[0_0_18px_rgba(34,211,238,0.95)]
                              }}>
                                 <div style={{ 
                                     position: 'absolute', 
                                     top: -10, left: -10, right: -10, bottom: -10, // inset-[-10px]
                                     borderRadius: '9999px', 
                                     border: '1px solid rgba(34, 211, 238, 0.2)' // border-cyan-400/20
                                 }} />
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </section>
  );
};
