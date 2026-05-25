"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput, FormTextarea } from "@/components/admin/AdminForm";

interface HomeData {
  path: string; image: string; label: string; title: string; description: string;
  headline: string;
  featured: { display: boolean; title: string; href: string };
  subline: string;
  rotatingTitles: string[];
  badges: string[];
}

export default function HomePage() {
  const [data, setData] = useState<HomeData>({
    path: "/", image: "", label: "Home", title: "", description: "",
    headline: "", featured: { display: true, title: "", href: "" },
    subline: "", rotatingTitles: [], badges: [],
  });
  const [titlesStr, setTitlesStr] = useState("");
  const [badgesStr, setBadgesStr] = useState("");

  useEffect(() => {
    fetch("/api/admin/home").then((r) => r.json()).then((d) => {
      setData(d);
      setTitlesStr((d.rotatingTitles || []).join("\n"));
      setBadgesStr((d.badges || []).join("\n"));
    });
  }, []);

  const save = async () => {
    const payload = {
      ...data,
      rotatingTitles: titlesStr.split("\n").map((s) => s.trim()).filter(Boolean),
      badges: badgesStr.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const res = await fetch("/api/admin/home", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  return (
    <AdminForm title="Home Page" description="Edit your home page content." section="home" onSave={save}>
      <FormField label="Page Title (SEO)"><FormInput value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></FormField>
      <FormField label="Meta Description"><FormInput value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></FormField>
      <FormField label="Headline" help="Your main name/title"><FormInput value={data.headline} onChange={(e) => setData({ ...data, headline: e.target.value })} /></FormField>
      <FormField label="Subline" help="Brief description below the headline"><FormTextarea value={data.subline} onChange={(e) => setData({ ...data, subline: e.target.value })} /></FormField>
      <FormField label="Featured Badge Title" help="e.g. 'Open to Opportunities'"><FormInput value={data.featured.title} onChange={(e) => setData({ ...data, featured: { ...data.featured, title: e.target.value } })} /></FormField>
      <FormField label="Featured Badge Link"><FormInput value={data.featured.href} onChange={(e) => setData({ ...data, featured: { ...data.featured, href: e.target.value } })} /></FormField>
      <FormField label="Rotating Titles" help="One per line. These cycle in the typing animation."><FormTextarea value={titlesStr} onChange={(e) => setTitlesStr(e.target.value)} /></FormField>
      <FormField label="Badges" help="One per line. Shown on the home page."><FormTextarea value={badgesStr} onChange={(e) => setBadgesStr(e.target.value)} /></FormField>
    </AdminForm>
  );
}
