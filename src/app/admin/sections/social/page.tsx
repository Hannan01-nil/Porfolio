"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

interface SocialItem {
  name: string; icon: string; link: string; essential?: boolean;
}

export default function SocialPage() {
  const [items, setItems] = useState<SocialItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/social").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/social", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const update = (idx: number, field: keyof SocialItem, value: string | boolean) => {
    const copy = [...items];
    (copy[idx] as unknown as Record<string, unknown>)[field] = value;
    setItems(copy);
  };

  return (
    <><AdminForm title="Social Links" description="Manage your social media links." section="social" onSave={save}>
      {items.map((item, idx) => (
        <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>#{idx + 1} {item.name}</span>
            <button onClick={() => setItems(items.filter((_, i) => i !== idx))} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Remove</button>
          </div>
          <div className="grid-2col">
            <FormField label="Name"><FormInput value={item.name} onChange={(e) => update(idx, "name", e.target.value)} /></FormField>
            <FormField label="Icon"><FormInput value={item.icon} onChange={(e) => update(idx, "icon", e.target.value)} /></FormField>
            <FormField label="Link"><FormInput value={item.link} onChange={(e) => update(idx, "link", e.target.value)} /></FormField>
            <FormField label="Essential?">
              <input type="checkbox" checked={!!item.essential} onChange={(e) => update(idx, "essential", e.target.checked)} style={{ width: "18px", height: "18px" }} />
            </FormField>
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, { name: "", icon: "", link: "", essential: false }])} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Social Link
      </button>
    </AdminForm>
      <style jsx>{`
        .grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 768px) {
          .grid-2col { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
