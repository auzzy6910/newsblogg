import { useState, useCallback, useRef } from 'react'
import { useQuery, useMutation, useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import {
  LogOut,
  Plus,
  Loader2,
  Sparkles,
  Save,
  ArrowLeft,
  Newspaper,
  BarChart3,
  Eye,
  Trash2,
  Edit3,
  X,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  Upload,
  ImageIcon,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const CATEGORIES = [
  'WORLD', 'POLITICS', 'BUSINESS', 'TECHNOLOGY',
  'SPORTS', 'ENTERTAINMENT', 'HEALTH', 'SCIENCE',
]

const ARTICLE_TYPES: Array<'hero' | 'featured' | 'latest'> = ['hero', 'featured', 'latest']

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    ['link', 'image'],
    ['clean'],
  ],
}

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'blockquote', 'link', 'image',
]

interface AdminDashboardPageProps {
  adminEmail: string
  onLogout: () => void
}

interface ArticleForm {
  title: string
  excerpt: string
  body: string
  category: string
  image: string
  author: string
  readTime: string
  type: 'hero' | 'featured' | 'latest'
  isLive: boolean
  isBreaking: boolean
  isExclusive: boolean
  seoTags: string[]
}

const emptyForm: ArticleForm = {
  title: '',
  excerpt: '',
  body: '',
  category: 'WORLD',
  image: '',
  author: '',
  readTime: '5 min read',
  type: 'latest',
  isLive: false,
  isBreaking: false,
  isExclusive: false,
  seoTags: [],
}

type DashboardView = 'overview' | 'create' | 'manage'

export default function AdminDashboardPage({ adminEmail, onLogout }: AdminDashboardPageProps) {
  const [view, setView] = useState<DashboardView>('overview')
  const [form, setForm] = useState<ArticleForm>({ ...emptyForm })
  const [aiTopic, setAiTopic] = useState('')
  const [aiOutline, setAiOutline] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [seoTagInput, setSeoTagInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const articles = useQuery(api.articles.getAll)
  const createArticle = useMutation(api.articles.create)
  const updateArticle = useMutation(api.articles.update)
  const removeArticle = useMutation(api.articles.remove)
  const generateArticle = useAction(api.aiGenerate.generateArticle)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) {
      showNotification('error', 'Please enter a topic for AI generation')
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateArticle({
        topic: aiTopic,
        outline: aiOutline || undefined,
      })

      if (result.success && result.data) {
        setForm((prev) => ({
          ...prev,
          title: result.data.headline,
          excerpt: result.data.excerpt,
          body: result.data.body,
          category: result.data.category,
          readTime: result.data.suggestedReadTime,
          seoTags: result.data.seoTags,
        }))
        showNotification('success', 'AI content generated! Review and edit before saving.')
      } else {
        const errorCode = (result as { errorCode?: string }).errorCode
        if (errorCode === 'QUOTA_EXCEEDED') {
          showNotification('error', 'OpenAI quota exceeded — please add credits at platform.openai.com or update your API key in Convex.')
        } else if (errorCode === 'INVALID_API_KEY') {
          showNotification('error', 'Invalid OpenAI API key — please update OPENAI_API_KEY in your Convex dashboard.')
        } else if (errorCode === 'SERVICE_UNAVAILABLE') {
          showNotification('error', 'OpenAI is temporarily unavailable — please try again in a few minutes.')
        } else {
          showNotification('error', result.error || 'AI generation failed')
        }
      }
    } catch {
      showNotification('error', 'Failed to connect to AI service')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.category || !form.author) {
      showNotification('error', 'Please fill in all required fields (title, excerpt, category, author)')
      return
    }

    setIsSaving(true)
    try {
      if (editingId) {
        await updateArticle({
          id: editingId as Id<"articles">,
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          image: form.image || `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${form.category}`,
          author: form.author,
          time: 'Just now',
          readTime: form.readTime,
          type: form.type,
          isLive: form.isLive,
          isBreaking: form.isBreaking,
          isExclusive: form.isExclusive,
          comments: 0,
        })
        showNotification('success', 'Article updated successfully!')
        setEditingId(null)
      } else {
        await createArticle({
          title: form.title,
          excerpt: form.excerpt,
          category: form.category,
          image: form.image || `https://placehold.co/800x500/1A1A1A/FFD700/png?text=${form.category}`,
          author: form.author,
          time: 'Just now',
          readTime: form.readTime,
          type: form.type,
          isLive: form.isLive,
          isBreaking: form.isBreaking,
          isExclusive: form.isExclusive,
          comments: 0,
        })
        showNotification('success', 'Article published successfully!')
      }
      setForm({ ...emptyForm })
      setAiTopic('')
      setAiOutline('')
      setView('manage')
    } catch {
      showNotification('error', 'Failed to save article')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      await removeArticle({ id: id as Id<"articles"> })
      showNotification('success', 'Article deleted')
    } catch {
      showNotification('error', 'Failed to delete article')
    }
  }

  const handleEdit = (article: NonNullable<typeof articles>[number]) => {
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      body: '',
      category: article.category,
      image: article.image,
      author: article.author,
      readTime: article.readTime,
      type: article.type,
      isLive: article.isLive || false,
      isBreaking: article.isBreaking || false,
      isExclusive: article.isExclusive || false,
      seoTags: [],
    })
    setEditingId(article._id)
    setView('create')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select a valid image file (PNG, JPG, GIF, WebP)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    try {
      const uploadUrl = await generateUploadUrl()
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      const { storageId } = await result.json()

      // Construct the Convex storage serving URL
      const deploymentUrl = (import.meta.env.VITE_CONVEX_URL || '').replace('wss://', 'https://')
      const storageUrl = `${deploymentUrl}/api/storage/${storageId}`

      setForm((prev) => ({ ...prev, image: storageUrl }))
      showNotification('success', 'Image uploaded successfully!')
    } catch {
      showNotification('error', 'Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
      if (imageInputRef.current) {
        imageInputRef.current.value = ''
      }
    }
  }

  const addSeoTag = () => {
    const tag = seoTagInput.trim()
    if (tag && !form.seoTags.includes(tag)) {
      setForm((prev) => ({ ...prev, seoTags: [...prev.seoTags, tag] }))
      setSeoTagInput('')
    }
  }

  const removeSeoTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      seoTags: prev.seoTags.filter((t) => t !== tag),
    }))
  }

  const articleStats = {
    total: articles?.length || 0,
    hero: articles?.filter((a) => a.type === 'hero').length || 0,
    featured: articles?.filter((a) => a.type === 'featured').length || 0,
    latest: articles?.filter((a) => a.type === 'latest').length || 0,
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Dashboard - Frolick News</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-roboto transition-all ${
            notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-frolick-red text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {notification.message}
          </div>
        )}

        {/* Admin Header */}
        <header className="bg-frolick-dark border-b border-frolick-charcoal sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-frolick-yellow text-frolick-dark font-oswald font-bold text-xl px-2 py-0.5 rounded">
                F
              </div>
              <div>
                <h1 className="font-oswald font-bold text-lg text-white">FROLICK ADMIN</h1>
                <p className="text-frolick-gray-light text-xs font-roboto">{adminEmail}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-frolick-gray-light hover:text-frolick-yellow font-roboto text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Nav tabs */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-0">
              {([
                { key: 'overview' as const, label: 'Overview', icon: BarChart3 },
                { key: 'create' as const, label: editingId ? 'Edit Post' : 'Create Post', icon: Plus },
                { key: 'manage' as const, label: 'Manage Posts', icon: Newspaper },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setView(tab.key)
                    if (tab.key !== 'create') {
                      setEditingId(null)
                      setForm({ ...emptyForm })
                    }
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 font-oswald text-sm font-medium tracking-wide transition-colors ${
                    view === tab.key
                      ? 'text-frolick-yellow border-b-2 border-frolick-yellow'
                      : 'text-white hover:text-frolick-yellow hover:bg-frolick-charcoal'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Overview */}
          {view === 'overview' && (
            <div>
              <h2 className="font-oswald font-bold text-2xl text-frolick-dark mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Articles', value: articleStats.total, color: 'bg-frolick-dark' },
                  { label: 'Hero Articles', value: articleStats.hero, color: 'bg-frolick-red' },
                  { label: 'Featured', value: articleStats.featured, color: 'bg-frolick-yellow text-frolick-dark' },
                  { label: 'Latest', value: articleStats.latest, color: 'bg-blue-600' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <p className="text-gray-500 font-roboto text-sm">{stat.label}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-oswald font-bold text-3xl text-frolick-dark">{stat.value}</span>
                      <span className={`${stat.color} text-white text-xs font-oswald font-bold px-2 py-1 rounded`}>
                        {stat.label.split(' ').pop()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-oswald font-semibold text-lg text-frolick-dark mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-frolick-yellow" />
                    Quick AI Article
                  </h3>
                  <p className="text-gray-600 font-roboto text-sm mb-4">
                    Generate a professional news article using AI. Enter a topic and let our AI draft the content for you.
                  </p>
                  <button
                    onClick={() => setView('create')}
                    className="bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded hover:bg-frolick-amber transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Post
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-oswald font-semibold text-lg text-frolick-dark mb-4 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-frolick-yellow" />
                    Recent Articles
                  </h3>
                  <div className="space-y-3">
                    {articles?.slice(0, 4).map((article) => (
                      <div key={article._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="min-w-0 flex-1 mr-3">
                          <p className="font-roboto text-sm text-frolick-dark truncate">{article.title}</p>
                          <p className="text-xs text-gray-400 font-roboto">{article.category} · {article.time}</p>
                        </div>
                        <span className="text-xs font-oswald bg-gray-100 text-gray-600 px-2 py-0.5 rounded shrink-0">
                          {article.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create / Edit Post */}
          {view === 'create' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setView('overview'); setEditingId(null); setForm({ ...emptyForm }); }}
                    className="text-gray-500 hover:text-frolick-dark transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="font-oswald font-bold text-2xl text-frolick-dark">
                    {editingId ? 'Edit Article' : 'Create New Article'}
                  </h2>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded hover:bg-frolick-amber transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editingId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area */}
                <div className="lg:col-span-2 space-y-5">
                  {/* AI Generator */}
                  <div className="bg-gradient-to-r from-frolick-dark to-frolick-charcoal rounded-lg p-5 shadow-sm">
                    <h3 className="font-oswald font-semibold text-lg text-frolick-yellow mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      AI Drafting Assistant
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-frolick-gray-light text-xs font-roboto mb-1">Topic *</label>
                        <input
                          type="text"
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder="e.g., Global climate summit 2026 outcomes"
                          className="w-full bg-frolick-darker border border-frolick-gray/30 rounded px-4 py-2.5 text-white font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-frolick-gray-light text-xs font-roboto mb-1">Outline / Details (optional)</label>
                        <textarea
                          value={aiOutline}
                          onChange={(e) => setAiOutline(e.target.value)}
                          placeholder="Key points to cover, specific angles, sources to mention..."
                          rows={3}
                          className="w-full bg-frolick-darker border border-frolick-gray/30 rounded px-4 py-2.5 text-white font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors resize-none"
                        />
                      </div>
                      <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating || !aiTopic.trim()}
                        className="bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded hover:bg-frolick-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Article
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <label className="block text-frolick-dark font-oswald font-semibold text-sm mb-1.5">
                      Headline *
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a compelling headline..."
                      className="w-full border border-gray-200 rounded px-4 py-2.5 font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors"
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <label className="block text-frolick-dark font-oswald font-semibold text-sm mb-1.5">
                      Excerpt / Summary *
                    </label>
                    <textarea
                      value={form.excerpt}
                      onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="A brief summary for article previews..."
                      rows={3}
                      className="w-full border border-gray-200 rounded px-4 py-2.5 font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors resize-none"
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <label className="block text-frolick-dark font-oswald font-semibold text-sm mb-1.5 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Article Body
                    </label>
                    <div className="prose-editor">
                      <ReactQuill
                        theme="snow"
                        value={form.body}
                        onChange={(value) => setForm((prev) => ({ ...prev, body: value }))}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your article content here or use the AI assistant above..."
                      />
                    </div>
                  </div>

                  {/* SEO Tags */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <label className="block text-frolick-dark font-oswald font-semibold text-sm mb-1.5 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      SEO Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={seoTagInput}
                        onChange={(e) => setSeoTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSeoTag(); } }}
                        placeholder="Add a tag and press Enter..."
                        className="flex-1 border border-gray-200 rounded px-4 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow transition-colors"
                      />
                      <button
                        onClick={addSeoTag}
                        className="bg-frolick-dark text-white px-4 py-2 rounded font-roboto text-sm hover:bg-frolick-charcoal transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {form.seoTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {form.seoTags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 bg-frolick-yellow/20 text-frolick-dark text-xs font-roboto px-2.5 py-1 rounded-full border border-frolick-yellow/30"
                          >
                            {tag}
                            <button onClick={() => removeSeoTag(tag)} className="hover:text-frolick-red transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  {/* Article Settings */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <h3 className="font-oswald font-semibold text-sm text-frolick-dark mb-4">Article Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 text-xs font-roboto mb-1">Category *</label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                          className="w-full border border-gray-200 rounded px-3 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-xs font-roboto mb-1">Article Type</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as 'hero' | 'featured' | 'latest' }))}
                          className="w-full border border-gray-200 rounded px-3 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow"
                        >
                          {ARTICLE_TYPES.map((type) => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-xs font-roboto mb-1">Author *</label>
                        <input
                          type="text"
                          value={form.author}
                          onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                          placeholder="Author name"
                          className="w-full border border-gray-200 rounded px-3 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-xs font-roboto mb-1">Read Time</label>
                        <input
                          type="text"
                          value={form.readTime}
                          onChange={(e) => setForm((prev) => ({ ...prev, readTime: e.target.value }))}
                          placeholder="e.g., 5 min read"
                          className="w-full border border-gray-200 rounded px-3 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-xs font-roboto mb-1">Preview Image</label>
                        <div className="space-y-2">
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg px-3 py-3 text-sm font-roboto text-gray-500 hover:border-frolick-yellow hover:text-frolick-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                Upload Image
                              </>
                            )}
                          </button>
                          <div className="relative">
                            <input
                              type="text"
                              value={form.image}
                              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                              placeholder="Or paste an image URL..."
                              className="w-full border border-gray-200 rounded px-3 py-2 font-roboto text-sm focus:outline-none focus:border-frolick-yellow"
                            />
                            {form.image && (
                              <button
                                type="button"
                                onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-frolick-red transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          {form.image && (
                            <div className="relative border border-gray-200 rounded overflow-hidden">
                              <img
                                src={form.image}
                                alt="Preview"
                                className="w-full h-24 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                  const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
                                  if (fallback) fallback.style.display = 'flex'
                                }}
                              />
                              <div className="hidden items-center justify-center h-24 bg-gray-50 text-gray-400 text-xs font-roboto gap-1">
                                <ImageIcon className="w-4 h-4" />
                                Failed to load image
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flags */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <h3 className="font-oswald font-semibold text-sm text-frolick-dark mb-4">Article Flags</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'isLive' as const, label: 'Live Coverage', color: 'bg-frolick-red' },
                        { key: 'isBreaking' as const, label: 'Breaking News', color: 'bg-frolick-red' },
                        { key: 'isExclusive' as const, label: 'Exclusive', color: 'bg-frolick-dark' },
                      ].map((flag) => (
                        <label key={flag.key} className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-roboto text-gray-700">{flag.label}</span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={form[flag.key]}
                              onChange={(e) => setForm((prev) => ({ ...prev, [flag.key]: e.target.checked }))}
                              className="sr-only"
                            />
                            <div className={`w-10 h-5 rounded-full transition-colors ${form[flag.key] ? flag.color : 'bg-gray-300'}`}>
                              <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${form[flag.key] ? 'translate-x-5.5 ml-[22px]' : 'translate-x-0.5 ml-[2px]'}`} />
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  {form.title && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                      <h3 className="font-oswald font-semibold text-sm text-frolick-dark mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </h3>
                      <div className="border border-gray-100 rounded overflow-hidden">
                        <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-400">
                          {form.image ? (
                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-roboto">Image Preview</span>
                          )}
                        </div>
                        <div className="p-3">
                          <span className="text-xs font-oswald font-bold text-frolick-yellow-dark bg-frolick-yellow/20 px-1.5 py-0.5 rounded">
                            {form.category}
                          </span>
                          <h4 className="font-oswald font-semibold text-sm text-frolick-dark mt-1 leading-tight">
                            {form.title}
                          </h4>
                          <p className="text-xs text-gray-500 font-roboto mt-1 line-clamp-2">
                            {form.excerpt}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 font-roboto">
                            <span>{form.author || 'Author'}</span>
                            <span>·</span>
                            <span>{form.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Manage Posts */}
          {view === 'manage' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-oswald font-bold text-2xl text-frolick-dark">Manage Articles</h2>
                <button
                  onClick={() => { setView('create'); setEditingId(null); setForm({ ...emptyForm }); }}
                  className="bg-frolick-yellow text-frolick-dark font-oswald font-semibold px-5 py-2.5 rounded hover:bg-frolick-amber transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Article
                </button>
              </div>

              {!articles ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-frolick-yellow animate-spin" />
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                  <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-roboto">No articles yet. Create your first one!</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-5 py-3 font-oswald text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="text-left px-5 py-3 font-oswald text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="text-left px-5 py-3 font-oswald text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="text-left px-5 py-3 font-oswald text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                          <th className="text-right px-5 py-3 font-oswald text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map((article) => (
                          <tr key={article._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-3">
                              <p className="font-roboto text-sm text-frolick-dark line-clamp-1 max-w-xs">{article.title}</p>
                              <p className="text-xs text-gray-400 font-roboto mt-0.5">{article.time}</p>
                            </td>
                            <td className="px-5 py-3">
                              <span className="bg-frolick-yellow/20 text-frolick-dark text-xs font-oswald font-bold px-2 py-0.5 rounded">
                                {article.category}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <span className="text-xs font-oswald bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                                {article.type}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-sm text-gray-600 font-roboto">{article.author}</td>
                            <td className="px-5 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(article)}
                                  className="text-gray-400 hover:text-frolick-yellow-dark transition-colors p-1"
                                  title="Edit"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(article._id)}
                                  className="text-gray-400 hover:text-frolick-red transition-colors p-1"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
