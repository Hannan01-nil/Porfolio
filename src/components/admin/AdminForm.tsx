"use client";

import { useState } from "react";

interface AdminFormProps {
  title: string;
  description?: string;
  section: string;
  children: React.ReactNode;
  onSave?: (data: unknown) => Promise<void>;
}

export function AdminForm({ title, description, section, children, onSave }: AdminFormProps) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async () => {
    if (onSave) {
      setSaving(true);
      setStatus("idle");
      try {
        await onSave(null);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } catch {
        setStatus("error");
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <>
      <div className="admin-form-container">
        <div style={{ marginBottom: "24px" }}>
          <h1 className="admin-form-title">{title}</h1>
          {description && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{description}</p>}
        </div>
        <form className="admin-form-grid" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {children}
          <div className="admin-form-actions" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 28px",
                borderRadius: "8px",
                background: saving ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #a855f7, #22d3ee)",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {status === "success" && <span style={{ color: "#22c55e", fontSize: "0.9rem" }}>Saved successfully!</span>}
            {status === "error" && <span style={{ color: "#ef4444", fontSize: "0.9rem" }}>Failed to save. Try again.</span>}
          </div>
        </form>
      </div>
      <style jsx>{`
        .admin-form-container {
          max-width: 100%;
        }
        .admin-form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .admin-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .admin-form-actions {
          padding-top: 8px;
        }
        @media (min-width: 1024px) {
          .admin-form-grid {
            grid-template-columns: 1fr 1fr;
          }
          .admin-form-title {
            font-size: 1.75rem;
          }
          .admin-form-actions {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </>
  );
}

interface FormFieldProps {
  label: string;
  help?: string;
  children: React.ReactNode;
}

export function FormField({ label, help, children }: FormFieldProps) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>{label}</label>
      {children}
      {help && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "4px" }}>{help}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input style={inputStyle} {...props} />;
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical", fontFamily: "monospace" }} {...props} />;
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "auto",
};

export function FormSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select style={selectStyle} {...props} />;
}

const btnStyle: React.CSSProperties = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: "0.85rem",
  cursor: "pointer",
};

const btnDangerStyle: React.CSSProperties = {
  ...btnStyle,
  border: "1px solid rgba(239,68,68,0.3)",
  background: "rgba(239,68,68,0.1)",
  color: "#ef4444",
};

export function FormButton({ children, danger, ...props }: { children: React.ReactNode; danger?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button style={danger ? btnDangerStyle : btnStyle} {...props}>{children}</button>;
}

export function ArrayEditor<T>({
  items,
  onChange,
  renderItem,
  defaultItem,
  label,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void, remove: () => void) => React.ReactNode;
  defaultItem: T;
  label: string;
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{label}</span>
        <button
          onClick={() => onChange([...items, { ...defaultItem }])}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid rgba(34,211,238,0.3)",
            background: "rgba(34,211,238,0.1)",
            color: "#22d3ee",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          + Add {label}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>#{idx + 1}</span>
              <button
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                style={{
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: "1px solid rgba(239,68,68,0.3)",
                  background: "transparent",
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
            {renderItem(
              item,
              idx,
              (updated) => {
                const copy = [...items];
                copy[idx] = updated;
                onChange(copy);
              },
              () => onChange(items.filter((_, i) => i !== idx)),
            )}
          </div>
        ))}
        {items.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", textAlign: "center", padding: "20px" }}>No items yet. Click "+ Add" to add one.</p>}
      </div>
    </div>
  );
}
