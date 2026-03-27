import { Link } from 'react-router-dom'
import {
  Clock, Share2, MessageSquare, Bookmark, Flame,
  Globe, AlertTriangle, DollarSign, Zap, Trophy,
  Tv, Heart, FlaskConical, TrendingUp, ThumbsUp,
  ChevronRight, Eye, Play, ArrowRight,
} from 'lucide-react'
import type { Article, LiveUpdate, TrendingTopic, OpinionArticle, VideoItem } from '../data/newsData'
import { liveUpdates, trendingTopics, latestArticles } from '../data/newsData'

// ─── CATEGORY ICONS ─────────────────────────────────────────────────────────────

const categoryIcons: Record<string, React.ReactNode> = {
  "WORLD": <Globe className="w-4 h-4" />,
  "POLITICS": <AlertTriangle className="w-4 h-4" />,
  "BUSINESS": <DollarSign className="w-4 h-4" />,
  "TECHNOLOGY": <Zap className="w-4 h-4" />,
  "SPORTS": <Trophy className="w-4 h-4" />,
  "ENTERTAINMENT": <Tv className="w-4 h-4" />,
  "HEALTH": <Heart className="w-4 h-4" />,
  "SCIENCE": <FlaskConical className="w-4 h-4" />,
  "U.S.": <Globe className="w-4 h-4" />,
}

// ─── CATEGORY BADGE ─────────────────────────────────────────────────────────────

export function CategoryBadge({ category, isLive, isBreaking, isExclusive }: {
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

// ─── ARTICLE CARD ───────────────────────────────────────────────────────────────

export function ArticleCard({ article, variant = 'default' }: { article: Article, variant?: 'default' | 'horizontal' | 'compact' }) {
  const imgFallback = `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${article.category}`

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.id}`}>
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
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.id}`}>
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
      </Link>
    )
  }

  return (
    <Link to={`/article/${article.id}`}>
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
    </Link>
  )
}

// ─── HERO SECTION ───────────────────────────────────────────────────────────────

export function HeroSection({ hero, featured }: { hero: Article, featured: Article[] }) {
  const imgFallback = "https://placehold.co/1200x600/1A1A1A/FFD700/png?text=BREAKING+NEWS"
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Link to={`/article/${hero.id}`}>
              <article className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer">
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-72 md:h-96 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <CategoryBadge category={hero.category} isBreaking={hero.isBreaking} />
                  <h2 className="font-oswald font-bold text-2xl md:text-3xl lg:text-4xl text-white mt-3 leading-tight drop-shadow-lg">
                    {hero.title}
                  </h2>
                  <p className="text-gray-200 font-roboto text-sm md:text-base mt-3 max-w-2xl leading-relaxed line-clamp-2">
                    {hero.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-gray-300 text-sm font-roboto">
                    <span className="text-frolick-yellow font-medium">{hero.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{hero.time}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{hero.comments} comments</span>
                  </div>
                  <span className="mt-4 flex items-center gap-2 text-frolick-yellow font-oswald font-semibold text-sm hover:text-white transition-colors">
                    READ FULL STORY <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {featured.slice(0, 3).map((article) => (
              <Link key={article.id} to={`/article/${article.id}`}>
                <article className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer flex-1">
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── LIVE UPDATES SIDEBAR ───────────────────────────────────────────────────────

export function LiveUpdatesSidebar({ updates }: { updates?: LiveUpdate[] }) {
  const data = updates || liveUpdates
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
        {data.map((update, i) => (
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

// ─── TRENDING SIDEBAR ───────────────────────────────────────────────────────────

export function TrendingSidebar({ topics }: { topics?: TrendingTopic[] }) {
  const data = topics || trendingTopics
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-frolick-yellow px-4 py-3">
        <h3 className="font-oswald font-bold text-frolick-dark text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          TRENDING NOW
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {data.map((topic, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-frolick-yellow-light/30 transition-colors group cursor-pointer">
            <span className="font-oswald font-bold text-lg text-frolick-yellow-dark w-6">{i + 1}</span>
            <div className="flex-1">
              <span className="font-roboto font-medium text-sm text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">
                #{topic.name}
              </span>
              <span className="block text-xs text-gray-400 font-roboto">{topic.count} posts</span>
            </div>
            <TrendingUp className="w-4 h-4 text-frolick-yellow-dark opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── OPINION SECTION ────────────────────────────────────────────────────────────

export function OpinionSection({ articles }: { articles?: OpinionArticle[] }) {
  const opinionData = articles || []
  return (
    <section className="bg-frolick-dark py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
            <h2 className="font-oswald font-bold text-2xl text-white">OPINION & ANALYSIS</h2>
          </div>
          <Link to="/opinion" className="text-frolick-yellow font-oswald text-sm flex items-center gap-1 hover:text-white transition-colors">
            ALL OPINIONS <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opinionData.map((article) => (
            <Link key={article.id} to={`/opinion/${article.id}`}>
              <article className="bg-frolick-charcoal rounded-lg p-5 hover:bg-frolick-gray transition-colors cursor-pointer group h-full">
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
                <span className="mt-4 text-frolick-yellow font-oswald text-sm flex items-center gap-1 hover:text-white transition-colors">
                  READ OPINION <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VIDEO SECTION ──────────────────────────────────────────────────────────────

export function VideoSection({ videos }: { videos?: VideoItem[] }) {
  const videoData = videos || []
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
          <Link to="/video" className="text-frolick-yellow font-oswald text-sm flex items-center gap-1 hover:text-white transition-colors">
            VIEW ALL <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoData.map((video, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden bg-frolick-charcoal aspect-video">
                <img
                  src={video.image || latestArticles[i]?.image || '/images/hero-news.jpg'}
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

// ─── MOST READ SIDEBAR ──────────────────────────────────────────────────────────

export function MostReadSidebar({ articles }: { articles?: Article[] }) {
  const mostRead = (articles || latestArticles).slice(0, 5).map((a, i) => ({ ...a, id: i + 1 }))
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
