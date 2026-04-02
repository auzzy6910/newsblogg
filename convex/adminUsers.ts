import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Simple hash function for password (using Web Crypto in Convex)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const login = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    const passwordHash = await hashPassword(args.password);
    if (user.passwordHash !== passwordHash) {
      return { success: false, error: "Invalid credentials" };
    }

    if (!user.isAdmin) {
      return { success: false, error: "Access denied" };
    }

    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  },
});

export const verifyAdmin = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || !user.isAdmin) {
      return { isAdmin: false };
    }

    return {
      isAdmin: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  },
});

export const createAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if admin already exists
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: false, error: "Admin user already exists" };
    }

    const passwordHash = await hashPassword(args.password);

    const id = await ctx.db.insert("adminUsers", {
      email: args.email,
      passwordHash,
      isAdmin: true,
      name: args.name,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});
