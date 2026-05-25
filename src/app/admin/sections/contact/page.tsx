"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

export default function ContactPage() {
  const [data, setData] = useState({ path: "/contact", label: "Contact", title: "Contact", description: "" });

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/contact", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  return (
    <AdminForm title="Contact" description="Edit your contact page SEO and content." section="contact" onSave={save}>
      <FormField label="Page Title (SEO)"><FormInput value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></FormField>
      <FormField label="Meta Description"><FormInput value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></FormField>
    </AdminForm>
  );
}
