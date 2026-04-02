import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingArticles = await ctx.db.query("articles").first();
    if (existingArticles) {
      return { success: false, message: "Database already seeded" };
    }

    // Seed hero article
    await ctx.db.insert("articles", {
      title:
        "Global Leaders Convene for Historic Climate Summit as Extreme Weather Events Intensify Worldwide",
      excerpt:
        "World leaders from over 190 nations gather in an unprecedented summit to address the escalating climate crisis, with ambitious new commitments expected to reshape international environmental policy for the coming decade.",
      category: "WORLD",
      image: "/images/hero-news.jpg",
      author: "Alexandra Reynolds",
      time: "2 hours ago",
      readTime: "8 min read",
      isBreaking: true,
      comments: 1247,
      type: "hero",
    });

    // Seed featured articles
    const featuredArticles = [
      {
        title:
          "Senate Passes Sweeping Infrastructure Bill in Late-Night Vote",
        excerpt:
          "The landmark legislation allocates $1.2 trillion for roads, bridges, broadband, and clean energy projects across all 50 states.",
        category: "POLITICS",
        image: "/images/politics.jpg",
        author: "Michael Torres",
        time: "3 hours ago",
        readTime: "6 min read",
        isLive: true,
        comments: 834,
        type: "featured" as const,
      },
      {
        title:
          "Wall Street Rallies as Tech Earnings Exceed Analyst Expectations",
        excerpt:
          "Major indices climb to record highs following stellar quarterly reports from leading technology companies.",
        category: "BUSINESS",
        image: "/images/business.jpg",
        author: "Sarah Kim",
        time: "4 hours ago",
        readTime: "5 min read",
        comments: 562,
        type: "featured" as const,
      },
      {
        title:
          "Revolutionary AI Model Achieves Breakthrough in Medical Diagnosis",
        excerpt:
          "Researchers unveil an artificial intelligence system capable of detecting diseases with unprecedented accuracy, promising to transform healthcare delivery.",
        category: "TECHNOLOGY",
        image: "/images/technology.jpg",
        author: "Dr. James Chen",
        time: "5 hours ago",
        readTime: "7 min read",
        isExclusive: true,
        comments: 923,
        type: "featured" as const,
      },
    ];

    for (const article of featuredArticles) {
      await ctx.db.insert("articles", article);
    }

    // Seed latest articles
    const latestArticles = [
      {
        title:
          "Diplomatic Tensions Rise in Eastern Mediterranean Over Maritime Boundaries",
        excerpt:
          "Naval standoff escalates between regional powers as negotiations stall over contested waters rich in natural gas reserves.",
        category: "WORLD",
        image: "/images/world.jpg",
        author: "Nadia Petrova",
        time: "1 hour ago",
        readTime: "6 min read",
        comments: 445,
        type: "latest" as const,
      },
      {
        title:
          "Championship Finals: Underdogs Stun Favorites in Historic Upset Victory",
        excerpt:
          "In a thrilling seven-game series, the underdog franchise clinches their first title in franchise history.",
        category: "SPORTS",
        image: "/images/sports.jpg",
        author: "Marcus Johnson",
        time: "30 min ago",
        readTime: "4 min read",
        isLive: true,
        comments: 2103,
        type: "latest" as const,
      },
      {
        title:
          "Award Season Heats Up: Surprise Nominees Shake Up Oscar Predictions",
        excerpt:
          "Independent films dominate nominations as Hollywood's biggest night promises an unpredictable outcome.",
        category: "ENTERTAINMENT",
        image: "/images/entertainment.jpg",
        author: "Rachel Adams",
        time: "2 hours ago",
        readTime: "5 min read",
        comments: 678,
        type: "latest" as const,
      },
      {
        title:
          "Groundbreaking Study Links Gut Microbiome to Mental Health Outcomes",
        excerpt:
          "New research reveals surprising connections between digestive health and psychological wellbeing, opening doors for novel treatments.",
        category: "HEALTH",
        image: "/images/health.jpg",
        author: "Dr. Emily Watts",
        time: "3 hours ago",
        readTime: "9 min read",
        comments: 312,
        type: "latest" as const,
      },
      {
        title:
          "NASA's Deep Space Telescope Captures New Images of Distant Galaxy Formation",
        excerpt:
          "Stunning photographs from the edge of the observable universe reveal the earliest stages of galactic evolution.",
        category: "SCIENCE",
        image: "/images/science.jpg",
        author: "Prof. David Park",
        time: "4 hours ago",
        readTime: "7 min read",
        isExclusive: true,
        comments: 891,
        type: "latest" as const,
      },
    ];

    for (const article of latestArticles) {
      await ctx.db.insert("articles", article);
    }

    // Seed breaking news
    const breakingNewsItems = [
      "BREAKING: Markets surge as Federal Reserve signals rate cut in upcoming quarter",
      "ALERT: Major diplomatic summit convenes in Geneva amid rising global tensions",
      "UPDATE: New climate legislation passes Senate with bipartisan support",
      "BREAKING: Tech giants announce landmark AI safety agreement",
    ];

    for (let i = 0; i < breakingNewsItems.length; i++) {
      await ctx.db.insert("breakingNews", {
        text: breakingNewsItems[i],
        order: i,
      });
    }

    // Seed trending topics
    const trendingTopicsData = [
      { name: "Climate Summit 2026", count: "45.2K" },
      { name: "Infrastructure Bill", count: "32.8K" },
      { name: "AI Healthcare", count: "28.1K" },
      { name: "Championship Finals", count: "67.4K" },
      { name: "Oscar Nominations", count: "21.5K" },
      { name: "Federal Reserve", count: "19.3K" },
      { name: "Space Discovery", count: "15.7K" },
      { name: "Cybersecurity Act", count: "12.9K" },
    ];

    for (let i = 0; i < trendingTopicsData.length; i++) {
      await ctx.db.insert("trendingTopics", {
        ...trendingTopicsData[i],
        order: i,
      });
    }

    // Seed opinion articles
    const opinionArticlesData = [
      {
        title:
          "Why the Climate Summit Must Deliver More Than Promises This Time",
        author: "Dr. Patricia Moore",
        authorImage: "/images/opinion-author.jpg",
        time: "Today",
      },
      {
        title:
          "The Infrastructure Bill Is a Good Start, But We Need Bolder Vision",
        author: "Robert Steinberg",
        authorImage: "/images/opinion-author.jpg",
        time: "Today",
      },
      {
        title: "AI in Medicine: Promise and Peril of Automated Diagnosis",
        author: "Dr. Lisa Yamamoto",
        authorImage: "/images/opinion-author.jpg",
        time: "Yesterday",
      },
    ];

    for (const article of opinionArticlesData) {
      await ctx.db.insert("opinionArticles", article);
    }

    // Seed live updates
    const liveUpdatesData = [
      {
        time: "12:45 PM",
        text: "Senate committee begins hearing on tech regulation bill",
        isNew: true,
      },
      {
        time: "12:30 PM",
        text: "Markets update: Dow Jones up 1.2% at midday trading",
        isNew: true,
      },
      {
        time: "12:15 PM",
        text: "Weather alert: Severe storms expected across the Southeast",
        isNew: false,
      },
      {
        time: "12:00 PM",
        text: "Press briefing scheduled for 2:00 PM ET on border policy",
        isNew: false,
      },
      {
        time: "11:45 AM",
        text: "Trade negotiations resume between major economic powers",
        isNew: false,
      },
      {
        time: "11:30 AM",
        text: "New jobs report shows unemployment at historic low",
        isNew: false,
      },
    ];

    for (let i = 0; i < liveUpdatesData.length; i++) {
      await ctx.db.insert("liveUpdates", {
        ...liveUpdatesData[i],
        order: i,
      });
    }

    // Seed videos
    const videosData = [
      {
        title:
          "Inside the Climate Summit: Exclusive Behind-the-Scenes Coverage",
        duration: "12:34",
        views: "1.2M",
        thumbnailImage: "/images/world.jpg",
      },
      {
        title:
          "Tech CEOs Testify on AI Safety Before Congressional Committee",
        duration: "8:45",
        views: "890K",
        thumbnailImage: "/images/sports.jpg",
      },
      {
        title: "Championship Highlights: Top 10 Plays of the Finals",
        duration: "5:22",
        views: "3.4M",
        thumbnailImage: "/images/entertainment.jpg",
      },
      {
        title:
          "Economic Outlook: Expert Panel Discusses Market Trends",
        duration: "15:08",
        views: "456K",
        thumbnailImage: "/images/health.jpg",
      },
    ];

    for (let i = 0; i < videosData.length; i++) {
      await ctx.db.insert("videos", {
        ...videosData[i],
        order: i,
      });
    }

    return { success: true, message: "Database seeded successfully" };
  },
});
