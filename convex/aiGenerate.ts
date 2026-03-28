import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateContent = action({
  args: {
    prompt: v.string(),
    type: v.optional(
      v.union(
        v.literal("headline"),
        v.literal("body"),
        v.literal("seo"),
        v.literal("full")
      )
    ),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return generateFallbackContent(args.prompt, args.type ?? "full");
    }

    try {
      const systemPrompt = getSystemPrompt(args.type ?? "full");

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: args.prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        return generateFallbackContent(args.prompt, args.type ?? "full");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";

      return parseAIResponse(content, args.type ?? "full");
    } catch {
      return generateFallbackContent(args.prompt, args.type ?? "full");
    }
  },
});

function getSystemPrompt(type: string): string {
  switch (type) {
    case "headline":
      return "You are a news headline writer. Generate a compelling, concise news headline based on the given topic. Return ONLY the headline text, nothing else.";
    case "body":
      return "You are a professional news article writer. Write a concise news article excerpt (2-3 paragraphs) based on the given topic. Return ONLY the article text.";
    case "seo":
      return "You are an SEO specialist. Generate 5-8 relevant SEO keywords for the given news topic. Return them as a comma-separated list, nothing else.";
    case "full":
    default:
      return `You are a professional news content generator. Based on the given topic, generate content in EXACTLY this JSON format (no markdown, no code blocks):
{"headline": "A compelling news headline", "body": "A 2-3 paragraph news article excerpt that is engaging and informative.", "seoKeywords": "keyword1, keyword2, keyword3, keyword4, keyword5"}`;
  }
}

function parseAIResponse(
  content: string,
  type: string
): { headline: string; body: string; seoKeywords: string } {
  if (type === "full") {
    try {
      const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return {
        headline: parsed.headline || "",
        body: parsed.body || "",
        seoKeywords: parsed.seoKeywords || "",
      };
    } catch {
      return {
        headline: content.split("\n")[0] || "",
        body: content,
        seoKeywords: "",
      };
    }
  }

  if (type === "headline") return { headline: content.trim(), body: "", seoKeywords: "" };
  if (type === "body") return { headline: "", body: content.trim(), seoKeywords: "" };
  if (type === "seo") return { headline: "", body: "", seoKeywords: content.trim() };

  return { headline: "", body: content.trim(), seoKeywords: "" };
}

function generateFallbackContent(
  prompt: string,
  type: string
): { headline: string; body: string; seoKeywords: string } {
  const topic = prompt.trim();

  const headline = `Breaking: ${topic.charAt(0).toUpperCase() + topic.slice(1)} — Latest Developments and Analysis`;

  const body = `In a significant development, ${topic.toLowerCase()} has captured widespread attention from experts and the public alike. Industry analysts and policymakers are closely monitoring the situation as new details continue to emerge.\n\nStakeholders across multiple sectors have weighed in on the implications, with many pointing to the far-reaching consequences that could reshape current approaches. Officials have called for careful consideration of all available evidence before drawing conclusions.\n\nAs the story continues to unfold, our team remains committed to providing comprehensive coverage and in-depth analysis of all related developments.`;

  const words = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const baseKeywords = words.slice(0, 3);
  const seoKeywords = [
    ...baseKeywords,
    "breaking news",
    "latest updates",
    "analysis",
    "developing story",
  ].join(", ");

  if (type === "headline") return { headline, body: "", seoKeywords: "" };
  if (type === "body") return { headline: "", body, seoKeywords: "" };
  if (type === "seo") return { headline: "", body: "", seoKeywords };

  return { headline, body, seoKeywords };
}
