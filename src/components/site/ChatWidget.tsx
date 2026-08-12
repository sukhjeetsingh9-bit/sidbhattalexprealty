import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const SUGGESTIONS = [
  "How does the commission cap work?",
  "Explain revenue share",
  "What's included in the $275?",
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
        aria-label={open ? "Close chat" : "Ask about the eXp model"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] inline-flex size-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-[0_10px_40px_oklch(0_0_0/50%)] transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open ? (
        <div className="card-surface fixed bottom-24 right-5 z-[60] flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <img src="/site/exp-realty-logo.png" alt="eXp Realty" className="h-6 w-auto" />
            <div>
              <p className="text-sm font-semibold">Ask about the model</p>
              <p className="text-[11px] text-foreground/55">AI assistant · replies in seconds</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-foreground/70">
                  Hi — ask me anything about the eXp Realty Australia model: commission, revenue share,
                  equity, tech stack, rent roll or luxury.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-[11px] text-foreground/70 transition-colors hover:border-gold/50 hover:text-gold"
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
              const reasoning = m.parts
                .map((p) => (p.type === "reasoning" ? p.text : ""))
                .join("")
                .trim();
              if (!text && !reasoning) return null;
              return (
                <div
                  key={m.id}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold text-primary-foreground"
                        : "bg-muted text-foreground/90"
                    }`}
                  >
                    {text || (
                      <span className="text-xs italic text-foreground/60">{reasoning}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {busy ? (
              <div className="flex items-center gap-2 text-xs text-foreground/55">
                <Loader2 className="size-3.5 animate-spin" /> Thinking…
              </div>
            ) : null}

            {error ? (
              <p className="text-xs text-destructive">
                Something went wrong. Please try again, or email Sid directly.
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
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold/60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-gold text-primary-foreground disabled:opacity-40"
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
