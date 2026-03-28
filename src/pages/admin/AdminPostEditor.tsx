import { useState, useEffect } from 'react'
import { useQuery, useMutation, useAction } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useParams, useNavigate } from 'react-router-dom'
import type { Id } from '../../../convex/_generated/dataModel'
import {
  Save,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  ArrowLeft,
  Wand2,
  Tag,
  FileText,
  Type,
} from 'lucide-react'

const CATEGORIES = [
  'WORLD',
  'POLITICS',
  'BUSINESS',
  'TECHNOLOGY',
  'SPORTS',
  'ENTERTAINMENT',
  'HEALTH',
  'SCIENCE',
]

const ARTICLE_TYPES: Array<'hero' | 'featured' | 'latest'> = [
  'hero',
  'featured',
  'latest',
]

interface FormData {
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  time: string
  readTime: string
  type: 'hero' | 'featured' | 'latest'
  status: 'draft' | 'published'
  isLive: boolean
  isBreaking: boolean
  isExclusive: boolean
  comments: number
  seoKeywords: string
}

const defaultForm: FormData = {
  title: '',
  excerpt: '',
  category: 'WORLD',
  image: '',
  author: '',
  time: 'Just now',
  readTime: '5 min read',
  type: 'latest',
  status: 'draft',
  isLive: false,
  isBreaking: false,
  isExclusive: false,
  comments: 0,
  seoKeywords: '',
}

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const existingArticle = useQuery(
    api.admin.getArticleById,
    id ? { id: id as Id<'articles'> } : 'skip'
  )
  const createArticle = useMutation(api.admin.createArticle)
  const updateArticle = useMutation(api.admin.updateArticle)
  const generateContent = useAction(api.aiGenerate.generateContent)

  const [form, setForm] = useState<FormData>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    if (existingArticle) {
      setForm({
        title: existingArticle.title,
        excerpt: existingArticle.excerpt,
        category: existingArticle.category,
        image: existingArticle.image,
        author: existingArticle.author,
        time: existingArticle.time,
        readTime: existingArticle.readTime,
        type: existingArticle.type,
        status: existingArticle.status ?? 'published',
        isLive: existingArticle.isLive ?? false,
        isBreaking: existingArticle.isBreaking ?? false,
        isExclusive: existingArticle.isExclusive ?? false,
        comments: existingArticle.comments,
        seoKeywords: existingArticle.seoKeywords ?? '',
      })
    }
  }, [existingArticle])

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaveMessage('')
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.author.trim()) {
      setSaveMessage('Please fill in title, excerpt, and author.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        image: form.image || `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${form.category}`,
        author: form.author,
        time: form.time || 'Just now',
        readTime: form.readTime || '5 min read',
        type: form.type,
        status: form.status,
        isLive: form.isLive || undefined,
        isBreaking: form.isBreaking || undefined,
        isExclusive: form.isExclusive || undefined,
        comments: form.comments,
        seoKeywords: form.seoKeywords || undefined,
      }

      if (isEditing && id) {
        await updateArticle({ id: id as Id<'articles'>, ...payload })
        setSaveMessage('Post updated successfully!')
      } else {
        await createArticle(payload)
        setSaveMessage('Post created successfully!')
        setTimeout(() => navigate('/admin/posts'), 1000)
      }
    } catch (err) {
      setSaveMessage(`Error: ${err instanceof Error ? err.message : 'Failed to save'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleAiGenerate = async (type: 'full' | 'headline' | 'body' | 'seo') => {
    const prompt = aiPrompt.trim() || form.title.trim()
    if (!prompt) {
      setSaveMessage('Enter a topic or title for AI generation.')
      return
    }

    setAiLoading(true)
    try {
      const result = await generateContent({ prompt, type })

      if (type === 'full' || type === 'headline') {
        if (result.headline) updateField('title', result.headline)
      }
      if (type === 'full' || type === 'body') {
        if (result.body) updateField('excerpt', result.body)
      }
      if (type === 'full' || type === 'seo') {
        if (result.seoKeywords) updateField('seoKeywords', result.seoKeywords)
      }

      setSaveMessage('AI content generated successfully!')
    } catch {
      setSaveMessage('AI generation failed. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  if (isEditing && existingArticle === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/posts')}
            className="p-2 text-gray-400 hover:text-frolick-dark hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-oswald font-bold text-2xl text-frolick-dark">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-oswald font-semibold transition-colors ${
              showAiPanel
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Write with AI
          </button>
        </div>
      </div>

      {/* AI Panel */}
      {showAiPanel && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-5 h-5 text-purple-600" />
            <h3 className="font-oswald font-bold text-lg text-purple-900">
              AI Content Generator
            </h3>
          </div>
          <p className="text-sm font-roboto text-purple-700 mb-4">
            Enter a topic or prompt and let AI draft your content. You can generate everything at once or individual parts.
          </p>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., New climate policy agreement reached at UN summit..."
              className="flex-1 px-4 py-2.5 bg-white border border-purple-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAiGenerate('full')}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-oswald font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {aiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Generate All
            </button>
            <button
              onClick={() => handleAiGenerate('headline')}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 bg-white text-purple-700 border border-purple-200 px-4 py-2 rounded-lg text-sm font-oswald font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <Type className="w-4 h-4" />
              Headline Only
            </button>
            <button
              onClick={() => handleAiGenerate('body')}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 bg-white text-purple-700 border border-purple-200 px-4 py-2 rounded-lg text-sm font-oswald font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              Body Only
            </button>
            <button
              onClick={() => handleAiGenerate('seo')}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 bg-white text-purple-700 border border-purple-200 px-4 py-2 rounded-lg text-sm font-oswald font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              <Tag className="w-4 h-4" />
              SEO Keywords
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter article title..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
            />
          </div>

          {/* Excerpt / Body */}
          <div>
            <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
              Excerpt / Body *
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="Write the article excerpt or body..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors resize-y"
            />
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
              SEO Keywords
            </label>
            <input
              type="text"
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
            />
            {form.seoKeywords && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.seoKeywords.split(',').map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-frolick-yellow/20 text-frolick-yellow-dark text-xs font-roboto px-2 py-0.5 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {kw.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Row: Category, Type, Author */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  updateField('type', e.target.value as 'hero' | 'featured' | 'latest')
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors capitalize"
              >
                {ARTICLE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Author *
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Row: Image URL, Time, Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Time Label
              </label>
              <input
                type="text"
                value={form.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="e.g., 2 hours ago"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-oswald font-bold text-gray-500 uppercase tracking-wider mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => updateField('readTime', e.target.value)}
                placeholder="e.g., 5 min read"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-roboto focus:outline-none focus:border-frolick-yellow focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-4">
            {([
              { field: 'isLive' as const, label: 'Live' },
              { field: 'isBreaking' as const, label: 'Breaking' },
              { field: 'isExclusive' as const, label: 'Exclusive' },
            ]).map(({ field, label }) => (
              <label
                key={field}
                className="inline-flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={form[field]}
                  onChange={(e) => updateField(field, e.target.checked)}
                  className="w-4 h-4 accent-frolick-yellow rounded"
                />
                <span className="text-sm font-roboto text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div>
              <p className="font-oswald font-bold text-sm text-frolick-dark">
                Publication Status
              </p>
              <p className="text-xs font-roboto text-gray-500 mt-0.5">
                {form.status === 'draft'
                  ? 'This post is saved as a draft and not visible to readers.'
                  : 'This post is published and visible to readers.'}
              </p>
            </div>
            <button
              onClick={() =>
                updateField(
                  'status',
                  form.status === 'draft' ? 'published' : 'draft'
                )
              }
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-oswald font-semibold transition-colors ${
                form.status === 'published'
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-frolick-yellow/20 text-frolick-yellow-dark hover:bg-frolick-yellow/30'
              }`}
            >
              {form.status === 'published' ? (
                <>
                  <Eye className="w-4 h-4" />
                  PUBLISHED
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" />
                  DRAFT
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save bar */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div>
            {saveMessage && (
              <p
                className={`text-sm font-roboto ${
                  saveMessage.startsWith('Error')
                    ? 'text-frolick-red'
                    : 'text-green-600'
                }`}
              >
                {saveMessage}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/posts')}
              className="px-5 py-2.5 rounded-lg text-sm font-oswald font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-frolick-yellow text-frolick-dark font-oswald font-bold px-6 py-2.5 rounded-lg hover:bg-frolick-amber transition-colors text-sm disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
