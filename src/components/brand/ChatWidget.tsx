import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BRAND, CONTACT } from "@/lib/brand";

const SUGGESTIONS = [
  "How does an appraisal work?",
  "Auction or private treaty?",
  "What should I fix before selling?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    void sendMessage({ text: value });
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close assistant" : "Ask a property question"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[70] inline-flex size-14 items-center justify-center rounded-full bg-ink text-ink-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>

      {open ? (
        <div className="fixed bottom-24 right-5 z-[70] flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden border border-border bg-card shadow-2xl">
          <div className="border-b border-border p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Property questions</p>
            <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.16em] opacity-50">
              {BRAND.fullName} · {BRAND.agency}
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed opacity-70">
                  Ask about selling, buying, appraisals, method of sale or the process in South
                  Australia. For anything specific to your property, Sid will answer personally.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="border border-border px-3 py-1.5 text-[0.6875rem] opacity-70 transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("")
                .trim();
              if (!text) return null;
              return (
                <div
                  key={m.id}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-ink text-ink-foreground" : "bg-muted"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {busy ? (
              <div className="flex items-center gap-2 text-xs opacity-55">
                <Loader2 className="size-3.5 animate-spin" /> Thinking…
              </div>
            ) : null}

            {error ? (
              <p className="text-xs text-destructive">
                Something went wrong. Please email {CONTACT.email} instead.
              </p>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="min-w-0 flex-1 border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center bg-ink text-ink-foreground disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
