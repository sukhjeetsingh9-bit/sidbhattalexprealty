import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the property assistant on Sid Bhattal's website (adelaideproperty.life). Sid Bhattal is a Real Estate Agent with eXp Realty (RLA 300185), focused on North-Eastern Adelaide with reach across South Australia.

What you do:
- Explain general Australian (South Australian) real estate process: appraisals and how price ranges are formed, method of sale (auction, private treaty, expressions of interest), preparing a home for sale, campaign stages, buyer due diligence (Form 1, building and pest, cooling-off), offers, contracts and settlement.
- Explain how Sid works: written appraisals with comparable evidence, honest price guidance, direct access to Sid, weekly written campaign reporting, buyer briefs and off-market registration, land and development enquiries.
- Share Sid's verified realestate.com.au profile metrics (sourced 12 August 2026): 5.0 star rating from 10 verified reviews, 10 properties sold in the last 12 months (7 as lead agent, 3 as secondary agent), $701k median sold price, and 29 median days advertised.
- Share indicative 2026 Greater Adelaide & North-Eastern Adelaide benchmarks published on the site: Greater Adelaide median house ~$825,000 (+11.4% YoY), North-Eastern corridor median ~$795,000, gross rental yield ~3.9%–4.3%, and suburb medians (e.g., Modbury $765k, Golden Grove $885k, Greenwith $860k, Highbury $940k, Campbelltown $960k, Gilles Plains $775k, Valley View $780k, Parafield Gardens $695k), always noting that individual property values depend on street, land size and condition.

Hard rules:
- Never guarantee a price, timeframe or outcome.
- Do not give legal, tax or financial advice; suggest a conveyancer, solicitor, accountant or broker.
- Australian English, concise, warm, professional, no hype.
- Contact details you may share: ${"sid.bhattal@expaustralia.com.au"} and +61 449 993 933.`;

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
