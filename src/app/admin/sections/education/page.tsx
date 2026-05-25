"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput, FormTextarea } from "@/components/admin/AdminForm";

export default function EducationPage() {
  const [data, setData] = useState({
    studies: { display: true, title: "Education", institutions: [] as { name: string; description: string }[] },
  });

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then((d) => setData({ studies: d.studies }));
  }, []);

  const save = async () => {
    const about = await fetch("/api/admin/about").then((r) => r.json());
    about.studies = data.studies;
    const res = await fetch("/api/admin/about", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const updateInst = (idx: number, field: string, value: string) => {
    const copy = [...data.studies.institutions];
    (copy[idx] as Record<string, string>)[field] = value;
    setData({ ...data, studies: { ...data.studies, institutions: copy } });
  };

  return (
    <AdminForm title="Education" description="Manage your education entries." section="education" onSave={save}>
      {data.studies.institutions.map((inst, idx) => (
        <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>#{idx + 1}</span>
            <button onClick={() => setData({ ...data, studies: { ...data.studies, institutions: data.studies.institutions.filter((_, i) => i !== idx) } })} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Remove</button>
          </div>
          <FormField label="Institution Name"><FormInput value={inst.name} onChange={(e) => updateInst(idx, "name", e.target.value)} /></FormField>
          <FormField label="Description" help="Markdown supported"><FormTextarea value={inst.description} onChange={(e) => updateInst(idx, "description", e.target.value)} /></FormField>
        </div>
      ))}
      <button onClick={() => setData({ ...data, studies: { ...data.studies, institutions: [...data.studies.institutions, { name: "", description: "" }] } })} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Institution
      </button>
    </AdminForm>
  );
}
