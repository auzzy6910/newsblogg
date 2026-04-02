import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: false, message: "Already subscribed" };
    }

    await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      subscribedAt: Date.now(),
    });

    return { success: true, message: "Successfully subscribed" };
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("newsletterSubscribers").collect();
  },
});

export const unsubscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (subscriber) {
      await ctx.db.delete(subscriber._id);
      return { success: true, message: "Successfully unsubscribed" };
    }

    return { success: false, message: "Email not found" };
  },
});
