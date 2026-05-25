"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

export default function CreativePage() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then((d) => setItems(d.creative || []));
  }, []);

  const save = async () => {
    const about = await fetch("/api/admin/about").then((r) => r.json());
    about.creative = items;
    const res = await fetch("/api/admin/about", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  return (
    <><AdminForm title="Creative Side" description="Manage your creative interests list." section="creative" onSave={save}>
      {items.map((item, idx) => (
        <div key={idx} className="creative-row">
          <FormInput value={item} onChange={(e) => { const copy = [...items]; copy[idx] = e.target.value; setItems(copy); }} style={{ flex: 1 }} />
          <button onClick={() => setItems(items.filter((_, i) => i !== idx))} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>✕</button>
        </div>
      ))}
      <button onClick={() => setItems([...items, ""])} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Interest
      </button>
    </AdminForm>
      <style jsx>{`
        .creative-row { display: flex; gap: 8px; align-items: center; }
        @media (max-width: 768px) {
          .creative-row { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
