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
    type: v.union(
      v.literal("hero"),
      v.literal("featured"),
      v.literal("latest")
    ),
  }).searchIndex("search_title", {
    searchField: "title",
    filterFields: ["category", "type"],
  }),

  breakingNews: defineTable({
    text: v.string(),
    order: v.number(),
  }),

  trendingTopics: defineTable({
    name: v.string(),
    count: v.string(),
    order: v.number(),
  }),

  opinionArticles: defineTable({
    title: v.string(),
    author: v.string(),
    authorImage: v.string(),
    time: v.string(),
  }),

  liveUpdates: defineTable({
    time: v.string(),
    text: v.string(),
    isNew: v.boolean(),
    order: v.number(),
  }),

  videos: defineTable({
    title: v.string(),
    duration: v.string(),
    views: v.string(),
    thumbnailImage: v.string(),
    order: v.number(),
  }),

  newsletterSubscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),

  adminUsers: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    isAdmin: v.boolean(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
