import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for videos
const videos = [
  {
    id: "1",
    title: "Amazing Web Development Techniques for 2025",
    description:
      "Learn the latest web development techniques that will revolutionize how you build applications. In this comprehensive tutorial, we explore cutting-edge approaches to web development that are gaining traction in 2025. From advanced state management to innovative rendering techniques, this video covers everything you need to know to stay ahead of the curve.",
    date: "May 15, 2025",
    author: "Jane Smith",
    category: "Development",
    views: 12453,
    likes: 1243,
    comments: 87,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Mastering CSS Grid Layout",
    description:
      "A comprehensive guide to using CSS Grid for modern web layouts. This tutorial takes you from the basics to advanced techniques, showing you how to create complex, responsive layouts with minimal code. Learn how to leverage the full power of CSS Grid to solve real-world layout challenges.",
    date: "May 10, 2025",
    author: "Alex Johnson",
    category: "CSS",
    views: 8765,
    likes: 932,
    comments: 65,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "React Server Components Explained",
    description:
      "Understanding the benefits and implementation of React Server Components. This video breaks down how Server Components work, when to use them, and how they can improve your application's performance and user experience. We'll walk through practical examples and best practices for integrating Server Components into your React applications.",
    date: "May 5, 2025",
    author: "Sam Taylor",
    category: "React",
    views: 9876,
    likes: 876,
    comments: 72,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Building Accessible Web Forms",
    description:
      "Learn how to create forms that are accessible to all users. This tutorial covers ARIA attributes, keyboard navigation, error handling, and other essential techniques for building inclusive web forms. By following these guidelines, you'll ensure your forms can be used by everyone, regardless of their abilities or assistive technologies.",
    date: "April 28, 2025",
    author: "Jamie Wilson",
    category: "Accessibility",
    views: 6543,
    likes: 543,
    comments: 41,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "JavaScript Performance Optimization",
    description:
      "Techniques to make your JavaScript code run faster and more efficiently. This video explores performance bottlenecks, memory management, rendering optimization, and advanced techniques for writing high-performance JavaScript. Learn how to identify and fix performance issues in your web applications.",
    date: "April 20, 2025",
    author: "Chris Davis",
    category: "JavaScript",
    views: 7654,
    likes: 654,
    comments: 53,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Introduction to Web Animation APIs",
    description:
      "Explore the various APIs available for creating web animations. This tutorial covers the Web Animations API, CSS animations, SVG animations, and Canvas-based animations. Learn when to use each approach and how to create smooth, performant animations that enhance your user interface without compromising performance.",
    date: "April 15, 2025",
    author: "Pat Johnson",
    category: "Animation",
    views: 5432,
    likes: 432,
    comments: 38,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

// Mock data for related videos
const relatedVideos = [
  {
    id: "3",
    title: "React Server Components Explained",
    views: 9876,
    date: "May 5, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "5",
    title: "JavaScript Performance Optimization",
    views: 7654,
    date: "April 20, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "2",
    title: "Mastering CSS Grid Layout",
    views: 8765,
    date: "May 10, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export function generateMetadata({ params }) {
  const video = videos.find((video) => video.id === params.id)

  if (!video) {
    return {
      title: "Video Not Found",
      description: "The requested video could not be found.",
    }
  }

  return {
    title: `${video.title} | Modern Web App Videos`,
    description: video.description.substring(0, 160),
  }
}

export default function VideoPage({ params }) {
  const video = videos.find((video) => video.id === params.id)

  if (!video) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/videos" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Videos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 mb-4 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={video.embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{video.category}</Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400">{video.date}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {video.views.toLocaleString()} views • By {video.author}
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{video.likes.toLocaleString()}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{video.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400">{video.description}</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Comments ({video.comments})</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">User123</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">2 days ago</span>
                  </div>
                  <p className="text-sm">
                    Great video! I learned so much about these new techniques. Looking forward to implementing them in
                    my next project.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">WebDev2025</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">3 days ago</span>
                  </div>
                  <p className="text-sm">
                    Could you make a follow-up video on how to integrate these techniques with existing projects? That
                    would be super helpful!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">CodeMaster</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">5 days ago</span>
                  </div>
                  <p className="text-sm">
                    I've been using similar approaches in my work, but your explanation really clarified some concepts I
                    was struggling with. Thanks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
          <div className="space-y-4">
            {relatedVideos.map((relatedVideo) => (
              <Link key={relatedVideo.id} href={`/videos/${relatedVideo.id}`} className="block">
                <div className="flex gap-4">
                  <div className="relative w-32 h-20 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={relatedVideo.thumbnail || "/placeholder.svg"}
                      alt={relatedVideo.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:underline">{relatedVideo.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {relatedVideo.views.toLocaleString()} views • {relatedVideo.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
