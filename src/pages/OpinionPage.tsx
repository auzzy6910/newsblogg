import { useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { opinionArticles } from '../data/newsData'
import { TrendingSidebar } from '../components/ArticleComponents'

export function OpinionListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">Opinion</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-yellow rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark">OPINION & ANALYSIS</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {opinionArticles.map((article) => (
            <Link key={article.id} to={`/opinion/${article.id}`}>
              <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-frolick-yellow"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/56x56/FFD700/1A1A1A/png?text=OP' }}
                  />
                  <div>
                    <span className="text-frolick-dark font-roboto font-medium block">{article.author}</span>
                    <span className="text-gray-400 text-sm font-roboto">{article.time}</span>
                  </div>
                </div>
                <h2 className="font-merriweather text-xl text-frolick-dark leading-snug group-hover:text-frolick-yellow-dark transition-colors">
                  &ldquo;{article.title}&rdquo;
                </h2>
                {article.content && (
                  <p className="font-roboto text-gray-600 mt-3 text-sm line-clamp-2">{article.content}</p>
                )}
                <span className="mt-4 text-frolick-yellow-dark font-oswald text-sm flex items-center gap-1 group-hover:text-frolick-dark transition-colors">
                  READ FULL OPINION <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          ))}
        </div>

        <aside className="space-y-6">
          <TrendingSidebar />
        </aside>
      </div>
    </div>
  )
}

export function OpinionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const article = opinionArticles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-oswald text-4xl text-gray-400 mb-4">Opinion Not Found</h1>
        <Link to="/opinion" className="text-frolick-yellow-dark font-oswald hover:text-frolick-dark transition-colors">
          Back to Opinions
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <Link to="/opinion" className="hover:text-frolick-yellow-dark transition-colors">Opinion</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">Article</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={article.authorImage}
            alt={article.author}
            className="w-16 h-16 rounded-full object-cover border-2 border-frolick-yellow"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/64x64/FFD700/1A1A1A/png?text=OP' }}
          />
          <div>
            <span className="text-frolick-dark font-roboto font-medium text-lg block">{article.author}</span>
            <span className="text-gray-400 text-sm font-roboto">{article.time} · Opinion</span>
          </div>
        </div>

        <h1 className="font-merriweather text-3xl md:text-4xl text-frolick-dark leading-tight">
          &ldquo;{article.title}&rdquo;
        </h1>

        <div className="mt-8 font-roboto text-gray-700 leading-relaxed space-y-4 text-lg">
          <p>{article.content}</p>
          <p>
            The conversation around this topic has intensified in recent weeks, with thought leaders from across the political spectrum offering divergent perspectives. What remains clear is that the status quo is no longer tenable, and bold action -- guided by evidence and empathy -- is urgently needed.
          </p>
          <p>
            As citizens and as a global community, we must demand more from our leaders. Half-measures and incremental adjustments will not suffice in the face of challenges that are systemic and accelerating. The time for transformative thinking is now.
          </p>
        </div>

        {/* Other opinions */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="font-oswald font-bold text-xl text-frolick-dark mb-4">MORE OPINIONS</h3>
          <div className="space-y-4">
            {opinionArticles.filter(a => a.id !== article.id).map(a => (
              <Link key={a.id} to={`/opinion/${a.id}`} className="block group">
                <div className="flex items-center gap-3">
                  <img src={a.authorImage} alt={a.author} className="w-10 h-10 rounded-full border border-frolick-yellow"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/FFD700/1A1A1A/png?text=OP' }} />
                  <div>
                    <h4 className="font-roboto font-medium text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors text-sm">{a.title}</h4>
                    <span className="text-xs text-gray-400">{a.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
