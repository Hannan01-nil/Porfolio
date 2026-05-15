"use client";

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLE SYSTEM — Canvas-based, mouse-reactive, GPU-accelerated
   ═══════════════════════════════════════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  color: [number, number, number];
  pulseSpeed: number;
  pulsePhase: number;
  depth: number; // 0-1, for parallax layering
}

const COLORS: [number, number, number][] = [
  [139, 92, 246], // purple
  [99, 102, 241], // indigo
  [59, 130, 246], // blue
  [6, 182, 212], // cyan
  [34, 211, 238], // light cyan
  [147, 51, 234], // violet
  [168, 85, 247], // light violet
  [79, 70, 229], // deep indigo
];

function createParticle(w: number, h: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const depth = Math.random();
  const sizeMultiplier = 0.5 + depth * 1.5; // deeper particles are larger
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    baseX: 0,
    baseY: 0,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.3 - 0.1, // upward drift
    size: (Math.random() * 2.5 + 1) * sizeMultiplier,
    baseOpacity: Math.random() * 0.5 + 0.3,
    color,
    pulseSpeed: Math.random() * 0.015 + 0.008,
    pulsePhase: Math.random() * Math.PI * 2,
    depth,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   WAVE MESH — SVG flowing lines with continuous animation
   ═══════════════════════════════════════════════════════════════════════════ */

function buildWavePath(
  w: number,
  t: number,
  yBase: number,
  amp: number,
  freq: number,
  phase: number,
  speed: number,
): string {
  const segs = 100;
  let d = "";
  for (let i = 0; i <= segs; i++) {
    const ratio = i / segs;
    const x = ratio * w;
    const y =
      yBase +
      Math.sin(ratio * Math.PI * freq + t * speed + phase) * amp +
      Math.sin(ratio * Math.PI * freq * 1.7 + t * speed * 0.6 + phase * 2.3) * (amp * 0.4) +
      Math.cos(ratio * Math.PI * freq * 0.5 + t * speed * 1.3 + phase * 0.7) * (amp * 0.25);
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }
  return d;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export const MagicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  // Wave state
  const [waveTime, setWaveTime] = useState(0);
  const [dims, setDims] = useState({ w: 1920, h: 1080 });

  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const count = isMobile ? 80 : 180;
    particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (!mounted) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  // Scroll tracking
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // Canvas particle animation loop
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      setDims({ w, h });
      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };
    resize();
    initParticles(w, h);

    const mouseRadius = 200;
    const mouseForce = 0.04;

    const loop = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;

      for (const p of particlesRef.current) {
        // Scroll parallax — deeper particles move slower
        const parallaxY = scroll * p.depth * 0.15;

        // Mouse reactivity
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = ((mouseRadius - dist) / mouseRadius) * mouseForce;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Gentle upward drift restoration
        p.vy -= 0.003;

        // Wrap edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Calculate render position with parallax
        const renderY = p.y - parallaxY;

        // Pulsing brightness
        const pulse = Math.sin(t * p.pulseSpeed * 60 + p.pulsePhase) * 0.4 + 0.6;
        const alpha = p.baseOpacity * pulse;
        const [r, g, b] = p.color;

        // Draw soft glow halo
        const glowR = p.size * 6;
        const grad = ctx.createRadialGradient(p.x, renderY, 0, p.x, renderY, glowR);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${alpha * 0.15})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, renderY, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw bright core
        ctx.beginPath();
        ctx.arc(p.x, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha * 1.2, 1)})`;
        ctx.fill();

        // Draw white-hot center for larger particles
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, renderY, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
          ctx.fill();
        }
      }

      // Draw a few connection lines between nearby particles
      const particles = particlesRef.current;
      const connectionDist = w < 768 ? 100 : 150;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < connectionDist) {
            const lineAlpha = (1 - d / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y - scroll * a.depth * 0.15);
            ctx.lineTo(b.x, b.y - scroll * b.depth * 0.15);
            ctx.strokeStyle = `rgba(139,92,246,${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // Update wave time
      setWaveTime((prev) => prev + 0.008);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [mounted, initParticles]);

  if (!mounted) return null;

  const { w, h } = dims;
  const waveCenterY = h * 0.5;

  // Wave definitions
  const waves = [
    { id: "a", amp: 40, freq: 2, phase: 0, yOff: -80, speed: 1, sw: 2, grad: "wg1" },
    { id: "b", amp: 30, freq: 2.5, phase: 1.2, yOff: -40, speed: 0.8, sw: 1.5, grad: "wg2" },
    { id: "c", amp: 50, freq: 1.5, phase: 2.5, yOff: 0, speed: 1.2, sw: 2, grad: "wg1" },
    { id: "d", amp: 25, freq: 3, phase: 3.8, yOff: 40, speed: 0.6, sw: 1, grad: "wg3" },
    { id: "e", amp: 35, freq: 2, phase: 5, yOff: 80, speed: 0.9, sw: 1.5, grad: "wg2" },
    { id: "f", amp: 20, freq: 3.5, phase: 0.5, yOff: 120, speed: 1.1, sw: 1, grad: "wg3" },
    { id: "g", amp: 45, freq: 1.8, phase: 4, yOff: -120, speed: 0.7, sw: 1.5, grad: "wg1" },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: "hidden",
        backgroundColor: "#050510",
        pointerEvents: "none",
      }}
    >
      {/* ── LAYER 0: Aurora Glow Blobs ────────────────────────────────── */}

      {/* Large purple glow — top left */}
      <motion.div
        animate={{
          x: ["-5%", "8%", "-3%", "-5%"],
          y: ["-5%", "5%", "-8%", "-5%"],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "-15%",
          width: "60vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(147,51,234,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* Cyan glow — center right */}
      <motion.div
        animate={{
          x: ["5%", "-8%", "3%", "5%"],
          y: ["3%", "-5%", "8%", "3%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "55vw",
          height: "65vh",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.3) 0%, rgba(34,211,238,0.12) 40%, transparent 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* Deep blue glow — bottom */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.7, 1, 0.6, 0.7],
        }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        style={{
          position: "absolute",
          bottom: "-25%",
          left: "10%",
          width: "65vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse at center, rgba(30,58,138,0.35) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)",
          filter: "blur(100px)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* Pink accent — top right */}
      <motion.div
        animate={{
          x: ["-3%", "5%", "-3%"],
          y: ["2%", "-4%", "2%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        style={{
          position: "absolute",
          top: "0%",
          right: "0%",
          width: "35vw",
          height: "35vh",
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* Radial pulse center glow — breathing effect */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        style={{
          position: "absolute",
          top: "30%",
          left: "35%",
          width: "30vw",
          height: "30vh",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />

      {/* ── LAYER 1: SVG Wave Mesh ────────────────────────────────────── */}
      <svg
        role="img"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
      >
        <title>Wave decoration</title>
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {waves.map((wv) => (
          <path
            key={wv.id}
            d={buildWavePath(
              w,
              waveTime,
              waveCenterY + wv.yOff,
              wv.amp,
              wv.freq,
              wv.phase,
              wv.speed,
            )}
            fill="none"
            stroke={`url(#${wv.grad})`}
            strokeWidth={wv.sw}
            strokeLinecap="round"
            opacity={0.25}
          />
        ))}
      </svg>

      {/* ── LAYER 2: Canvas Particles + Connections ───────────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ── LAYER 3: Noise Grain Overlay ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E")',
          zIndex: 4,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* ── LAYER 4: Vignette ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5,5,16,0.7) 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
