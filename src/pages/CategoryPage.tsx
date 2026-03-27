import { useParams, Link } from 'react-router-dom'
import { categoryArticles, latestArticles } from '../data/newsData'
import { ArticleCard, TrendingSidebar, MostReadSidebar } from '../components/ArticleComponents'

const categoryMap: Record<string, string> = {
  us: "U.S.",
  world: "World",
  politics: "Politics",
  business: "Business",
  tech: "Tech",
  science: "Science",
  health: "Health",
  sports: "Sports",
  entertainment: "Entertainment",
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const categoryName = categoryMap[slug || ''] || slug || ''
  const articles = categoryArticles[categoryName] || []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">{categoryName}</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark uppercase">{categoryName}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <>
              {/* Featured article */}
              <div className="mb-8">
                <ArticleCard article={articles[0]} />
              </div>

              {/* Remaining articles */}
              <div className="space-y-4">
                {articles.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-oswald text-2xl text-gray-400">No articles found in this category</h2>
              <Link to="/" className="text-frolick-yellow-dark font-oswald mt-4 inline-block hover:text-frolick-dark transition-colors">
                Back to Home
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <TrendingSidebar />
          <MostReadSidebar articles={latestArticles} />
        </aside>
      </div>
    </div>
  )
}
