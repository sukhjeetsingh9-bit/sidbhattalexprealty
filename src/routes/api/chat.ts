import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the eXp Realty Australia assistant on Sid Bhattal's "The Model eXplained" website.
You help real estate agents in Australia understand the eXp Realty model.

Key facts you can rely on:
- No franchise, royalty, or desk fees. 75/25 commission split until $100,000 GCI in the anniversary year (a $25,000 cap), then the agent keeps up to 100% for the rest of that year.
- Monthly technology investment of $275 covers the full tech stack (lead generation, transactions, trust accounting, training, collaboration, Rex, Canva, Slack, Okta and more).
- Revenue share for sponsoring agents; eXp paid over $220M in revenue share to agents in 2024.
- Equity: $300 in EXPI stock for first settled transaction each anniversary year, $600 at cap, $600 per sponsored agent who settles their first transaction (3-year vest). Agent Equity Program invests 5% of commission into stock at a 5% discount, no vesting.
- ICON Awards: 20 settled transactions post-cap or $750,000 settled GCI; $15,000 in shares plus $6,000 for cultural requirements.
- eXp Luxury is now available in Australia. Primary agents from $3,900 AUD, team members from $1,552 AUD.
- Rent roll ownership pathways: new market entry, hands-off growth, pre-license building, and acquiring an agency with an existing rent roll.
- 83,000+ agents, 24+ countries, 6 continents.
- Contact Sid Bhattal: Sid.bhattal@expaustralia.com.au or 0449 993 933.

Be concise, warm and professional. Use Australian English. Never invent numbers that are not above —
if you are unsure, encourage the agent to book a confidential consultation with Sid.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const initialRunId = getLovableAiGatewayRunId(request);
        const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: {
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          fetch: runIdFetch.fetch,
        });

        const result = streamText({
          model: lovable.responses("openai/gpt-5.6-sol"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(body.messages as UIMessage[]),
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        const response = result.toUIMessageStreamResponse({
          sendReasoning: true,
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, runIdFetch);
      },
    },
  },
});
