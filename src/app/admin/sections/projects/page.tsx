"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput, FormTextarea } from "@/components/admin/AdminForm";

interface Project {
  slug: string; title: string; publishedAt: string; summary: string;
  images: string[]; team: { name: string; role: string; avatar: string; linkedIn: string }[];
  link: string; tag: string; extraLinks: { label: string; link: string; icon?: string }[];
  reportLink: string; body: string;
}

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/admin/projects").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/projects", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const update = (idx: number, field: string, value: unknown) => {
    const copy = [...items];
    (copy[idx] as unknown as Record<string, unknown>)[field] = value;
    setItems(copy);
  };

  const makeSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <><AdminForm title="Projects" description="Manage your portfolio projects." section="projects" onSave={save}>
      {items.map((proj, idx) => (
        <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{proj.title || `Project #${idx + 1}`}</span>
            <button onClick={() => setItems(items.filter((_, i) => i !== idx))} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Delete</button>
          </div>
          <div className="grid-2col">
            <FormField label="Title">
              <FormInput value={proj.title} onChange={(e) => { const t = e.target.value; update(idx, "title", t); update(idx, "slug", makeSlug(t)); }} />
            </FormField>
            <FormField label="Slug (auto-generated)">
              <FormInput value={proj.slug} onChange={(e) => update(idx, "slug", e.target.value)} />
            </FormField>
            <FormField label="Published Date">
              <FormInput value={proj.publishedAt} onChange={(e) => update(idx, "publishedAt", e.target.value)} />
            </FormField>
            <FormField label="Tag (Group/Individual)">
              <FormInput value={proj.tag} onChange={(e) => update(idx, "tag", e.target.value)} />
            </FormField>
            <FormField label="GitHub/Project Link">
              <FormInput value={proj.link} onChange={(e) => update(idx, "link", e.target.value)} />
            </FormField>
            <FormField label="Report Link (PDF path)">
              <FormInput value={proj.reportLink} onChange={(e) => update(idx, "reportLink", e.target.value)} />
            </FormField>
          </div>
          <FormField label="Summary" help="Short description shown on project cards">
            <FormInput value={proj.summary} onChange={(e) => update(idx, "summary", e.target.value)} />
          </FormField>
          <FormField label="Images" help="Array of paths, one per line. e.g. /images/project/img1.png">
            <FormTextarea value={(proj.images || []).join("\n")} onChange={(e) => update(idx, "images", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
          </FormField>
          <FormField label="Body (Markdown)" help="Full project content in markdown">
            <FormTextarea value={proj.body} onChange={(e) => update(idx, "body", e.target.value)} style={{ minHeight: "200px" }} />
          </FormField>
        </div>
      ))}
      <button
        onClick={() => setItems([...items, { slug: "", title: "", publishedAt: new Date().toISOString().split("T")[0], summary: "", images: [], team: [{ name: "", role: "", avatar: "", linkedIn: "" }], link: "", tag: "Individual Project", extraLinks: [], reportLink: "", body: "" }])}
        style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}
      >
        + Add Project
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
