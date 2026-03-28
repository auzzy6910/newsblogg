"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateContent = action({
  args: {
    prompt: v.string(),
    type: v.optional(
      v.union(
        v.literal("full"),
        v.literal("headline"),
        v.literal("body"),
        v.literal("seo")
      )
    ),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    const generationType = args.type ?? "full";

    let systemPrompt = "";
    const userPrompt = args.prompt;

    if (generationType === "full") {
      systemPrompt = `You are a professional news editor for Frolick News, a major news outlet. Generate a complete news article based on the user's prompt. Return a JSON object with these fields:
- "title": A compelling headline (max 120 chars)
- "excerpt": A brief summary (max 250 chars)
- "body": The full article body text (3-5 paragraphs, plain text)
- "seoKeywords": An array of 5-8 relevant SEO keywords
- "category": One of: WORLD, POLITICS, BUSINESS, TECHNOLOGY, SPORTS, ENTERTAINMENT, HEALTH, SCIENCE
- "readTime": Estimated read time like "5 min read"
Return ONLY valid JSON, no markdown formatting.`;
    } else if (generationType === "headline") {
      systemPrompt = `You are a professional news editor. Generate 3 compelling headline options for the given topic. Return a JSON object with a "headlines" array of 3 strings. Return ONLY valid JSON, no markdown formatting.`;
    } else if (generationType === "body") {
      systemPrompt = `You are a professional news writer. Write a full news article body (3-5 paragraphs, plain text) for the given headline/topic. Return a JSON object with a "body" field containing the article text. Return ONLY valid JSON, no markdown formatting.`;
    } else if (generationType === "seo") {
      systemPrompt = `You are an SEO specialist. Generate SEO keywords for the given news article topic. Return a JSON object with a "seoKeywords" array of 5-8 relevant keywords. Return ONLY valid JSON, no markdown formatting.`;
    }

    if (!apiKey) {
      // Fallback: generate mock content when no API key is configured
      return generateMockContent(args.prompt, generationType);
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API error:", errorText);
        return generateMockContent(args.prompt, generationType);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return generateMockContent(args.prompt, generationType);
      }

      // Parse the JSON response, stripping any markdown code blocks
      const cleanedContent = content
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();
      const parsed = JSON.parse(cleanedContent);
      return { success: true, data: parsed };
    } catch (error) {
      console.error("AI generation error:", error);
      return generateMockContent(args.prompt, generationType);
    }
  },
});

function generateMockContent(
  prompt: string,
  type: string
): { success: boolean; data: Record<string, unknown>; mock: boolean } {
  const title = `Breaking: ${prompt.slice(0, 80)}${prompt.length > 80 ? "..." : ""}`;

  if (type === "headline") {
    return {
      success: true,
      mock: true,
      data: {
        headlines: [
          title,
          `Analysis: The Impact of ${prompt.slice(0, 60)}`,
          `What You Need to Know About ${prompt.slice(0, 50)}`,
        ],
      },
    };
  }

  if (type === "body") {
    return {
      success: true,
      mock: true,
      data: {
        body: `In a significant development, ${prompt.toLowerCase()}.\n\nExperts have weighed in on the matter, noting its potential implications for the broader landscape. "This represents a turning point," said one analyst familiar with the situation.\n\nThe development comes amid growing attention to related issues, with stakeholders across multiple sectors closely monitoring the situation. Further updates are expected in the coming days.\n\nStay tuned to Frolick News for continuing coverage of this developing story.`,
      },
    };
  }

  if (type === "seo") {
    const words = prompt.split(" ").filter((w) => w.length > 3);
    return {
      success: true,
      mock: true,
      data: {
        seoKeywords: [
          "breaking news",
          "latest updates",
          ...words.slice(0, 5).map((w) => w.toLowerCase()),
          "analysis",
        ],
      },
    };
  }

  // Full content
  return {
    success: true,
    mock: true,
    data: {
      title,
      excerpt: `A comprehensive look at ${prompt.slice(0, 150)}. Stay informed with the latest developments and expert analysis.`,
      body: `In a significant development, ${prompt.toLowerCase()}.\n\nExperts have weighed in on the matter, noting its potential implications for the broader landscape. "This represents a turning point," said one analyst familiar with the situation.\n\nThe development comes amid growing attention to related issues, with stakeholders across multiple sectors closely monitoring the situation. Further updates are expected in the coming days.\n\nStay tuned to Frolick News for continuing coverage of this developing story.`,
      seoKeywords: [
        "breaking news",
        "latest updates",
        ...prompt
          .split(" ")
          .filter((w) => w.length > 3)
          .slice(0, 5)
          .map((w) => w.toLowerCase()),
      ],
      category: "WORLD",
      readTime: "4 min read",
    },
  };
}
