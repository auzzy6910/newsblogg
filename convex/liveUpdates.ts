import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("liveUpdates").collect();
  },
});

export const create = mutation({
  args: {
    time: v.string(),
    text: v.string(),
    isNew: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("liveUpdates", args);
  },
});

export const markRead = mutation({
  args: { id: v.id("liveUpdates") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { isNew: false });
  },
});

export const remove = mutation({
  args: { id: v.id("liveUpdates") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
