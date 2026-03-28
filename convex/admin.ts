import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllArticles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("articles").collect();
  },
});

export const getArticle = query({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("articles").collect();
    const total = articles.length;
    const published = articles.filter(
      (a) => a.status === "published" || a.status === undefined
    ).length;
    const drafts = articles.filter((a) => a.status === "draft").length;

    const categoryCounts: Record<string, number> = {};
    for (const article of articles) {
      categoryCounts[article.category] =
        (categoryCounts[article.category] ?? 0) + 1;
    }

    return { total, published, drafts, categoryCounts };
  },
});

export const createArticle = mutation({
  args: {
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
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
    body: v.optional(v.string()),
    seoKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("articles", {
      ...args,
      status: args.status ?? "draft",
    });
  },
});

export const updateArticle = mutation({
  args: {
    id: v.id("articles"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    category: v.optional(v.string()),
    image: v.optional(v.string()),
    author: v.optional(v.string()),
    time: v.optional(v.string()),
    readTime: v.optional(v.string()),
    isLive: v.optional(v.boolean()),
    isBreaking: v.optional(v.boolean()),
    isExclusive: v.optional(v.boolean()),
    comments: v.optional(v.number()),
    type: v.optional(
      v.union(
        v.literal("hero"),
        v.literal("featured"),
        v.literal("latest")
      )
    ),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
    body: v.optional(v.string()),
    seoKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    return await ctx.db.patch(id, fields);
  },
});

export const deleteArticle = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const toggleStatus = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
    if (!article) throw new Error("Article not found");
    const currentStatus = article.status ?? "published";
    const newStatus = currentStatus === "published" ? "draft" : "published";
    await ctx.db.patch(args.id, { status: newStatus });
    return newStatus;
  },
});
