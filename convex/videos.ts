import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("videos").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    duration: v.string(),
    views: v.string(),
    thumbnailImage: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("videos", args);
  },
});

export const remove = mutation({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
