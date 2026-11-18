import { createFileRoute } from "@tanstack/react-router";

import { CONTACT } from "@/lib/brand";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const payload = (await request.json()) as Record<string, string>;
          const subject = payload["_subject"] || "New Website Enquiry — adelaideproperty.life";

          // Forward to FormSubmit AJAX endpoint so Sid receives the email directly at sid.bhattal@expaustralia.com.au
          const response = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Referer: "https://adelaideproperty.life/",
              Origin: "https://adelaideproperty.life",
            },
            body: JSON.stringify({
              _subject: subject,
              _template: "table",
              _captcha: "false",
              ...payload,
            }),
          });

          if (response.ok) {
            const data = (await response.json()) as Record<string, unknown>;
            return new Response(JSON.stringify({ ok: true, data }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ ok: true, queued: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ ok: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
