import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Link } from 'react-router-dom'
import {
  FileText,
  Eye,
  PenLine,
  Users,
  PlusCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react'

export default function AdminDashboard() {
  const stats = useQuery(api.admin.getDashboardStats)
  const allArticles = useQuery(api.admin.getAllArticles)

  if (stats === undefined || allArticles === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  const recentArticles = [...(allArticles ?? [])]
    .sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0))
    .slice(0, 5)

  const statCards = [
    {
      label: 'Total Posts',
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: PenLine,
      color: 'bg-frolick-yellow',
      textColor: 'text-frolick-dark',
    },
    {
      label: 'Subscribers',
      value: stats.subscriberCount,
      icon: Users,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${stat.textColor ?? 'text-white'}`} />
              </div>
              <div>
                <p className="text-2xl font-oswald font-bold text-frolick-dark">
                  {stat.value}
                </p>
                <p className="text-sm font-roboto text-gray-500">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded-lg hover:bg-frolick-amber transition-colors text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Post
        </Link>
        <Link
          to="/admin/posts"
          className="inline-flex items-center gap-2 bg-frolick-dark text-white font-oswald font-semibold px-5 py-2.5 rounded-lg hover:bg-frolick-charcoal transition-colors text-sm"
        >
          <FileText className="w-4 h-4" />
          Manage Posts
        </Link>
      </div>

      {/* Recent Posts & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-oswald font-bold text-frolick-dark text-lg">
              Recent Posts
            </h3>
            <Link
              to="/admin/posts"
              className="text-sm font-roboto text-frolick-yellow-dark hover:text-frolick-dark flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentArticles.map((article) => (
              <div
                key={article._id}
                className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/admin/posts/${article._id}/edit`}
                    className="font-roboto font-medium text-sm text-frolick-dark hover:text-frolick-yellow-dark transition-colors truncate block"
                  >
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs font-roboto text-gray-400">
                      {article.category}
                    </span>
                    <span className="text-xs font-roboto text-gray-400">
                      {article.author}
                    </span>
                  </div>
                </div>
                <span
                  className={`shrink-0 ml-3 text-xs font-oswald font-semibold px-2.5 py-1 rounded-full ${
                    article.status === 'draft'
                      ? 'bg-frolick-yellow/20 text-frolick-yellow-dark'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {article.status === 'draft' ? 'DRAFT' : 'PUBLISHED'}
                </span>
              </div>
            ))}
            {recentArticles.length === 0 && (
              <div className="px-5 py-8 text-center text-gray-400 font-roboto text-sm">
                No posts yet. Create your first post!
              </div>
            )}
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-oswald font-bold text-frolick-dark text-lg">
              Categories
            </h3>
          </div>
          <div className="p-5 space-y-3">
            {Object.entries(stats.categories).map(([category, count]) => {
              const numCount = count as number
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-roboto text-gray-600">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-frolick-yellow rounded-full"
                        style={{
                          width: `${Math.min(100, (numCount / stats.total) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-oswald font-semibold text-frolick-dark w-6 text-right">
                      {numCount}
                    </span>
                  </div>
                </div>
              )
            })}
            {Object.keys(stats.categories).length === 0 && (
              <p className="text-sm text-gray-400 font-roboto">No categories yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
