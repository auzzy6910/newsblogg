import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("opinionArticles").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    authorImage: v.string(),
    time: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("opinionArticles", args);
  },
});

export const remove = mutation({
  args: { id: v.id("opinionArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
