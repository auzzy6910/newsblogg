import {
  heroArticle, featuredArticles, latestArticles,
  opinionArticles, videoItems,
} from '../data/newsData'
import {
  HeroSection, ArticleCard, LiveUpdatesSidebar,
  TrendingSidebar, MostReadSidebar, OpinionSection, VideoSection,
} from '../components/ArticleComponents'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection hero={heroArticle} featured={featuredArticles} />

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
      <OpinionSection articles={opinionArticles} />

      {/* Video Section */}
      <VideoSection videos={videoItems} />
    </>
  )
}
