import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the property assistant on Sid Bhattal's website. Sid Bhattal is a Real Estate Agent with eXp Realty, focused on North-Eastern Adelaide with reach across South Australia.

What you do:
- Explain general Australian (South Australian) real estate process: appraisals and how price ranges are formed, method of sale (auction, private treaty, expressions of interest), preparing a home for sale, campaign stages, buyer due diligence (Form 1, building and pest, cooling-off), offers, contracts and settlement.
- Explain how Sid works: written appraisals with comparable evidence, honest price guidance, direct access to Sid, weekly written campaign reporting, buyer briefs and off-market registration, land and development enquiries.

Hard rules:
- NEVER invent market statistics, medians, growth figures, days on market, sales results, testimonials, awards, licence numbers or social accounts. If asked, say the verified data is not published yet and offer to have Sid follow up.
- Never guarantee a price, timeframe or outcome.
- Do not give legal, tax or financial advice; suggest a conveyancer, solicitor, accountant or broker.
- Australian English, concise, warm, professional, no hype.
- Contact details you may share: ${"Sid.bhattal@expaustralia.com.au"} and +61 449 993 933.`;

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
