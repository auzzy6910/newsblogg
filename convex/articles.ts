import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getHero = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("articles")
      .filter((q) =>
        q.and(
          q.eq(q.field("type"), "hero"),
          q.or(
            q.eq(q.field("status"), "published"),
            q.eq(q.field("status"), undefined)
          )
        )
      )
      .collect();
    return articles[0] ?? null;
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("articles")
      .filter((q) =>
        q.and(
          q.eq(q.field("type"), "featured"),
          q.or(
            q.eq(q.field("status"), "published"),
            q.eq(q.field("status"), undefined)
          )
        )
      )
      .collect();
  },
});

export const getLatest = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("articles")
      .filter((q) =>
        q.and(
          q.eq(q.field("type"), "latest"),
          q.or(
            q.eq(q.field("status"), "published"),
            q.eq(q.field("status"), undefined)
          )
        )
      )
      .collect();
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("articles").collect();
    return articles.filter(
      (a) => a.status === "published" || a.status === undefined
    );
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("articles")
      .withSearchIndex("search_title", (q) => q.search("title", args.query))
      .collect();
  },
});

export const create = mutation({
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("articles", args);
  },
});

export const update = mutation({
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
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    return await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
