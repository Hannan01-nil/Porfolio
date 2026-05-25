"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput, FormTextarea } from "@/components/admin/AdminForm";

export default function AboutPage() {
  const [data, setData] = useState({
    path: "/about", label: "About", title: "About", description: "",
    intro: { display: true, title: "About Me", description: "" },
    work: { display: false, title: "Experience" },
    studies: { display: true, title: "Education", institutions: [] as { name: string; description: string }[] },
    timeline: [] as { year: string; text: string }[],
    creative: [] as string[],
  });

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/about", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  return (
    <AdminForm title="About Page" description="Edit your about page content." section="about" onSave={save}>
      <FormField label="Page Description (SEO)"><FormInput value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></FormField>
      <FormField label="Intro Title"><FormInput value={data.intro.title} onChange={(e) => setData({ ...data, intro: { ...data.intro, title: e.target.value } })} /></FormField>
      <FormField label="Intro Description" help="Markdown supported"><FormTextarea value={data.intro.description} onChange={(e) => setData({ ...data, intro: { ...data.intro, description: e.target.value } })} /></FormField>
    </AdminForm>
  );
}
