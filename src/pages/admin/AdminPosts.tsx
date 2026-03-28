import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Link } from 'react-router-dom'
import type { Id } from '../../../convex/_generated/dataModel'
import {
  PlusCircle,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Search,
  AlertTriangle,
} from 'lucide-react'

export default function AdminPosts() {
  const allArticles = useQuery(api.admin.getAllArticles)
  const deleteArticle = useMutation(api.admin.deleteArticle)
  const toggleStatus = useMutation(api.admin.toggleStatus)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  if (allArticles === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  const filtered = (allArticles ?? []).filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    const status = article.status ?? 'published'
    const matchesFilter = filterStatus === 'all' || status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: Id<"articles">) => {
    await deleteArticle({ id })
    setDeleteConfirm(null)
  }

  const handleToggle = async (id: Id<"articles">) => {
    await toggleStatus({ id })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-oswald font-bold text-2xl text-frolick-dark">All Posts</h2>
          <p className="text-sm font-roboto text-gray-500 mt-1">
            {filtered.length} of {allArticles.length} posts
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded-lg hover:bg-frolick-amber transition-colors text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2.5 rounded-lg text-sm font-oswald font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-frolick-dark text-frolick-yellow'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Author
                </th>
                <th className="text-left px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Type
                </th>
                <th className="text-center px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((article) => {
                const status = article.status ?? 'published'
                return (
                  <tr
                    key={article._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/posts/${article._id}/edit`}
                        className="font-roboto font-medium text-sm text-frolick-dark hover:text-frolick-yellow-dark transition-colors line-clamp-1"
                      >
                        {article.title}
                      </Link>
                      <span className="text-xs text-gray-400 font-roboto block mt-0.5 md:hidden">
                        {article.category} &middot; {article.author}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 bg-frolick-yellow/20 text-frolick-yellow-dark text-xs font-oswald font-semibold px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-roboto text-gray-600 hidden lg:table-cell">
                      {article.author}
                    </td>
                    <td className="px-5 py-4 text-sm font-roboto text-gray-600 hidden lg:table-cell capitalize">
                      {article.type}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleToggle(article._id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-oswald font-semibold px-3 py-1 rounded-full transition-colors ${
                          status === 'draft'
                            ? 'bg-frolick-yellow/20 text-frolick-yellow-dark hover:bg-frolick-yellow/30'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                        title={`Click to ${status === 'draft' ? 'publish' : 'unpublish'}`}
                      >
                        {status === 'draft' ? (
                          <ToggleLeft className="w-4 h-4" />
                        ) : (
                          <ToggleRight className="w-4 h-4" />
                        )}
                        {status.toUpperCase()}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/posts/${article._id}/edit`}
                          className="p-2 text-gray-400 hover:text-frolick-yellow-dark hover:bg-frolick-yellow/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        {deleteConfirm === article._id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(article._id)}
                              className="px-2 py-1 text-xs font-oswald bg-frolick-red text-white rounded hover:bg-frolick-red-dark transition-colors"
                            >
                              DELETE
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 text-xs font-oswald bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                            >
                              CANCEL
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(article._id)}
                            className="p-2 text-gray-400 hover:text-frolick-red hover:bg-frolick-red/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-roboto text-gray-500 text-sm">
              {searchTerm || filterStatus !== 'all'
                ? 'No posts match your filters.'
                : 'No posts yet. Create your first post!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
