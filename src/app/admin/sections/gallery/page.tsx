"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, FormInput } from "@/components/admin/AdminForm";

interface GalleryImage {
  src: string; alt: string; orientation: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch("/api/admin/gallery").then((r) => r.json()).then((d) => setImages(d.images || []));
  }, []);

  const save = async () => {
    const data = await fetch("/api/admin/gallery").then((r) => r.json());
    data.images = images;
    const res = await fetch("/api/admin/gallery", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const update = (idx: number, field: keyof GalleryImage, value: string) => {
    const copy = [...images] as { src: string; alt: string; orientation: string }[];
    (copy[idx] as Record<string, string>)[field] = value;
    setImages(copy);
  };

  return (
    <><AdminForm title="Gallery" description="Manage gallery images." section="gallery" onSave={save}>
      {images.map((img, idx) => (
        <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>Image #{idx + 1}</span>
            <button onClick={() => setImages(images.filter((_, i) => i !== idx))} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "0.8rem", cursor: "pointer" }}>Remove</button>
          </div>
          <div className="grid-3col">
            <FormField label="Image Path"><FormInput value={img.src} onChange={(e) => update(idx, "src", e.target.value)} /></FormField>
            <FormField label="Alt Text"><FormInput value={img.alt} onChange={(e) => update(idx, "alt", e.target.value)} /></FormField>
            <FormField label="Orientation"><FormInput value={img.orientation} onChange={(e) => update(idx, "orientation", e.target.value)} /></FormField>
          </div>
        </div>
      ))}
      <button onClick={() => setImages([...images, { src: "", alt: "", orientation: "horizontal" }])} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", color: "#22d3ee", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}>
        + Add Image
      </button>
    </AdminForm>
      <style jsx>{`
        .grid-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 768px) {
          .grid-3col { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
