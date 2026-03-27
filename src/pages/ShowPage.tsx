import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Clock, Calendar } from 'lucide-react'

const showsData: Record<string, { title: string; description: string; schedule: string; host: string; synopsis: string }> = {
  'morning-report': {
    title: 'Morning Report',
    description: 'Start your day informed with comprehensive coverage of overnight developments, market previews, and the stories shaping the day ahead.',
    schedule: 'Weekdays, 6:00 AM - 9:00 AM ET',
    host: 'Alexandra Reynolds',
    synopsis: 'Morning Report delivers the essential news briefing every weekday morning. Our team of correspondents brings you live reports from around the globe, expert analysis of breaking developments, and interviews with newsmakers. From Wall Street opening previews to Washington policy updates, Morning Report ensures you never miss a beat.',
  },
  'midday-briefing': {
    title: 'Midday Briefing',
    description: 'A focused half-hour update on the day\'s biggest developments, breaking news, and market movements.',
    schedule: 'Weekdays, 12:00 PM - 12:30 PM ET',
    host: 'Marcus Chen',
    synopsis: 'Midday Briefing cuts through the noise to bring you the most important stories of the day so far. With concise reporting and sharp analysis, this fast-paced program keeps busy professionals informed during their lunch break. Features include market updates, political developments, and technology news.',
  },
  'evening-roundup': {
    title: 'Evening Roundup',
    description: 'The definitive end-of-day news program covering the day\'s most important stories with in-depth analysis and expert commentary.',
    schedule: 'Weekdays, 7:00 PM - 8:00 PM ET',
    host: 'Sarah Mitchell',
    synopsis: 'Evening Roundup is Frolick\'s flagship evening program. Each night, our anchor and team of analysts break down the day\'s top stories, provide context you won\'t find elsewhere, and look ahead to tomorrow\'s developments. The program features exclusive interviews, investigative segments, and our popular "Fact Check" segment.',
  },
  'weekend-review': {
    title: 'Weekend Review',
    description: 'A comprehensive look back at the week\'s biggest stories with panel discussions, long-form interviews, and feature reports.',
    schedule: 'Saturdays, 10:00 AM - 12:00 PM ET',
    host: 'David Park',
    synopsis: 'Weekend Review takes a step back from the daily news cycle to provide deeper perspective on the week\'s most significant stories. With roundtable discussions featuring top journalists and policy experts, long-form investigative pieces, and cultural commentary, Weekend Review is essential viewing for the engaged citizen.',
  },
  'special-investigations': {
    title: 'Special Investigations',
    description: 'Award-winning investigative journalism tackling corruption, injustice, and the stories that demand accountability.',
    schedule: 'Sundays, 9:00 PM - 10:00 PM ET',
    host: 'Investigative Team',
    synopsis: 'Special Investigations is Frolick\'s premier investigative journalism program. Our dedicated team of reporters spends months on each story, uncovering fraud, holding the powerful accountable, and giving voice to the voiceless. Past investigations have led to policy changes, criminal prosecutions, and national conversations. Winner of multiple journalism awards.',
  },
  'frolick-debates': {
    title: 'Frolick Debates',
    description: 'Spirited, respectful debates on the most pressing issues of our time, featuring diverse perspectives and rigorous fact-checking.',
    schedule: 'Fridays, 8:00 PM - 9:00 PM ET',
    host: 'Rotating Moderators',
    synopsis: 'Frolick Debates brings together thought leaders, politicians, academics, and advocates for structured debates on the issues that matter most. Unlike shouting-match formats, Frolick Debates emphasizes substance, evidence, and mutual respect. Each episode tackles a single topic in depth, with real-time fact-checking and audience participation.',
  },
}

export default function ShowPage() {
  const { slug } = useParams<{ slug: string }>()
  const show = slug ? showsData[slug] : undefined

  if (!show) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="text-center py-16">
          <h1 className="font-oswald font-bold text-3xl text-frolick-dark mb-4">Show Not Found</h1>
          <p className="text-gray-500 font-roboto">The show you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-frolick-yellow-dark hover:text-frolick-yellow font-oswald font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-frolick-dark p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-8 h-8 text-frolick-yellow" />
            <span className="text-frolick-yellow font-oswald text-sm tracking-widest uppercase">Frolick Shows</span>
          </div>
          <h1 className="font-oswald font-bold text-3xl md:text-5xl text-white mb-4">{show.title}</h1>
          <p className="text-gray-300 font-roboto text-lg max-w-2xl">{show.description}</p>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-400 font-roboto text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-frolick-yellow" />
              {show.schedule}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-frolick-yellow" />
              Host: {show.host}
            </span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="font-oswald font-bold text-xl text-frolick-dark mb-4">About the Show</h2>
          <p className="text-gray-600 font-roboto leading-relaxed">{show.synopsis}</p>

          <div className="mt-8 p-6 bg-frolick-yellow/10 rounded-lg border border-frolick-yellow/20">
            <h3 className="font-oswald font-bold text-frolick-dark mb-2">Watch Live</h3>
            <p className="text-gray-600 font-roboto text-sm mb-4">
              Catch {show.title} live on Frolick or stream it anytime on our app.
            </p>
            <button className="bg-frolick-yellow text-frolick-dark font-oswald font-bold px-6 py-2.5 rounded hover:bg-frolick-amber transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" /> WATCH NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
