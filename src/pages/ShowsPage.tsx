import { useParams, Link } from 'react-router-dom'
import { Play, Clock, Calendar, Users, ArrowRight } from 'lucide-react'

interface Show {
  slug: string
  name: string
  description: string
  schedule: string
  host: string
  image: string
  episodes: { title: string; date: string; duration: string; description: string }[]
}

const shows: Show[] = [
  {
    slug: "morning-report",
    name: "Morning Report",
    description: "Start your day with the most important headlines, expert analysis, and live interviews. Morning Report delivers comprehensive coverage of overnight developments and sets the agenda for the day ahead with in-depth reporting from our global correspondents.",
    schedule: "Weekdays, 6:00 AM - 9:00 AM ET",
    host: "Alexandra Reynolds & Michael Torres",
    image: "/images/hero-news.jpg",
    episodes: [
      { title: "UN Water Crisis Emergency Session Recap", date: "March 27, 2026", duration: "48 min", description: "Full analysis of the UN emergency session and what it means for global water policy." },
      { title: "Federal Reserve Rate Decision: Markets React", date: "March 27, 2026", duration: "35 min", description: "Live coverage of the Fed's latest rate decision and expert economic analysis." },
      { title: "Infrastructure Bill: What's In It for You", date: "March 26, 2026", duration: "42 min", description: "Breaking down the $890 billion infrastructure package state by state." },
      { title: "AlphaFold 4: The AI Revolution in Medicine", date: "March 26, 2026", duration: "38 min", description: "Interview with Google DeepMind researchers on the breakthrough protein prediction system." },
    ],
  },
  {
    slug: "midday-briefing",
    name: "Midday Briefing",
    description: "Your essential midday update with the latest developments on the day's biggest stories. Quick, concise reporting paired with expert commentary keeps you informed during the busiest part of your day. Features market updates, political analysis, and breaking news coverage.",
    schedule: "Weekdays, 12:00 PM - 1:00 PM ET",
    host: "Sarah Kim",
    image: "/images/business.jpg",
    episodes: [
      { title: "Markets Surge on Central Bank Coordination", date: "March 27, 2026", duration: "28 min", description: "Live market analysis as global indices reach new highs." },
      { title: "Istanbul Peace Talks: Progress Report", date: "March 27, 2026", duration: "32 min", description: "Our diplomatic correspondent reports from the ground in Istanbul." },
      { title: "Cancer Vaccine Trial Results Explained", date: "March 26, 2026", duration: "25 min", description: "Medical experts break down the landmark mRNA vaccine study." },
      { title: "Super Bowl Three-Peat: The Dynasty Debate", date: "March 25, 2026", duration: "30 min", description: "Sports panel discusses where the Chiefs rank among all-time dynasties." },
    ],
  },
  {
    slug: "evening-roundup",
    name: "Evening Roundup",
    description: "End your day with a comprehensive summary of everything that matters. Evening Roundup provides the definitive recap of the day's news, featuring exclusive interviews, investigative segments, and forward-looking analysis of tomorrow's developing stories.",
    schedule: "Weekdays, 6:00 PM - 7:00 PM ET",
    host: "Nadia Petrova",
    image: "/images/world.jpg",
    episodes: [
      { title: "Day in Review: Water Crisis, Markets, and Moon Landing", date: "March 27, 2026", duration: "55 min", description: "Comprehensive coverage of the day's top three stories with expert panels." },
      { title: "Oscar Night Recap and Cultural Impact", date: "March 26, 2026", duration: "45 min", description: "Film critics and industry insiders discuss the historic 98th Academy Awards." },
      { title: "The Infrastructure Revolution Begins", date: "March 25, 2026", duration: "50 min", description: "How the new infrastructure bill will transform American communities." },
      { title: "AI Safety Summit: Global Leaders Weigh In", date: "March 24, 2026", duration: "48 min", description: "Coverage of the landmark international agreement on AI regulation." },
    ],
  },
  {
    slug: "weekend-review",
    name: "Weekend Review",
    description: "A deep-dive into the week's most significant stories with extended analysis, long-form interviews, and perspectives you won't find anywhere else. Weekend Review takes the time to explore the nuances behind the headlines and connect the dots between major developments.",
    schedule: "Saturdays, 10:00 AM - 12:00 PM ET",
    host: "Dr. James Chen & Rachel Adams",
    image: "/images/science.jpg",
    episodes: [
      { title: "Week in Review: March 21-27, 2026", date: "March 27, 2026", duration: "1hr 45min", description: "Extended analysis of the week's biggest stories with expert roundtable." },
      { title: "The Future of Space Exploration After Artemis IV", date: "March 20, 2026", duration: "1hr 30min", description: "NASA officials and space policy experts discuss the path to Mars." },
      { title: "Global Economic Outlook: Q2 2026 Preview", date: "March 13, 2026", duration: "1hr 50min", description: "Economists from leading institutions share their forecasts." },
      { title: "The mRNA Revolution: Beyond COVID Vaccines", date: "March 6, 2026", duration: "1hr 40min", description: "Scientists discuss the expanding applications of mRNA technology." },
    ],
  },
  {
    slug: "special-investigations",
    name: "Special Investigations",
    description: "Award-winning investigative journalism that holds power accountable. Our team of investigative reporters spends months uncovering stories of corruption, injustice, and systemic failures. Special Investigations has led to congressional hearings, policy changes, and criminal prosecutions.",
    schedule: "Thursdays, 9:00 PM - 10:00 PM ET",
    host: "Marcus Johnson",
    image: "/images/politics.jpg",
    episodes: [
      { title: "The Water Privatization Scandal", date: "March 27, 2026", duration: "58 min", description: "How multinational corporations are profiting from the global water crisis." },
      { title: "Dark Money in the Infrastructure Bill", date: "March 20, 2026", duration: "55 min", description: "Tracing the lobbying dollars that shaped the $890 billion legislation." },
      { title: "The AI Arms Race: Inside Tech's Secret Labs", date: "March 13, 2026", duration: "52 min", description: "Exclusive access to the facilities developing next-generation AI systems." },
      { title: "Pharmaceutical Pricing: The Hidden Markup", date: "March 6, 2026", duration: "57 min", description: "Investigating why life-saving drugs cost 10x more in the US than abroad." },
    ],
  },
  {
    slug: "frolick-debates",
    name: "Frolick Debates",
    description: "Spirited but respectful debate on the issues that divide us. Frolick Debates brings together voices from across the political and ideological spectrum for substantive discussions moderated with fairness and rigor. Our goal: more light, less heat.",
    schedule: "Fridays, 8:00 PM - 9:00 PM ET",
    host: "Robert Steinberg & Dr. Patricia Moore",
    image: "/images/entertainment.jpg",
    episodes: [
      { title: "Should Water Be a Human Right? The Global Debate", date: "March 27, 2026", duration: "52 min", description: "Experts debate the legal and ethical frameworks for water access." },
      { title: "AI Regulation: Innovation vs. Safety", date: "March 20, 2026", duration: "48 min", description: "Tech leaders and ethicists clash over the pace of AI development." },
      { title: "The Infrastructure Spending Question", date: "March 13, 2026", duration: "50 min", description: "Is $890 billion too much or not enough? Economists weigh in." },
      { title: "Space Exploration: Worth the Investment?", date: "March 6, 2026", duration: "47 min", description: "Debating NASA's budget priorities as Artemis program costs escalate." },
    ],
  },
]

export function ShowsListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">Shows</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-10 bg-frolick-red rounded-full" />
        <h1 className="font-oswald font-bold text-3xl md:text-4xl text-frolick-dark flex items-center gap-3">
          <Play className="w-8 h-8 text-frolick-yellow-dark" />
          FROLICK SHOWS
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shows.map((show) => (
          <Link key={show.slug} to={`/shows/${show.slug}`}>
            <div className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={show.image}
                  alt={show.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x200/1A1A1A/FFD700/png?text=SHOW' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-oswald font-bold text-xl text-white">{show.name}</h3>
                  <span className="text-frolick-yellow text-xs font-roboto">{show.schedule}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-roboto text-sm text-gray-600 line-clamp-2">{show.description}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 font-roboto">
                  <Users className="w-3 h-3" />
                  <span>{show.host}</span>
                </div>
                <span className="mt-3 text-frolick-yellow-dark font-oswald text-sm flex items-center gap-1 group-hover:text-frolick-dark transition-colors">
                  VIEW EPISODES <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ShowDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const show = shows.find(s => s.slug === slug)

  if (!show) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-oswald text-4xl text-gray-400 mb-4">Show Not Found</h1>
        <Link to="/" className="text-frolick-yellow-dark font-oswald hover:text-frolick-dark transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
        <Link to="/" className="hover:text-frolick-yellow-dark transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shows" className="hover:text-frolick-yellow-dark transition-colors">Shows</Link>
        <span>/</span>
        <span className="text-frolick-dark font-medium">{show.name}</span>
      </div>

      {/* Show Header */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src={show.image}
          alt={show.name}
          className="w-full h-64 md:h-80 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x400/1A1A1A/FFD700/png?text=SHOW' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="font-oswald font-bold text-3xl md:text-4xl text-white">{show.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-300 text-sm font-roboto">
            <span className="flex items-center gap-1 text-frolick-yellow"><Calendar className="w-4 h-4" />{show.schedule}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{show.host}</span>
          </div>
        </div>
      </div>

      {/* Show Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="font-oswald font-bold text-xl text-frolick-dark mb-3">ABOUT THE SHOW</h2>
        <p className="font-roboto text-gray-700 leading-relaxed">{show.description}</p>
      </div>

      {/* Episodes */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
        <h2 className="font-oswald font-bold text-2xl text-frolick-dark">RECENT EPISODES</h2>
      </div>

      <div className="space-y-4">
        {show.episodes.map((episode, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-frolick-yellow/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-frolick-yellow transition-colors">
                <Play className="w-5 h-5 text-frolick-yellow-dark group-hover:text-frolick-dark transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-oswald font-semibold text-lg text-frolick-dark group-hover:text-frolick-yellow-dark transition-colors">
                  {episode.title}
                </h3>
                <p className="font-roboto text-sm text-gray-600 mt-1">{episode.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-roboto">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{episode.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{episode.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Shows */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="font-oswald font-bold text-xl text-frolick-dark mb-4">MORE SHOWS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shows.filter(s => s.slug !== show.slug).slice(0, 3).map(s => (
            <Link key={s.slug} to={`/shows/${s.slug}`} className="group">
              <div className="relative rounded-lg overflow-hidden h-32">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x150/1A1A1A/FFD700/png?text=SHOW' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="font-oswald font-bold text-white text-sm">{s.name}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
