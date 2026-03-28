"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const generateArticle = action({
  args: {
    topic: v.string(),
    outline: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "OpenAI API key is not configured. Please set OPENAI_API_KEY in your Convex environment variables.",
      };
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `You are a professional news editor. Generate a complete news article based on the following information.

Topic: ${args.topic}
${args.outline ? `Outline/Details: ${args.outline}` : ""}

Please respond with a JSON object containing exactly these fields:
{
  "headline": "A compelling, professional news headline (max 120 characters)",
  "excerpt": "A brief 1-2 sentence summary/excerpt for the article preview (max 200 characters)",
  "body": "The full article body in HTML format with proper paragraphs (<p> tags), subheadings (<h3> tags), and emphasis (<strong>, <em> tags). Write 4-6 paragraphs of professional news content.",
  "category": "One of: WORLD, POLITICS, BUSINESS, TECHNOLOGY, SPORTS, ENTERTAINMENT, HEALTH, SCIENCE",
  "seoTags": ["array", "of", "relevant", "SEO", "keywords", "5-8 tags"],
  "suggestedReadTime": "X min read"
}

Respond ONLY with the JSON object, no additional text.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional news article writer. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return { success: false, error: "No response from AI" };
      }

      // Parse the JSON response
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return {
        success: true,
        data: {
          headline: parsed.headline || "",
          excerpt: parsed.excerpt || "",
          body: parsed.body || "",
          category: parsed.category || "WORLD",
          seoTags: parsed.seoTags || [],
          suggestedReadTime: parsed.suggestedReadTime || "5 min read",
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        error: `AI generation failed: ${errorMessage}`,
      };
    }
  },
});
