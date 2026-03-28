/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as aiGenerate from "../aiGenerate.js";
import type * as articles from "../articles.js";
import type * as breakingNews from "../breakingNews.js";
import type * as liveUpdates from "../liveUpdates.js";
import type * as newsletter from "../newsletter.js";
import type * as opinionArticles from "../opinionArticles.js";
import type * as seed from "../seed.js";
import type * as trendingTopics from "../trendingTopics.js";
import type * as videos from "../videos.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  aiGenerate: typeof aiGenerate;
  articles: typeof articles;
  breakingNews: typeof breakingNews;
  liveUpdates: typeof liveUpdates;
  newsletter: typeof newsletter;
  opinionArticles: typeof opinionArticles;
  seed: typeof seed;
  trendingTopics: typeof trendingTopics;
  videos: typeof videos;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
