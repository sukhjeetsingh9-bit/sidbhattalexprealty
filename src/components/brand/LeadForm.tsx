import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BRAND, CONTACT } from "@/lib/brand";

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
  defaults,
}: {
  id?: string;
  title: string;
  intro?: string;
  subject: string;
  fields?: LeadField[];
  submitLabel?: string;
  tone?: "light" | "ink";
  defaults?: Record<string, string>;
}) {
  const all = [...BASE_FIELDS, ...fields];
  const [values, setValues] = useState<Record<string, string>>(defaults ?? {});
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const formattedPayload: Record<string, string> = {
      _subject: `${subject} — ${values["name"] || "Website Enquiry"} (adelaideproperty.life)`,
      _template: "table",
      _captcha: "false",
      _replyto: values["email"] ?? "",
      "Enquiry Type": subject,
    };

    for (const f of all) {
      const val = (values[f.name] ?? "").trim();
      if (val) {
        formattedPayload[f.label] = val;
      }
    }

    if (typeof window !== "undefined") {
      formattedPayload["Submitted From"] = window.location.href;
    }

    try {
      // Primary: direct browser POST to FormSubmit AJAX endpoint for sid.bhattal@expaustralia.com.au
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedPayload),
      });

      if (!res.ok) {
        // Fallback: server-side relay endpoint
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedPayload),
        });
      }

      const clientName = (values["name"] ?? "").trim() || "there";
      setSubmittedName(clientName);
      setValues(defaults ?? {});
      toast.success("Enquiry sent to Sid Bhattal", {
        description: "Thank you — Sid has received your details and will be in touch shortly.",
      });
    } catch {
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedPayload),
        });
        const clientName = (values["name"] ?? "").trim() || "there";
        setSubmittedName(clientName);
        setValues(defaults ?? {});
        toast.success("Enquiry sent to Sid Bhattal", {
          description: "Thank you — Sid has received your details and will be in touch shortly.",
        });
      } catch {
        toast.error("Could not send enquiry right now", {
          description: `Please call ${CONTACT.phoneDisplay} or email ${CONTACT.email} directly.`,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-current/25 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:opacity-40 focus:border-accent";

  if (submittedName) {
    return (
      <div
        id={id}
        className={`border border-current/20 p-8 md:p-10 ${
          tone === "ink" ? "bg-ink text-ink-foreground" : "bg-card text-foreground"
        }`}
      >
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle2 className="size-6 shrink-0" aria-hidden="true" />
          <span className="eyebrow">Enquiry received</span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold md:text-3xl">
          Thank you, {submittedName}.
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed opacity-75">
          Your {subject.toLowerCase()} has been sent directly to {BRAND.fullName} (
          {CONTACT.email}). Sid will review your details and get back to you personally.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-current/15 pt-6 text-sm">
          <a href={`tel:${CONTACT.phoneRaw}`} className="font-semibold hover:text-accent">
            Call {CONTACT.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => setSubmittedName(null)}
            className="eyebrow text-accent underline-offset-4 hover:underline"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

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
        disabled={submitting}
        className={`mt-10 inline-flex items-center justify-center gap-2.5 rounded-sm px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors disabled:opacity-60 ${
          tone === "ink"
            ? "bg-ink-foreground text-ink hover:bg-accent hover:text-accent-foreground"
            : "bg-foreground text-background hover:bg-accent"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending enquiry…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p className="mt-5 text-xs opacity-50">
        Sent straight to Sid Bhattal ({CONTACT.email}). No email app required &amp; no third-party
        marketing lists.
      </p>
    </form>
  );
}
