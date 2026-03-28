import { useState, useEffect } from 'react'
import { useQuery, useMutation, useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import {
  BarChart3,
  FileText,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  X,
  ArrowLeft,
  Loader2,
  LogOut,
  Newspaper,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const ADMIN_AUTH_KEY = 'frolick_admin_auth'

const CATEGORIES = [
  'WORLD', 'POLITICS', 'BUSINESS', 'TECHNOLOGY',
  'SPORTS', 'ENTERTAINMENT', 'HEALTH', 'SCIENCE',
]

const ARTICLE_TYPES: Array<'hero' | 'featured' | 'latest'> = ['hero', 'featured', 'latest']

interface ArticleForm {
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  time: string
  readTime: string
  type: 'hero' | 'featured' | 'latest'
  status: 'draft' | 'published'
  body: string
  seoKeywords: string
  isLive: boolean
  isBreaking: boolean
  isExclusive: boolean
  comments: number
}

const emptyForm: ArticleForm = {
  title: '',
  excerpt: '',
  category: 'WORLD',
  image: '',
  author: '',
  time: '',
  readTime: '5 min read',
  type: 'latest',
  status: 'draft',
  body: '',
  seoKeywords: '',
  isLive: false,
  isBreaking: false,
  isExclusive: false,
  comments: 0,
}

// ─── AUTH GATE ──────────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true')
      onLogin()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-3xl px-3 py-1 tracking-tight inline-block mb-3">
            F
          </div>
          <h1 className="font-oswald font-bold text-2xl text-frolick-dark">ADMIN DASHBOARD</h1>
          <p className="text-gray-500 font-roboto text-sm mt-1">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            placeholder="Admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm font-roboto mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-4 bg-frolick-dark text-frolick-yellow font-oswald font-bold px-6 py-3 rounded-lg hover:bg-frolick-charcoal transition-colors tracking-wide"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── DASHBOARD STATS ────────────────────────────────────────────────────────────

function DashboardStats() {
  const stats = useQuery(api.admin.getDashboardStats)

  if (stats === undefined) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-roboto text-sm">Total Articles</p>
            <p className="font-oswald font-bold text-3xl text-frolick-dark mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-frolick-yellow/10 rounded-xl flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-frolick-yellow-dark" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-roboto text-sm">Published</p>
            <p className="font-oswald font-bold text-3xl text-green-600 mt-1">{stats.published}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-roboto text-sm">Drafts</p>
            <p className="font-oswald font-bold text-3xl text-amber-600 mt-1">{stats.drafts}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ARTICLE EDITOR ─────────────────────────────────────────────────────────────

function ArticleEditor({
  editingId,
  initialForm,
  onClose,
}: {
  editingId: Id<"articles"> | null
  initialForm: ArticleForm
  onClose: () => void
}) {
  const [form, setForm] = useState<ArticleForm>(initialForm)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiType, setAiType] = useState<'full' | 'headline' | 'body' | 'seo'>('full')
  const [saving, setSaving] = useState(false)
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [aiResult, setAiResult] = useState<string | null>(null)

  const createArticle = useMutation(api.admin.createArticle)
  const updateArticle = useMutation(api.admin.updateArticle)
  const generateContent = useAction(api.ai.generateContent)

  const updateField = <K extends keyof ArticleForm>(field: K, value: ArticleForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiResult(null)
    try {
      const result = await generateContent({ prompt: aiPrompt, type: aiType })
      if (result.success) {
        const data = result.data as Record<string, unknown>
        if (aiType === 'full') {
          updateField('title', (data.title as string) || form.title)
          updateField('excerpt', (data.excerpt as string) || form.excerpt)
          updateField('body', (data.body as string) || form.body)
          updateField('category', (data.category as string) || form.category)
          updateField('readTime', (data.readTime as string) || form.readTime)
          if (Array.isArray(data.seoKeywords)) {
            updateField('seoKeywords', (data.seoKeywords as string[]).join(', '))
          }
          setAiResult('Full article generated successfully!')
        } else if (aiType === 'headline' && Array.isArray(data.headlines)) {
          updateField('title', (data.headlines as string[])[0] || form.title)
          setAiResult(`Headlines generated:\n${(data.headlines as string[]).map((h, i) => `${i + 1}. ${h}`).join('\n')}`)
        } else if (aiType === 'body') {
          updateField('body', (data.body as string) || form.body)
          setAiResult('Article body generated successfully!')
        } else if (aiType === 'seo' && Array.isArray(data.seoKeywords)) {
          updateField('seoKeywords', (data.seoKeywords as string[]).join(', '))
          setAiResult(`SEO keywords: ${(data.seoKeywords as string[]).join(', ')}`)
        }
        if ('mock' in result && result.mock) {
          setAiResult((prev) => (prev ? prev + '\n(Generated with mock data — configure OPENAI_API_KEY for real AI)' : null))
        }
      }
    } catch (err) {
      console.error('AI generation failed:', err)
      setAiResult('AI generation failed. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) return
    setSaving(true)
    try {
      const time = form.time || new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      const articleData = {
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        image: form.image || `/images/${form.category.toLowerCase()}.jpg`,
        author: form.author || 'Admin',
        time,
        readTime: form.readTime,
        type: form.type,
        status: form.status,
        body: form.body || undefined,
        seoKeywords: form.seoKeywords
          ? form.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
          : undefined,
        isLive: form.isLive || undefined,
        isBreaking: form.isBreaking || undefined,
        isExclusive: form.isExclusive || undefined,
        comments: form.comments,
      }

      if (editingId) {
        await updateArticle({ id: editingId, ...articleData })
      } else {
        await createArticle(articleData)
      }
      onClose()
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Editor Header */}
      <div className="bg-frolick-dark px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-oswald font-bold text-lg text-white">
            {editingId ? 'EDIT ARTICLE' : 'NEW ARTICLE'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="flex items-center gap-2 bg-purple-600 text-white font-oswald font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <Sparkles className="w-4 h-4" />
            WRITE WITH AI
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title.trim() || !form.excerpt.trim()}
            className="flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-2 rounded-lg hover:bg-frolick-amber transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            SAVE
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Form */}
        <div className="flex-1 p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter article headline..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Excerpt *</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="Brief summary of the article..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20 resize-none"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Body</label>
            <textarea
              value={form.body}
              onChange={(e) => updateField('body', e.target.value)}
              placeholder="Full article content..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20 resize-none"
            />
          </div>

          {/* Category & Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => updateField('type', e.target.value as 'hero' | 'featured' | 'latest')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20 bg-white"
              >
                {ARTICLE_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Author & Image Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
              />
            </div>
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="/images/category.jpg or URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
              />
            </div>
          </div>

          {/* Read Time & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => updateField('readTime', e.target.value)}
                placeholder="5 min read"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
              />
            </div>
            <div>
              <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">Time</label>
              <input
                type="text"
                value={form.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="2 hours ago (auto-filled if empty)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
              />
            </div>
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block font-oswald font-semibold text-sm text-frolick-dark mb-1">SEO Keywords</label>
            <input
              type="text"
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-frolick-yellow focus:ring-2 focus:ring-frolick-yellow/20"
            />
          </div>

          {/* Status Toggle & Flags */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-3">
              <label className="font-oswald font-semibold text-sm text-frolick-dark">Status:</label>
              <button
                onClick={() => updateField('status', form.status === 'draft' ? 'published' : 'draft')}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  form.status === 'published' ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    form.status === 'published' ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-roboto text-sm font-medium ${
                form.status === 'published' ? 'text-green-600' : 'text-amber-600'
              }`}>
                {form.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isLive}
                onChange={(e) => updateField('isLive', e.target.checked)}
                className="w-4 h-4 accent-frolick-yellow"
              />
              <span className="font-roboto text-sm text-frolick-dark">Live</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isBreaking}
                onChange={(e) => updateField('isBreaking', e.target.checked)}
                className="w-4 h-4 accent-frolick-red"
              />
              <span className="font-roboto text-sm text-frolick-dark">Breaking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isExclusive}
                onChange={(e) => updateField('isExclusive', e.target.checked)}
                className="w-4 h-4 accent-frolick-dark"
              />
              <span className="font-roboto text-sm text-frolick-dark">Exclusive</span>
            </label>
          </div>
        </div>

        {/* AI Panel */}
        {showAiPanel && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-oswald font-bold text-frolick-dark flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI WRITER
              </h3>
              <button onClick={() => setShowAiPanel(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-roboto text-xs text-gray-500 mb-1">Generation Type</label>
                <select
                  value={aiType}
                  onChange={(e) => setAiType(e.target.value as typeof aiType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto text-sm bg-white focus:outline-none focus:border-purple-400"
                >
                  <option value="full">Full Article</option>
                  <option value="headline">Headlines Only</option>
                  <option value="body">Body Text Only</option>
                  <option value="seo">SEO Keywords Only</option>
                </select>
              </div>

              <div>
                <label className="block font-roboto text-xs text-gray-500 mb-1">Prompt / Topic</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe the topic or paste a title..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto text-sm focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <button
                onClick={handleAiGenerate}
                disabled={aiLoading || !aiPrompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-oswald font-semibold py-2.5 rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    GENERATE
                  </>
                )}
              </button>

              {aiResult && (
                <div className="bg-white border border-purple-200 rounded-lg p-3">
                  <p className="font-roboto text-sm text-gray-700 whitespace-pre-line">{aiResult}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── ARTICLE LIST ───────────────────────────────────────────────────────────────

function ArticleList({
  onEdit,
  onNew,
}: {
  onEdit: (id: Id<"articles">) => void
  onNew: () => void
}) {
  const articles = useQuery(api.admin.getAllArticles)
  const deleteArticle = useMutation(api.admin.deleteArticle)
  const toggleStatus = useMutation(api.admin.toggleStatus)
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  if (articles === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  const filtered = articles.filter((a) => {
    if (filter === 'all') return true
    const articleStatus = a.status ?? 'published'
    return articleStatus === filter
  })

  const handleDelete = async (id: Id<"articles">) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return
    setDeleting(id)
    try {
      await deleteArticle({ id })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-frolick-dark px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="font-oswald font-bold text-lg text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-frolick-yellow" />
          ARTICLES
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex bg-frolick-charcoal rounded-lg overflow-hidden">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 font-oswald text-xs font-semibold tracking-wide transition-colors ${
                  filter === f
                    ? 'bg-frolick-yellow text-frolick-dark'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={onNew}
            className="flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-4 py-1.5 rounded-lg hover:bg-frolick-amber transition-colors text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            NEW
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-gray-400 font-roboto">
          No articles found.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filtered.map((article) => {
            const status = article.status ?? 'published'
            return (
              <div key={article._id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-oswald font-bold ${
                      status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {status.toUpperCase()}
                    </span>
                    <span className="bg-frolick-yellow/20 text-frolick-yellow-dark text-xs font-oswald font-bold px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-gray-400 text-xs font-roboto">{article.type}</span>
                  </div>
                  <h3 className="font-roboto font-medium text-frolick-dark text-sm truncate">{article.title}</h3>
                  <p className="text-gray-400 text-xs font-roboto mt-0.5">
                    {article.author} &middot; {article.time}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleStatus({ id: article._id })}
                    className={`p-2 rounded-lg transition-colors ${
                      status === 'published'
                        ? 'text-green-500 hover:bg-green-50'
                        : 'text-amber-500 hover:bg-amber-50'
                    }`}
                    title={status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    {status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onEdit(article._id)}
                    className="p-2 text-gray-400 hover:text-frolick-yellow-dark hover:bg-frolick-yellow/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    disabled={deleting === article._id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === article._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── MAIN ADMIN PAGE ────────────────────────────────────────────────────────────

type AdminView = { type: 'list' } | { type: 'editor'; editingId: Id<"articles"> | null }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [view, setView] = useState<AdminView>({ type: 'list' })
  const articles = useQuery(api.admin.getAllArticles)
  const editingArticle = view.type === 'editor' && view.editingId
    ? articles?.find((a) => a._id === view.editingId)
    : null

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true') {
      setAuthenticated(true)
    }
  }, [])

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  const handleEdit = (id: Id<"articles">) => {
    setView({ type: 'editor', editingId: id })
  }

  const handleNew = () => {
    setView({ type: 'editor', editingId: null })
  }

  const handleCloseEditor = () => {
    setView({ type: 'list' })
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY)
    setAuthenticated(false)
  }

  const getInitialForm = (): ArticleForm => {
    if (editingArticle) {
      return {
        title: editingArticle.title,
        excerpt: editingArticle.excerpt,
        category: editingArticle.category,
        image: editingArticle.image,
        author: editingArticle.author,
        time: editingArticle.time,
        readTime: editingArticle.readTime,
        type: editingArticle.type,
        status: editingArticle.status ?? 'published',
        body: editingArticle.body ?? '',
        seoKeywords: editingArticle.seoKeywords?.join(', ') ?? '',
        isLive: editingArticle.isLive ?? false,
        isBreaking: editingArticle.isBreaking ?? false,
        isExclusive: editingArticle.isExclusive ?? false,
        comments: editingArticle.comments,
      }
    }
    return { ...emptyForm }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Admin Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-oswald font-bold text-3xl text-frolick-dark">ADMIN DASHBOARD</h1>
          <p className="text-gray-500 font-roboto text-sm mt-1">Manage your articles and content</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-frolick-red font-roboto text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Content */}
      {view.type === 'list' ? (
        <ArticleList onEdit={handleEdit} onNew={handleNew} />
      ) : (
        <ArticleEditor
          key={view.editingId ?? 'new'}
          editingId={view.editingId}
          initialForm={getInitialForm()}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  )
}
