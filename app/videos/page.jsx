import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock data for videos
const videos = [
  {
    id: "1",
    title: "Amazing Web Development Techniques for 2025",
    description: "Learn the latest web development techniques that will revolutionize how you build applications.",
    date: "May 15, 2025",
    category: "Development",
    views: 12453,
    likes: 1243,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Mastering CSS Grid Layout",
    description: "A comprehensive guide to using CSS Grid for modern web layouts.",
    date: "May 10, 2025",
    category: "CSS",
    views: 8765,
    likes: 932,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "React Server Components Explained",
    description: "Understanding the benefits and implementation of React Server Components.",
    date: "May 5, 2025",
    category: "React",
    views: 9876,
    likes: 876,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Building Accessible Web Forms",
    description: "Learn how to create forms that are accessible to all users.",
    date: "April 28, 2025",
    category: "Accessibility",
    views: 6543,
    likes: 543,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "JavaScript Performance Optimization",
    description: "Techniques to make your JavaScript code run faster and more efficiently.",
    date: "April 20, 2025",
    category: "JavaScript",
    views: 7654,
    likes: 654,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Introduction to Web Animation APIs",
    description: "Explore the various APIs available for creating web animations.",
    date: "April 15, 2025",
    category: "Animation",
    views: 5432,
    likes: 432,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

export const metadata = {
  title: "Videos | Modern Web App",
  description: "Watch our latest videos on web development, design, and technology.",
}

export default function VideosPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Videos</h1>
          <p className="mt-4 text-slate-500 md:text-xl dark:text-slate-400 max-w-[700px]">
            Watch our latest videos on web development, design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                  <iframe
                    className="w-full h-full absolute"
                    src={video.embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{video.category}</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{video.date}</span>
                  </div>
                  <Link href={`/videos/${video.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:underline">{video.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{video.description}</p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{video.views.toLocaleString()} views</span>
                    <span className="mx-2">•</span>
                    <span>{video.likes.toLocaleString()} likes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
