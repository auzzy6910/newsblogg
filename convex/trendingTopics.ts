import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("trendingTopics").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    count: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("trendingTopics", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("trendingTopics"),
    name: v.optional(v.string()),
    count: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    return await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("trendingTopics") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
