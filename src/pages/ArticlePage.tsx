import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import {
  ArrowLeft,
  Clock,
  MessageSquare,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Loader2,
  Flame,
  Eye,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()

  const article = useQuery(
    api.articles.getById,
    id ? { id: id as Id<"articles"> } : "skip"
  )

  // Fetch related articles from same category
  const allArticles = useQuery(api.articles.getAll)

  if (article === undefined) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="text-center py-16">
          <h1 className="font-oswald font-bold text-3xl text-frolick-dark mb-4">Article Not Found</h1>
          <p className="text-gray-500 font-roboto">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-block mt-4 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold transition-colors">
            Browse all news
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles = (allArticles ?? [])
    .filter((a) => a.category === article.category && a._id !== article._id)
    .slice(0, 3)

  const imgFallback = `https://placehold.co/1200x600/1A1A1A/FFD700/png?text=${article.category}`

  return (
    <>
      <Helmet>
        <title>{article.title} - Frolick News</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 pb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-frolick-yellow text-frolick-dark text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
                  {article.category}
                </span>
                {article.isBreaking && (
                  <span className="flex items-center gap-1 bg-frolick-red text-white text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
                    <Flame className="w-3 h-3" />
                    BREAKING
                  </span>
                )}
                {article.isLive && (
                  <span className="flex items-center gap-1 bg-frolick-red text-white text-xs font-oswald font-bold px-2 py-0.5 rounded-sm animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    LIVE
                  </span>
                )}
                {article.isExclusive && (
                  <span className="bg-frolick-dark text-frolick-yellow text-xs font-oswald font-bold px-2 py-0.5 rounded-sm border border-frolick-yellow">
                    EXCLUSIVE
                  </span>
                )}
              </div>
              <h1 className="font-oswald font-bold text-2xl md:text-4xl text-white leading-tight drop-shadow-lg">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 mb-8">
            <div className="flex items-center gap-4 text-sm font-roboto text-gray-600">
              <span className="font-semibold text-frolick-dark">{article.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.time}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{article.readTime}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{article.comments} comments</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors text-sm font-roboto">
                <Facebook className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-sky-500 transition-colors text-sm font-roboto">
                <Twitter className="w-4 h-4" /> Tweet
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-frolick-yellow-dark transition-colors text-sm font-roboto">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 hover:text-frolick-yellow-dark transition-colors text-sm font-roboto">
                <Bookmark className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          {/* Excerpt / Lead */}
          <p className="text-lg md:text-xl text-gray-700 font-roboto leading-relaxed mb-8 font-medium border-l-4 border-frolick-yellow pl-4">
            {article.excerpt}
          </p>

          {/* Body Content */}
          {article.body ? (
            <div
              className="prose prose-lg max-w-none font-roboto text-gray-800 leading-relaxed
                prose-headings:font-oswald prose-headings:text-frolick-dark
                prose-a:text-frolick-yellow-dark prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-blockquote:border-frolick-yellow"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          ) : (
            <div className="font-roboto text-gray-800 leading-relaxed space-y-4 text-lg">
              <p>{article.excerpt}</p>
              <p className="text-gray-500 italic text-base">
                This is a developing story. Check back for updates.
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 mt-10 pt-6 border-t border-gray-200">
            <span className="text-sm font-oswald font-semibold text-frolick-dark">TOPICS:</span>
            <Link
              to={`/category/${article.category.toLowerCase()}`}
              className="bg-gray-100 text-gray-700 text-xs font-roboto px-3 py-1.5 rounded-full hover:bg-frolick-yellow hover:text-frolick-dark transition-colors"
            >
              {article.category}
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
                <h2 className="font-oswald font-bold text-2xl text-frolick-dark">RELATED STORIES</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => {
                  const relImgFallback = `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${related.category}`
                  return (
                    <Link key={related._id} to={`/article/${related._id}`} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = relImgFallback }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-frolick-yellow text-frolick-dark text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
                            {related.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-oswald font-semibold text-lg text-frolick-dark leading-tight group-hover:text-frolick-yellow-dark transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-roboto mt-2 line-clamp-2 leading-relaxed">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 font-roboto">
                          <span className="font-medium text-frolick-dark">{related.author}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{related.time}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
