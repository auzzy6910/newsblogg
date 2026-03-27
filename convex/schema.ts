import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    excerpt: v.string(),
    category: v.string(),
    image: v.string(),
    author: v.string(),
    time: v.string(),
    readTime: v.string(),
    isLive: v.optional(v.boolean()),
    isBreaking: v.optional(v.boolean()),
    isExclusive: v.optional(v.boolean()),
    comments: v.number(),
  }),
});
