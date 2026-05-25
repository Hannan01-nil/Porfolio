"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

interface SkillCategory {
  title: string;
  description: string;
  tags: { name: string; icon?: string }[];
}

export default function SkillsPage() {
  const [items, setItems] = useState<SkillCategory[]>([]);

  useEffect(() => {
    fetch("/api/admin/skills").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/skills", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const updateCat = (idx: number, field: string, value: string) => {
    const copy = [...items];
    (copy[idx] as unknown as Record<string, unknown>)[field] = value;
    setItems(copy);
  };

  const addTag = (catIdx: number) => {
    const copy = [...items];
    copy[catIdx].tags.push({ name: "" });
    setItems(copy);
  };

  const updateTag = (catIdx: number, tagIdx: number, value: string) => {
    const copy = [...items];
    copy[catIdx].tags[tagIdx].name = value;
    setItems(copy);
  };

  const removeTag = (catIdx: number, tagIdx: number) => {
    const copy = [...items];
    copy[catIdx].tags = copy[catIdx].tags.filter((_, i) => i !== tagIdx);
    setItems(copy);
  };

  return (
    <><AdminForm title="Skills" description="Manage your technical skills categories and tags." section="skills" onSave={save}>
      {items.map((cat, ci) => (
        <div key={ci} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Category #{ci + 1}</span>
            <button onClick={() => setItems(items.filter((_, i) => i !== ci))} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Remove</button>
          </div>
          <div className="grid-2col" style={{ marginBottom: "12px" }}>
            <FormField label="Category Title"><FormInput value={cat.title} onChange={(e) => updateCat(ci, "title", e.target.value)} /></FormField>
            <FormField label="Description"><FormInput value={cat.description} onChange={(e) => updateCat(ci, "description", e.target.value)} /></FormField>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Tags</span>
              <button onClick={() => addTag(ci)} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.8rem", cursor: "pointer" }}>+ Add Tag</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cat.tags.map((tag, ti) => (
                <div key={ti} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "4px 8px" }}>
                  <input value={tag.name} onChange={(e) => updateTag(ci, ti, e.target.value)} style={{ width: "100px", padding: "4px 6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                  <button onClick={() => removeTag(ci, ti)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", padding: 0 }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => setItems([...items, { title: "", description: "", tags: [] }])} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Category
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
