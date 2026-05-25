"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

export default function PersonalPage() {
  const [data, setData] = useState({
    firstName: "", lastName: "", name: "", role: "",
    avatar: "", email: "", location: "", locationLabel: "", phone: "",
    languages: [] as string[],
  });
  const [langStr, setLangStr] = useState("");

  useEffect(() => {
    fetch("/api/admin/person").then((r) => r.json()).then((d) => {
      setData(d);
      setLangStr((d.languages || []).join(", "));
    });
  }, []);

  const save = async () => {
    const payload = { ...data, languages: langStr.split(",").map((s) => s.trim()).filter(Boolean) };
    const res = await fetch("/api/admin/person", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  return (
    <AdminForm title="Personal Info" section="person" onSave={save}>
      <FormField label="First Name"><FormInput value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} /></FormField>
      <FormField label="Last Name"><FormInput value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} /></FormField>
      <FormField label="Display Name"><FormInput value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></FormField>
      <FormField label="Role / Title"><FormInput value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} /></FormField>
      <FormField label="Avatar Path" help="Path to image in /public/images/"><FormInput value={data.avatar} onChange={(e) => setData({ ...data, avatar: e.target.value })} /></FormField>
      <FormField label="Email"><FormInput value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></FormField>
      <FormField label="Timezone" help="IANA timezone, e.g. Asia/Kolkata"><FormInput value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} /></FormField>
      <FormField label="Location Label" help="Display text like 'Vaniyambadi, Tamil Nadu, India'"><FormInput value={data.locationLabel} onChange={(e) => setData({ ...data, locationLabel: e.target.value })} /></FormField>
      <FormField label="Phone"><FormInput value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></FormField>
      <FormField label="Languages" help="Comma-separated, e.g. English, Tamil, Hindi"><FormInput value={langStr} onChange={(e) => setLangStr(e.target.value)} /></FormField>
    </AdminForm>
  );
}
