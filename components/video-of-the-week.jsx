"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Eye, ThumbsUp, Share2, PlayCircle } from "lucide-react"
import AnimatedHeading from "@/components/animated-heading"
import Link from "next/link"

const featuredVideo = {
  id: 1,
  title: "The Future of Sustainable Fashion: A Deep Dive into Eco-Friendly Materials",
  description:
    "Join us as we explore the latest innovations in sustainable fashion, from lab-grown materials to circular design principles that are reshaping the industry.",
  thumbnail: "/blog/blog-inside-post.jpg",
  duration: "12:34",
  views: "15.2K",
  likes: "1.2K",
  publishedDate: "3 days ago",
  category: "Fashion",
  author: {
    name: "Emma Davis",
    avatar: "/team/team-4.jpg",
  },
}

const relatedVideos = [
  {
    id: 2,
    title: "Tech Gadgets That Will Change Your Life in 2024",
    thumbnail: "/blog/blog-6.jpg",
    duration: "8:45",
    views: "8.7K",
    category: "Technology",
  },
  {
    id: 3,
    title: "Hidden Travel Gems in Southeast Asia",
    thumbnail: "/blog/blog-recent-4.jpg",
    duration: "15:22",
    views: "12.1K",
    category: "Travel",
  },
  {
    id: 4,
    title: "Minimalist Living: Transform Your Space",
    thumbnail: "/blog/blog-recent-5.jpg",
    duration: "10:18",
    views: "9.3K",
    category: "Lifestyle",
  },
]

export default function VideoOfTheWeek() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // In a real implementation, this would trigger video playback
  }

  const handleShare = () => {
    // In a real implementation, this would open share options
    navigator.share?.({
      title: featuredVideo.title,
      text: featuredVideo.description,
      url: window.location.href,
    })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <AnimatedHeading
          title="Video of the Week"
          subtitle="Don't miss our featured video content"
          gradient={true}
          centered={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="relative h-64 md:h-80 bg-gray-900 flex items-center justify-center overflow-hidden">
                    {!isPlaying ? (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${featuredVideo.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePlayVideo}
                          className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
                        >
                          <Play className="h-12 w-12 text-white ml-1" fill="currentColor" />
                        </motion.button>
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {featuredVideo.duration}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <p className="text-white">Video Player Would Load Here</p>
                      </div>
                    )}
                  </div>

                  <Badge className="absolute top-4 left-4">{featuredVideo.category}</Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl text-blue md:text-2xl font-bold mb-3 leading-tight">{featuredVideo.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{featuredVideo.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredVideo.views} views
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {featuredVideo.likes}
                      </div>
                      <span>{featuredVideo.publishedDate}</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${featuredVideo.author.avatar})` }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{featuredVideo.author.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Content Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Related Videos */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">More Videos</h3>
              <div className="space-y-4">
                {relatedVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${video.thumbnail})` }}
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" fill="currentColor" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 text-xs rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-3 flex-1">
                          <h4 className="font-medium text-blue-500 text-sm mb-1 line-clamp-2">{video.title}</h4>
                          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <p>{video.views} views</p>
                            <Badge variant="secondary" className="text-xs">
                              {video.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Link href="/videos" className="flex items-center justify-center space-x-2">
                    <PlayCircle className="h-4 w-4" />
                    <span className="hidden sm:inline"> View All Videos </span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
