import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Clock, MessageSquare, ArrowLeft, Loader2 } from 'lucide-react'

const categoryMap: Record<string, string> = {
  'us-news': 'U.S.',
  'world': 'WORLD',
  'politics': 'POLITICS',
  'business': 'BUSINESS',
  'technology': 'TECHNOLOGY',
  'science': 'SCIENCE',
  'health': 'HEALTH',
  'sports': 'SPORTS',
  'entertainment': 'ENTERTAINMENT',
}

const categoryDisplayNames: Record<string, string> = {
  'us-news': 'U.S. News',
  'world': 'World',
  'politics': 'Politics',
  'business': 'Business',
  'technology': 'Technology',
  'science': 'Science',
  'health': 'Health',
  'sports': 'Sports',
  'entertainment': 'Entertainment',
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const allArticles = useQuery(api.articles.getAll)

  const categoryKey = slug ? categoryMap[slug] : undefined
  const displayName = slug ? categoryDisplayNames[slug] ?? slug : 'Category'

  const filtered = (allArticles ?? []).filter(
    (a) => categoryKey && a.category.toUpperCase() === categoryKey
  )

  if (allArticles === undefined) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">{displayName.toUpperCase()}</h1>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 font-roboto text-lg">No articles found in this category yet.</p>
          <Link to="/" className="inline-block mt-4 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold transition-colors">
            Browse all news
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => {
            const imgFallback = `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${article.category}`
            return (
              <article key={article._id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = imgFallback }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-frolick-yellow text-frolick-dark text-xs font-oswald font-bold px-2 py-0.5 rounded-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-oswald font-semibold text-lg text-frolick-dark leading-tight group-hover:text-frolick-yellow-dark transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-roboto mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 font-roboto">
                    <span className="font-medium text-frolick-dark">{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.time}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{article.comments}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
