import { useState } from "react";
import { toast } from "sonner";

import { CONTACT } from "@/lib/brand";

export type LeadField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: readonly string[];
  required?: boolean;
  placeholder?: string;
};

const BASE_FIELDS: LeadField[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
];

export function LeadForm({
  id,
  title,
  intro,
  subject,
  fields = [],
  submitLabel = "Send enquiry",
  tone = "light",
}: {
  id?: string;
  title: string;
  intro?: string;
  subject: string;
  fields?: LeadField[];
  submitLabel?: string;
  tone?: "light" | "ink";
}) {
  const all = [...BASE_FIELDS, ...fields];
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = all
      .map((f) => `${f.label}: ${values[f.name] ?? ""}`)
      .concat([`Enquiry type: ${subject}`])
      .join("\n");

    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `${subject} — ${values["name"] ?? "Website enquiry"}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    toast.success("Opening your email app", {
      description: `Your ${subject.toLowerCase()} details are ready to send to Sid.`,
    });
  };

  const inputClass =
    "w-full border-b border-current/25 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:opacity-40 focus:border-accent";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={tone === "ink" ? "text-ink-foreground" : "text-foreground"}
    >
      <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
      {intro ? <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-65">{intro}</p> : null}

      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {all.map((f) => (
          <div
            key={f.name}
            className={f.type === "textarea" || f.type === "select" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={`${id ?? "lead"}-${f.name}`}
              className="eyebrow block opacity-55"
            >
              {f.label}
              {f.required ? " *" : ""}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={`${id ?? "lead"}-${f.name}`}
                required={f.required}
                rows={4}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={`${inputClass} resize-none`}
              />
            ) : f.type === "select" ? (
              <select
                id={`${id ?? "lead"}-${f.name}`}
                required={f.required}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={inputClass}
              >
                <option value="">Select an option</option>
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o} className="text-foreground">
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${id ?? "lead"}-${f.name}`}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className={`mt-10 inline-flex items-center justify-center rounded-sm px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
          tone === "ink"
            ? "bg-ink-foreground text-ink hover:bg-accent hover:text-accent-foreground"
            : "bg-foreground text-background hover:bg-accent"
        }`}
      >
        {submitLabel}
      </button>
      <p className="mt-5 text-xs opacity-50">
        Your details go directly to Sid. No third-party marketing lists.
      </p>
    </form>
  );
}
