"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/check-auth")
      .then((res) => {
        if (res.ok) setAuthed(true);
        else setAuthed(false);
      })
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0a0a14", color: "#fff" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0a0a14", padding: "16px" }}>
        <form onSubmit={handleLogin} style={{ background: "#1a1a2e", padding: "clamp(24px, 5vw, 40px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", maxWidth: "400px", width: "100%" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.2rem, 4vw, 1.5rem)", marginBottom: "8px", fontWeight: 700 }}>Admin Access</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "24px", fontSize: "0.9rem" }}>Enter your password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1rem", marginBottom: "16px", outline: "none", boxSizing: "border-box" }}
          />
          {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "linear-gradient(135deg, #a855f7, #22d3ee)", color: "#fff", fontSize: "1rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a14", color: "#fff" }}>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 98,
          }}
        />
      )}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="admin-main" style={{ flex: 1, padding: "clamp(16px, 3vw, 32px)", overflowY: "auto", maxWidth: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div
      style={{
        display: "none",
        padding: "12px 16px",
        background: "#12121e",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        alignItems: "center",
        gap: "12px",
      }}
      className="admin-mobile-header"
    >
      <button
        onClick={onMenuClick}
        style={{
          background: "none", border: "none", color: "#fff", cursor: "pointer",
          fontSize: "1.5rem", padding: "4px", display: "flex",
        }}
        aria-label="Open menu"
      >
        ☰
      </button>
      <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Admin Panel</span>
      <style jsx>{`
        @media (max-width: 768px) {
          .admin-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

const sections = [
  { slug: "personal", label: "Personal Info", icon: "👤" },
  { slug: "home", label: "Home Page", icon: "🏠" },
  { slug: "about", label: "About Page", icon: "📖" },
  { slug: "social", label: "Social Links", icon: "🔗" },
  { slug: "skills", label: "Skills", icon: "⚡" },
  { slug: "projects", label: "Projects", icon: "📁" },
  { slug: "education", label: "Education", icon: "🎓" },
  { slug: "timeline", label: "Timeline", icon: "📅" },
  { slug: "creative", label: "Creative Side", icon: "🎨" },
  { slug: "gallery", label: "Gallery", icon: "🖼️" },
  { slug: "contact", label: "Contact", icon: "✉️" },
];

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <>
      <aside
        className="admin-sidebar"
        style={{
          width: "260px",
          background: "#12121e",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 className="sidebar-title" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0 }}>Admin Panel</h2>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>Manage your portfolio</p>
          </div>
          <button onClick={onClose} className="sidebar-close-btn" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "1.3rem", padding: "4px", display: "none" }} aria-label="Close menu">✕</button>
        </div>
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {sections.map((section) => {
            const isActive = pathname === `/admin/sections/${section.slug}` || (section.slug === "personal" && pathname === "/admin");
            return (
              <a
                key={section.slug}
                href={`/admin/sections/${section.slug}`}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  color: isActive ? "#22d3ee" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  background: isActive ? "rgba(34, 211, 238, 0.08)" : "transparent",
                  borderRight: isActive ? "2px solid #22d3ee" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </a>
            );
          })}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>
            ← Back to site
          </a>
        </div>
      </aside>
      <style jsx>{`
        @media (min-width: 1440px) {
          .admin-sidebar {
            width: 280px !important;
          }
          .sidebar-title {
            font-size: 1.2rem !important;
          }
        }
        @media (min-width: 1920px) {
          .admin-sidebar {
            width: 300px !important;
          }
          .admin-main {
            padding: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            left: ${open ? "0" : "-280px"} !important;
            height: 100vh;
            z-index: 99;
            transition: left 0.3s ease;
            width: 260px !important;
          }
          .sidebar-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
