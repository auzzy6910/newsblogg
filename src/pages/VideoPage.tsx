import { Link } from 'react-router-dom'
import { Play, Eye, Clock } from 'lucide-react'
import { videoItems } from '../data/newsData'
import type { VideoItem } from '../data/newsData'

const allVideos: VideoItem[] = [
  ...videoItems,
  { title: "Federal Reserve Press Conference: Chair Powell Addresses Rate Decision", duration: "22:15", views: "1.5M", image: "/images/politics.jpg" },
  { title: "Exclusive Interview: NASA Astronauts Describe Lunar Surface Experience", duration: "16:40", views: "3.8M", image: "/images/science.jpg" },
  { title: "Global Water Crisis Documentary: The Fight for Earth's Most Precious Resource", duration: "45:12", views: "4.2M", image: "/images/hero-news.jpg" },
  { title: "Cancer Vaccine Breakthrough: Scientists Explain How mRNA Technology Works", duration: "11:28", views: "2.6M", image: "/images/health.jpg" },
  { title: "Oscar Winner Alejandra Gonzalez: From Mexico City to Hollywood Glory", duration: "13:55", views: "1.9M", image: "/images/entertainment.jpg" },
  { title: "Infrastructure Bill Breakdown: What It Means for Your State", duration: "8:32", views: "980K", image: "/images/business.jpg" },
  { title: "Peace Talks in Istanbul: Diplomatic Correspondent Reports from the Ground", duration: "10:18", views: "1.3M", image: "/images/world.jpg" },
  { title: "Championship Parade: Fans Celebrate Historic Three-Peat Victory", duration: "7:45", views: "6.1M", image: "/images/sports.jpg" },
]

export default function VideoPage() {
  return (
    <div className="bg-frolick-darker min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-roboto text-gray-500 mb-6">
          <Link to="/" className="hover:text-frolick-yellow transition-colors text-gray-400">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">Video</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-10 bg-frolick-red rounded-full" />
          <h1 className="font-oswald font-bold text-3xl md:text-4xl text-white flex items-center gap-3">
            <Play className="w-8 h-8 text-frolick-yellow" />
            FROLICK VIDEO
          </h1>
        </div>

        {/* Featured Video */}
        <div className="mb-10">
          <div className="group cursor-pointer relative rounded-xl overflow-hidden aspect-video max-h-[500px]">
            <img
              src={allVideos[0].image}
              alt={allVideos[0].title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/1A1A1A/FFD700/png?text=VIDEO' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-frolick-yellow/90 rounded-full flex items-center justify-center group-hover:bg-frolick-yellow group-hover:scale-110 transition-all shadow-2xl">
                <Play className="w-8 h-8 text-frolick-dark ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="font-oswald font-bold text-2xl md:text-3xl text-white leading-tight">
                {allVideos[0].title}
              </h2>
              <div className="flex items-center gap-4 mt-3 text-gray-300 text-sm font-roboto">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{allVideos[0].duration}</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{allVideos[0].views} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Videos Grid */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-frolick-yellow rounded-full" />
          <h2 className="font-oswald font-bold text-xl text-white">ALL VIDEOS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVideos.map((video, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden bg-frolick-charcoal aspect-video">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/1A1A1A/FFD700/png?text=VIDEO' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-frolick-yellow/90 rounded-full flex items-center justify-center group-hover:bg-frolick-yellow group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-5 h-5 text-frolick-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-roboto px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-roboto font-medium text-white text-sm mt-2 leading-snug line-clamp-2 group-hover:text-frolick-yellow transition-colors">
                {video.title}
              </h4>
              <span className="text-xs text-gray-500 font-roboto flex items-center gap-1 mt-1">
                <Eye className="w-3 h-3" />{video.views} views
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
