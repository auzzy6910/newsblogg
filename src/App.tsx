import { useState } from 'react'
import './App.css'
import {
  Search,
  Menu,
  X,
  ChevronRight,
  Play,
  Clock,
  TrendingUp,
  Share2,
  MessageSquare,
  Bookmark,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Flame,
  Zap,
  Globe,
  DollarSign,
  Tv,
  Heart,
  FlaskConical,
  Trophy,
  Eye,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const breakingNews = [
  "BREAKING: Markets surge as Federal Reserve signals rate cut in upcoming quarter",
  "ALERT: Major diplomatic summit convenes in Geneva amid rising global tensions",
  "UPDATE: New climate legislation passes Senate with bipartisan support",
  "BREAKING: Tech giants announce landmark AI safety agreement",
]

const navCategories = [
  "Home", "U.S.", "World", "Politics", "Business", "Tech", "Science",
  "Health", "Sports", "Entertainment", "Opinion", "Video"
]

interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  time: string
  readTime: string
  isLive?: boolean
  isBreaking?: boolean
  isExclusive?: boolean
  comments: number
}

const heroArticle: Article = {
  id: 1,
  title: "Global Leaders Convene for Historic Climate Summit as Extreme Weather Events Intensify Worldwide",
  excerpt: "World leaders from over 190 nations gather in an unprecedented summit to address the escalating climate crisis, with ambitious new commitments expected to reshape international environmental policy for the coming decade.",
  category: "WORLD",
  image: "/images/hero-news.jpg",
  author: "Alexandra Reynolds",
  time: "2 hours ago",
  readTime: "8 min read",
  isBreaking: true,
  comments: 1247,
}

const featuredArticles: Article[] = [
  {
    id: 2,
    title: "Senate Passes Sweeping Infrastructure Bill in Late-Night Vote",
    excerpt: "The landmark legislation allocates $1.2 trillion for roads, bridges, broadband, and clean energy projects across all 50 states.",
    category: "POLITICS",
    image: "/images/politics.jpg",
    author: "Michael Torres",
    time: "3 hours ago",
    readTime: "6 min read",
    isLive: true,
    comments: 834,
  },
  {
    id: 3,
    title: "Wall Street Rallies as Tech Earnings Exceed Analyst Expectations",
    excerpt: "Major indices climb to record highs following stellar quarterly reports from leading technology companies.",
    category: "BUSINESS",
    image: "/images/business.jpg",
    author: "Sarah Kim",
    time: "4 hours ago",
    readTime: "5 min read",
    comments: 562,
  },
  {
    id: 4,
    title: "Revolutionary AI Model Achieves Breakthrough in Medical Diagnosis",
    excerpt: "Researchers unveil an artificial intelligence system capable of detecting diseases with unprecedented accuracy, promising to transform healthcare delivery.",
    category: "TECHNOLOGY",
    image: "/images/technology.jpg",
    author: "Dr. James Chen",
    time: "5 hours ago",
    readTime: "7 min read",
    isExclusive: true,
    comments: 923,
  },
]

const latestArticles: Article[] = [
  {
    id: 5,
    title: "Diplomatic Tensions Rise in Eastern Mediterranean Over Maritime Boundaries",
    excerpt: "Naval standoff escalates between regional powers as negotiations stall over contested waters rich in natural gas reserves.",
    category: "WORLD",
    image: "/images/world.jpg",
    author: "Nadia Petrova",
    time: "1 hour ago",
    readTime: "6 min read",
    comments: 445,
  },
  {
    id: 6,
    title: "Championship Finals: Underdogs Stun Favorites in Historic Upset Victory",
    excerpt: "In a thrilling seven-game series, the underdog franchise clinches their first title in franchise history.",
    category: "SPORTS",
    image: "/images/sports.jpg",
    author: "Marcus Johnson",
    time: "30 min ago",
    readTime: "4 min read",
    isLive: true,
    comments: 2103,
  },
  {
    id: 7,
    title: "Award Season Heats Up: Surprise Nominees Shake Up Oscar Predictions",
    excerpt: "Independent films dominate nominations as Hollywood's biggest night promises an unpredictable outcome.",
    category: "ENTERTAINMENT",
    image: "/images/entertainment.jpg",
    author: "Rachel Adams",
    time: "2 hours ago",
    readTime: "5 min read",
    comments: 678,
  },
  {
    id: 8,
    title: "Groundbreaking Study Links Gut Microbiome to Mental Health Outcomes",
    excerpt: "New research reveals surprising connections between digestive health and psychological wellbeing, opening doors for novel treatments.",
    category: "HEALTH",
    image: "/images/health.jpg",
    author: "Dr. Emily Watts",
    time: "3 hours ago",
    readTime: "9 min read",
    comments: 312,
  },
  {
    id: 9,
    title: "NASA's Deep Space Telescope Captures New Images of Distant Galaxy Formation",
    excerpt: "Stunning photographs from the edge of the observable universe reveal the earliest stages of galactic evolution.",
    category: "SCIENCE",
    image: "/images/science.jpg",
    author: "Prof. David Park",
    time: "4 hours ago",
    readTime: "7 min read",
    isExclusive: true,
    comments: 891,
  },
]

const trendingTopics = [
  { name: "Climate Summit 2026", count: "45.2K" },
  { name: "Infrastructure Bill", count: "32.8K" },
  { name: "AI Healthcare", count: "28.1K" },
  { name: "Championship Finals", count: "67.4K" },
  { name: "Oscar Nominations", count: "21.5K" },
  { name: "Federal Reserve", count: "19.3K" },
  { name: "Space Discovery", count: "15.7K" },
  { name: "Cybersecurity Act", count: "12.9K" },
]

const opinionArticles = [
  {
    id: 101,
    title: "Why the Climate Summit Must Deliver More Than Promises This Time",
    author: "Dr. Patricia Moore",
    authorImage: "/images/opinion-author.jpg",
    time: "Today",
  },
  {
    id: 102,
    title: "The Infrastructure Bill Is a Good Start, But We Need Bolder Vision",
    author: "Robert Steinberg",
    authorImage: "/images/opinion-author.jpg",
    time: "Today",
  },
  {
    id: 103,
    title: "AI in Medicine: Promise and Peril of Automated Diagnosis",
    author: "Dr. Lisa Yamamoto",
    authorImage: "/images/opinion-author.jpg",
    time: "Yesterday",
  },
]

const liveUpdates = [
  { time: "12:45 PM", text: "Senate committee begins hearing on tech regulation bill", isNew: true },
  { time: "12:30 PM", text: "Markets update: Dow Jones up 1.2% at midday trading", isNew: true },
  { time: "12:15 PM", text: "Weather alert: Severe storms expected across the Southeast", isNew: false },
  { time: "12:00 PM", text: "Press briefing scheduled for 2:00 PM ET on border policy", isNew: false },
  { time: "11:45 AM", text: "Trade negotiations resume between major economic powers", isNew: false },
  { time: "11:30 AM", text: "New jobs report shows unemployment at historic low", isNew: false },
]

const categoryIcons: Record<string, React.ReactNode> = {
  WORLD: <Globe className="w-4 h-4" />,
  POLITICS: <AlertTriangle className="w-4 h-4" />,
  BUSINESS: <DollarSign className="w-4 h-4" />,
  TECHNOLOGY: <Zap className="w-4 h-4" />,
  SPORTS: <Trophy className="w-4 h-4" />,
  ENTERTAINMENT: <Tv className="w-4 h-4" />,
  HEALTH: <Heart className="w-4 h-4" />,
  SCIENCE: <FlaskConical className="w-4 h-4" />,
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function BreakingTicker() {
  return (
    <div className="bg-frolick-red text-white overflow-hidden">
      <div className="flex items-center">
        <div className="bg-frolick-red-dark px-4 py-2 font-oswald font-bold text-sm tracking-wider flex items-center gap-2 shrink-0 z-10">
          <Flame className="w-4 h-4 animate-pulse" />
          BREAKING
        </div>
        <div className="overflow-hidden whitespace-nowrap py-2">
          <div className="inline-block animate-marquee">
            {breakingNews.map((news, i) => (
              <span key={i} className="mx-8 text-sm font-roboto">
                {news}
                {i < breakingNews.length - 1 && <span className="mx-8 text-frolick-yellow">●</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-frolick-darker text-frolick-gray-light text-xs font-roboto border-b border-frolick-charcoal">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="hidden sm:inline text-frolick-yellow font-medium">LIVE UPDATES</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-frolick-yellow transition-colors">Subscribe</a>
          <a href="#" className="hover:text-frolick-yellow transition-colors">Newsletter</a>
          <a href="#" className="hover:text-frolick-yellow transition-colors">Login</a>
        </div>
      </div>
    </div>
  )
}

function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (v: boolean) => void }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="bg-frolick-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <button
            className="lg:hidden text-white p-2 hover:bg-frolick-charcoal rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-3xl px-3 py-1 tracking-tight">
              F
            </div>
            <div>
              <h1 className="font-oswald font-bold text-2xl md:text-3xl text-white tracking-wide">
                FROLICK
              </h1>
              <p className="text-frolick-yellow text-xs font-roboto tracking-widest -mt-1 hidden sm:block">
                FAIR · FEARLESS · FIRST
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center bg-frolick-charcoal rounded-full px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="bg-transparent text-white text-sm outline-none w-32 md:w-48 font-roboto"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4 text-frolick-gray-light" />
                </button>
              </div>
            ) : (
              <button
                className="text-white p-2 hover:bg-frolick-charcoal rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button className="hidden md:flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-2 rounded hover:bg-frolick-amber transition-colors text-sm">
              <Play className="w-4 h-4" />
              WATCH LIVE
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-frolick-charcoal border-t border-frolick-gray/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center gap-0">
            {navCategories.map((cat, i) => (
              <a
                key={cat}
                href="#"
                className={`px-4 py-2.5 text-sm font-oswald font-medium tracking-wide transition-colors ${
                  i === 0
                    ? 'text-frolick-yellow border-b-2 border-frolick-yellow'
                    : 'text-white hover:text-frolick-yellow hover:bg-frolick-dark/50'
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-frolick-dark border-t border-frolick-charcoal">
          {navCategories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="block px-6 py-3 text-white font-oswald text-lg hover:bg-frolick-charcoal hover:text-frolick-yellow transition-colors border-b border-frolick-charcoal/50"
            >
              {cat}
            </a>
          ))}
          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-3 rounded hover:bg-frolick-amber transition-colors">
              <Play className="w-5 h-5" />
              WATCH LIVE
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function CategoryBadge({ category, isLive, isBreaking, isExclusive }: {
  category: string, isLive?: boolean, isBreaking?: boolean, isExclusive?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 bg-frolick-yellow text-frolick-dark text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
        {categoryIcons[category]}
        {category}
      </span>
      {isLive && (
        <span className="flex items-center gap-1 bg-frolick-red text-white text-xs font-oswald font-bold px-2 py-0.5 rounded-sm animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full" />
          LIVE
        </span>
      )}
      {isBreaking && (
        <span className="flex items-center gap-1 bg-frolick-red text-white text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
          <Flame className="w-3 h-3" />
          BREAKING
        </span>
      )}
      {isExclusive && (
        <span className="bg-frolick-dark text-frolick-yellow text-xs font-oswald font-bold px-2 py-0.5 rounded-sm border border-frolick-yellow">
          EXCLUSIVE
        </span>
      )}
    </div>
  )
}

function ArticleCard({ article, variant = 'default' }: { article: Article, variant?: 'default' | 'horizontal' | 'compact' }) {
  const imgFallback = `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${article.category}`

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <div className="relative w-40 h-28 shrink-0 overflow-hidden rounded">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
          />
          {article.isLive && (
            <div className="absolute top-2 left-2 bg-frolick-red text-white text-xs font-oswald px-1.5 py-0.5 rounded-sm animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              LIVE
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <CategoryBadge category={article.category} isExclusive={article.isExclusive} />
            <h3 className="font-oswald font-semibold text-frolick-dark mt-1 text-base leading-tight group-hover:text-frolick-yellow-dark transition-colors line-clamp-2">
              {article.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-roboto mt-2">
            <span>{article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.time}</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{article.comments}</span>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
        <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-lg w-8 h-8 flex items-center justify-center rounded shrink-0">
          {article.id}
        </div>
        <div>
          <span className="text-xs font-oswald text-frolick-yellow-dark font-semibold">{article.category}</span>
          <h4 className="font-roboto font-medium text-sm text-frolick-dark leading-snug group-hover:text-frolick-yellow-dark transition-colors cursor-pointer">
            {article.title}
          </h4>
          <span className="text-xs text-gray-400 font-roboto mt-1 block">{article.time}</span>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={article.category} isLive={article.isLive} isBreaking={article.isBreaking} isExclusive={article.isExclusive} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
      </div>
      <div className="p-4">
        <h3 className="font-oswald font-semibold text-lg text-frolick-dark leading-tight group-hover:text-frolick-yellow-dark transition-colors cursor-pointer">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 font-roboto mt-2 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500 font-roboto">
            <span className="font-medium text-frolick-dark">{article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-frolick-yellow-dark transition-colors"><Bookmark className="w-4 h-4" /></button>
            <button className="text-gray-400 hover:text-frolick-yellow-dark transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </article>
  )
}

function HeroSection() {
  const imgFallback = "https://placehold.co/1200x600/1A1A1A/FFD700/png?text=BREAKING+NEWS"
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Hero */}
          <div className="lg:col-span-2">
            <article className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer">
              <img
                src={heroArticle.image}
                alt={heroArticle.title}
                className="w-full h-72 md:h-96 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <CategoryBadge category={heroArticle.category} isBreaking={heroArticle.isBreaking} />
                <h2 className="font-oswald font-bold text-2xl md:text-3xl lg:text-4xl text-white mt-3 leading-tight drop-shadow-lg">
                  {heroArticle.title}
                </h2>
                <p className="text-gray-200 font-roboto text-sm md:text-base mt-3 max-w-2xl leading-relaxed line-clamp-2">
                  {heroArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-gray-300 text-sm font-roboto">
                  <span className="text-frolick-yellow font-medium">{heroArticle.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{heroArticle.time}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{heroArticle.comments} comments</span>
                </div>
                <button className="mt-4 flex items-center gap-2 text-frolick-yellow font-oswald font-semibold text-sm hover:text-white transition-colors">
                  READ FULL STORY <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          </div>

          {/* Side stories */}
          <div className="flex flex-col gap-4">
            {featuredArticles.slice(0, 3).map((article) => (
              <article key={article.id} className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer flex-1">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full min-h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x250/1A1A1A/FFD700/png?text=${article.category}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <CategoryBadge category={article.category} isLive={article.isLive} isExclusive={article.isExclusive} />
                  <h3 className="font-oswald font-semibold text-base text-white mt-2 leading-tight line-clamp-2 drop-shadow">
                    {article.title}
                  </h3>
                  <span className="text-gray-300 text-xs font-roboto mt-1 block">{article.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveUpdatesSidebar() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-frolick-dark px-4 py-3 flex items-center justify-between">
        <h3 className="font-oswald font-bold text-frolick-yellow text-lg flex items-center gap-2">
          <Zap className="w-5 h-5" />
          LIVE UPDATES
        </h3>
        <span className="w-2.5 h-2.5 bg-frolick-red rounded-full animate-pulse" />
      </div>
      <div className="divide-y divide-gray-100">
        {liveUpdates.map((update, i) => (
          <div key={i} className="px-4 py-3 hover:bg-frolick-yellow-light/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-xs font-roboto text-gray-400 shrink-0 mt-0.5">{update.time}</span>
              <p className="text-sm font-roboto text-frolick-dark leading-snug">
                {update.isNew && <span className="inline-block w-2 h-2 bg-frolick-red rounded-full mr-2 animate-pulse" />}
                {update.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-center">
        <button className="text-frolick-yellow-dark font-oswald font-semibold text-sm hover:text-frolick-dark transition-colors flex items-center gap-1 mx-auto">
          VIEW ALL UPDATES <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function TrendingSidebar() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-frolick-yellow px-4 py-3">
        <h3 className="font-oswald font-bold text-frolick-dark text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          TRENDING NOW
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {trendingTopics.map((topic, i) => (
          <a key={i} href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-frolick-yellow-light/30 transition-colors group">
            <span className="font-oswald font-bold text-lg text-frolick-yellow-dark w-6">{i + 1}</span>
            <div className="flex-1">
              <span className="font-roboto font-medium text-sm text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">
                #{topic.name}
              </span>
              <span className="block text-xs text-gray-400 font-roboto">{topic.count} posts</span>
            </div>
            <TrendingUp className="w-4 h-4 text-frolick-yellow-dark opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  )
}

function OpinionSection() {
  return (
    <section className="bg-frolick-dark py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
          <h2 className="font-oswald font-bold text-2xl text-white">OPINION & ANALYSIS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opinionArticles.map((article) => (
            <article key={article.id} className="bg-frolick-charcoal rounded-lg p-5 hover:bg-frolick-gray transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-frolick-yellow"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/FFD700/1A1A1A/png?text=OP' }}
                />
                <div>
                  <span className="text-frolick-yellow font-roboto font-medium text-sm block">{article.author}</span>
                  <span className="text-gray-400 text-xs font-roboto">{article.time}</span>
                </div>
              </div>
              <h3 className="font-merriweather text-white text-lg leading-snug group-hover:text-frolick-yellow transition-colors">
                &ldquo;{article.title}&rdquo;
              </h3>
              <button className="mt-4 text-frolick-yellow font-oswald text-sm flex items-center gap-1 hover:text-white transition-colors">
                READ OPINION <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  return (
    <section className="bg-frolick-darker py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-frolick-red rounded-full" />
            <h2 className="font-oswald font-bold text-2xl text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-frolick-yellow" />
              FROLICK VIDEO
            </h2>
          </div>
          <a href="#" className="text-frolick-yellow font-oswald text-sm flex items-center gap-1 hover:text-white transition-colors">
            VIEW ALL <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Inside the Climate Summit: Exclusive Behind-the-Scenes Coverage", duration: "12:34", views: "1.2M" },
            { title: "Tech CEOs Testify on AI Safety Before Congressional Committee", duration: "8:45", views: "890K" },
            { title: "Championship Highlights: Top 10 Plays of the Finals", duration: "5:22", views: "3.4M" },
            { title: "Economic Outlook: Expert Panel Discusses Market Trends", duration: "15:08", views: "456K" },
          ].map((video, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden bg-frolick-charcoal aspect-video">
                <img
                  src={latestArticles[i]?.image || '/images/hero-news.jpg'}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/1A1A1A/FFD700/png?text=VIDEO' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-frolick-yellow/90 rounded-full flex items-center justify-center group-hover:bg-frolick-yellow group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-5 h-5 text-frolick-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-roboto px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-roboto font-medium text-white text-sm mt-2 leading-snug line-clamp-2 group-hover:text-frolick-yellow transition-colors">
                {video.title}
              </h4>
              <span className="text-xs text-gray-500 font-roboto flex items-center gap-1 mt-1">
                <Eye className="w-3 h-3" />{video.views} views
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="bg-frolick-yellow py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-10 h-10 text-frolick-dark mx-auto mb-3" />
          <h2 className="font-oswald font-bold text-3xl text-frolick-dark">GET THE FROLICK NEWSLETTER</h2>
          <p className="font-roboto text-frolick-gray mt-2">
            Stay informed with breaking news, exclusive analysis, and expert opinions delivered straight to your inbox every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg font-roboto text-sm border-2 border-frolick-dark/20 focus:border-frolick-dark outline-none"
            />
            <button className="bg-frolick-dark text-frolick-yellow font-oswald font-bold px-6 py-3 rounded-lg hover:bg-frolick-darker transition-colors tracking-wide">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-xs text-frolick-gray mt-3 font-roboto">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}

function MostReadSidebar() {
  const mostRead = latestArticles.slice(0, 5).map((a, i) => ({ ...a, id: i + 1 }))
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-frolick-dark px-4 py-3">
        <h3 className="font-oswald font-bold text-frolick-yellow text-lg flex items-center gap-2">
          <ThumbsUp className="w-5 h-5" />
          MOST READ
        </h3>
      </div>
      <div className="p-3">
        {mostRead.map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-frolick-darker text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-2xl px-2 py-0.5">F</div>
              <span className="font-oswald font-bold text-xl text-white">FROLICK</span>
            </div>
            <p className="font-roboto text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and expert commentary on the stories that matter most.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-frolick-charcoal hover:bg-frolick-yellow hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">NEWS</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {["U.S. News", "World", "Politics", "Business", "Technology", "Science", "Health"].map(link => (
                <li key={link}><a href="#" className="hover:text-frolick-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">SHOWS</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {["Morning Report", "Midday Briefing", "Evening Roundup", "Weekend Review", "Special Investigations", "Frolick Debates"].map(link => (
                <li key={link}><a href="#" className="hover:text-frolick-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-oswald font-bold text-white text-sm tracking-wider mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm font-roboto">
              {["About Us", "Careers", "Advertise With Us", "Contact", "Press", "Terms of Use", "Privacy Policy", "Accessibility"].map(link => (
                <li key={link}><a href="#" className="hover:text-frolick-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-frolick-charcoal mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-roboto">
          <span>&copy; {new Date().getFullYear()} FROLICK News Network. All Rights Reserved.</span>
          <span className="mt-2 md:mt-0">
            This material may not be published, broadcast, rewritten, or redistributed.
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {/* Top Bar */}
      <TopBar />

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Header & Nav */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
              <h2 className="font-oswald font-bold text-2xl text-frolick-dark">LATEST NEWS</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-4">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-frolick-dark text-frolick-yellow font-oswald font-bold px-8 py-3 rounded hover:bg-frolick-charcoal transition-colors tracking-wide">
                LOAD MORE STORIES
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <LiveUpdatesSidebar />
            <TrendingSidebar />
            <MostReadSidebar />

            {/* Ad Placeholder */}
            <div className="bg-gray-100 rounded-lg border border-gray-200 p-6 text-center">
              <span className="text-xs text-gray-400 font-roboto uppercase tracking-wider">Advertisement</span>
              <div className="h-48 flex items-center justify-center">
                <span className="text-gray-300 font-oswald text-lg">AD SPACE</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
            <h2 className="font-oswald font-bold text-2xl text-frolick-dark">MORE STORIES</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...featuredArticles, ...latestArticles.slice(0, 3)].map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Opinion Section */}
      <OpinionSection />

      {/* Video Section */}
      <VideoSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
