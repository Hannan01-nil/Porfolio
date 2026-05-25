"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

export default function TimelinePage() {
  const [items, setItems] = useState<{ year: string; text: string }[]>([]);

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then((d) => setItems(d.timeline || []));
  }, []);

  const save = async () => {
    const about = await fetch("/api/admin/about").then((r) => r.json());
    about.timeline = items;
    const res = await fetch("/api/admin/about", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const update = (idx: number, field: string, value: string) => {
    const copy = [...items];
    (copy[idx] as Record<string, string>)[field] = value;
    setItems(copy);
  };

  return (
    <><AdminForm title="Timeline" description="Manage your roadmap/timeline entries." section="timeline" onSave={save}>
      {items.map((item, idx) => (
        <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>#{idx + 1}</span>
            <button onClick={() => setItems(items.filter((_, i) => i !== idx))} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Remove</button>
          </div>
          <div className="grid-timeline">
            <FormField label="Year"><FormInput value={item.year} onChange={(e) => update(idx, "year", e.target.value)} /></FormField>
            <FormField label="Text"><FormInput value={item.text} onChange={(e) => update(idx, "text", e.target.value)} /></FormField>
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, { year: "", text: "" }])} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Entry
      </button>
    </AdminForm>
      <style jsx>{`
        .grid-timeline { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; }
        @media (max-width: 768px) {
          .grid-timeline { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
