import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("breakingNews").collect();
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("breakingNews", args);
  },
});

export const remove = mutation({
  args: { id: v.id("breakingNews") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
