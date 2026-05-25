"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["person", "social", "home", "about", "skills", "projects", "gallery"];
    Promise.all(
      sections.map(async (s) => {
        try {
          const res = await fetch(`/api/admin/${s}`);
          if (!res.ok) return { section: s, count: 0 };
          const data = await res.json();
          if (Array.isArray(data)) return { section: s, count: data.length };
          if (typeof data === "object" && data !== null) return { section: s, count: Object.keys(data).length };
          return { section: s, count: 1 };
        } catch {
          return { section: s, count: 0 };
        }
      }),
    ).then((results) => {
      const map: Record<string, number> = {};
      results.forEach((r) => { map[r.section] = r.count; });
      setStats(map);
    });
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        const counts = Object.values(data.results as Record<string, string>);
        setSeedResult(`Seeded: ${counts.filter((v) => v === "seeded").length}/${counts.length} sections`);
      } else {
        setSeedResult("Seed failed");
      }
    } catch {
      setSeedResult("Seed request failed");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "8px" }}>Dashboard</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
            Welcome to your portfolio admin panel. Use the sidebar to manage each section.
          </p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            fontSize: "0.85rem",
            cursor: seeding ? "not-allowed" : "pointer",
            opacity: seeding ? 0.5 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {seeding ? "Seeding..." : "Seed KV Storage"}
        </button>
      </div>
      {seedResult && (
        <p style={{ color: "#22c55e", fontSize: "0.9rem", marginBottom: "16px" }}>{seedResult}</p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {Object.entries(stats).map(([key, count]) => (
          <div key={key} style={{ background: "#1a1a2e", borderRadius: "12px", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>{key}</p>
            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#22d3ee" }}>{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
