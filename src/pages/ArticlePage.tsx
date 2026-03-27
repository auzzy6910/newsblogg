import { useParams, Link } from 'react-router-dom'
import { Clock, MessageSquare, Share2, Bookmark, Facebook, Twitter } from 'lucide-react'
import { heroArticle, featuredArticles, latestArticles, categoryArticles } from '../data/newsData'
import { CategoryBadge, MostReadSidebar, TrendingSidebar } from '../components/ArticleComponents'
import type { Article } from '../data/newsData'

function getAllArticles(): Article[] {
  const all: Article[] = [heroArticle, ...featuredArticles, ...latestArticles]
  Object.values(categoryArticles).forEach(articles => {
    all.push(...articles)
  })
  return all
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const allArticles = getAllArticles()
  const article = allArticles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-oswald text-4xl text-gray-400 mb-4">Article Not Found</h1>
        <Link to="/" className="text-frolick-yellow-dark font-oswald hover:text-frolick-dark transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">{article.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <CategoryBadge category={article.category} isBreaking={article.isBreaking} isLive={article.isLive} isExclusive={article.isExclusive} />

          <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark mt-4 leading-tight">
            {article.title}
          </h1>

          <p className="font-roboto text-lg text-gray-600 mt-4 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-frolick-yellow text-frolick-dark font-oswald font-bold rounded-full flex items-center justify-center">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-roboto font-medium text-frolick-dark block text-sm">{article.author}</span>
                <span className="text-xs text-gray-500 font-roboto flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {article.time} · {article.readTime}
                </span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="text-gray-400 hover:text-frolick-yellow-dark transition-colors p-2"><Bookmark className="w-5 h-5" /></button>
              <button className="text-gray-400 hover:text-frolick-yellow-dark transition-colors p-2"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Article image */}
          <div className="mt-6 rounded-xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/1200x600/1A1A1A/FFD700/png?text=${article.category}` }}
            />
          </div>

          {/* Article content */}
          <div className="mt-8 font-roboto text-gray-700 leading-relaxed space-y-4 text-base">
            <p>{article.content || article.excerpt}</p>
            <p>
              The implications of this development are far-reaching, affecting not only domestic stakeholders but also international observers who have been closely monitoring the situation. Experts across multiple disciplines have weighed in, offering perspectives that range from cautiously optimistic to deeply concerned about long-term consequences.
            </p>
            <p>
              "This represents a pivotal moment," said one senior analyst who spoke on condition of anonymity. "The decisions made in the coming weeks will shape policy and public discourse for years to come. It's essential that all parties approach this with both urgency and careful deliberation."
            </p>
            <p>
              Public reaction has been swift and varied, with social media platforms seeing a surge in engagement around related topics. Advocacy groups on multiple sides of the issue have mobilized their supporters, launching campaigns to influence the next steps in this rapidly evolving story.
            </p>
            <p>
              Looking ahead, several key dates and milestones will be critical in determining the trajectory of events. Stakeholders are preparing for what many anticipate will be a period of intensive negotiation, debate, and ultimately, resolution. This story continues to develop, and our team will provide comprehensive coverage as new information becomes available.
            </p>
          </div>

          {/* Share bar */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
            <span className="font-oswald font-bold text-frolick-dark text-sm">SHARE THIS ARTICLE:</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-frolick-dark hover:bg-frolick-yellow text-white hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-frolick-dark hover:bg-frolick-yellow text-white hover:text-frolick-dark rounded-full flex items-center justify-center transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Comments */}
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="font-oswald font-bold text-xl text-frolick-dark flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              COMMENTS ({article.comments.toLocaleString()})
            </h3>
            <div className="mt-4">
              <textarea
                placeholder="Join the discussion..."
                className="w-full p-4 border border-gray-200 rounded-lg font-roboto text-sm resize-none h-24 focus:border-frolick-yellow outline-none"
              />
              <button className="mt-3 bg-frolick-yellow text-frolick-dark font-oswald font-bold px-6 py-2 rounded hover:bg-frolick-amber transition-colors">
                POST COMMENT
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
                <h2 className="font-oswald font-bold text-2xl text-frolick-dark">RELATED STORIES</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map(a => (
                  <Link key={a.id} to={`/article/${a.id}`} className="group">
                    <div className="rounded-lg overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x200/1A1A1A/FFD700/png?text=${a.category}` }} />
                    </div>
                    <h4 className="font-oswald font-semibold text-sm text-frolick-dark mt-2 group-hover:text-frolick-yellow-dark transition-colors leading-tight">
                      {a.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="space-y-6">
          <TrendingSidebar />
          <MostReadSidebar articles={latestArticles} />
        </aside>
      </div>
    </div>
  )
}
