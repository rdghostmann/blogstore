"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  Home,
} from "lucide-react"
import TrendingPosts from "@/components/trending-posts"
import CategoryButtons from "@/components/category-buttons"
import AdsBanner from "@/components/ads-banner"
import CommentsSection from "@/components/comments-section"

// Sample post data - in real app, this would come from an API
const samplePost = {
  id: 1,
  title: "The Future of AI in Everyday Technology: How Machine Learning is Reshaping Our Digital Lives",
  content: `
    <p>Artificial Intelligence has moved from the realm of science fiction into our daily lives, transforming how we interact with technology and reshaping entire industries. From the moment we wake up to our AI-powered alarm clocks to the personalized recommendations we receive throughout the day, machine learning algorithms are quietly working behind the scenes to enhance our digital experiences.</p>

    <h2>The Current State of AI Integration</h2>
    <p>Today's AI applications are more sophisticated and accessible than ever before. Smart home devices can learn our preferences and adjust lighting, temperature, and security settings automatically. Virtual assistants have become conversational partners that can help with everything from setting reminders to controlling our entire smart home ecosystem.</p>

    <blockquote>
      "The best AI is invisible AI - technology that seamlessly integrates into our lives without requiring us to change our behavior or learn new interfaces." - Dr. Sarah Chen, AI Research Director
    </blockquote>

    <h2>Emerging Trends and Applications</h2>
    <p>Looking ahead, several key trends are shaping the future of AI in consumer technology:</p>

    <ul>
      <li><strong>Predictive Health Monitoring:</strong> Wearable devices that can detect health issues before symptoms appear</li>
      <li><strong>Autonomous Transportation:</strong> Self-driving cars and smart traffic management systems</li>
      <li><strong>Personalized Education:</strong> AI tutors that adapt to individual learning styles and pace</li>
      <li><strong>Creative AI:</strong> Tools that assist in content creation, design, and artistic expression</li>
    </ul>

    <h2>Challenges and Considerations</h2>
    <p>While the potential benefits of AI are enormous, we must also address important challenges including privacy concerns, algorithmic bias, and the need for transparent AI decision-making processes. As AI becomes more prevalent, ensuring these systems are ethical, fair, and accountable becomes increasingly critical.</p>

    <p>The future of AI in everyday technology is not just about more powerful algorithms or faster processing - it's about creating technology that truly understands and serves human needs while respecting our values and privacy.</p>
  `,
  excerpt: "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
  category: "Technology",
  image: "/placeholder.svg?height=600&width=1200",
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Tech journalist and AI researcher with over 10 years of experience covering emerging technologies.",
    social: {
      twitter: "@alexjohnson",
      linkedin: "alexjohnson",
    },
  },
  date: "May 28, 2023",
  readTime: "8 min read",
  views: 2547,
  comments: 24,
  tags: ["AI", "Machine Learning", "Technology", "Future Tech"],
}

const relatedPosts = [
  {
    id: 2,
    title: "Machine Learning Basics: A Beginner's Guide",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 25, 2023",
    category: "Technology",
  },
  {
    id: 3,
    title: "The Ethics of Artificial Intelligence",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 20, 2023",
    category: "Technology",
  },
  {
    id: 4,
    title: "Smart Home Technology Trends 2023",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 15, 2023",
    category: "Technology",
  },
]

export default function SinglePostPage() {
  const params = useParams()
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = (platform) => {
    setIsSharing(true)
    // Implement sharing logic here
    setTimeout(() => setIsSharing(false), 1000)
  }

  return (
    <div className="pt-16">
      {/* Top Banner Ad */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <AdsBanner type="banner" size="small" />
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/category/${samplePost.category.toLowerCase()}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
            >
              {samplePost.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100 truncate">{samplePost.title}</span>
          </nav>
        </div>
      </section>

      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Article Header */}
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Badge className="mb-4">{samplePost.category}</Badge>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{samplePost.title}</h1>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{samplePost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{samplePost.readTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{samplePost.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>{samplePost.comments} comments</span>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage
                          src={samplePost.author.avatar || "/placeholder.svg"}
                          alt={samplePost.author.name}
                        />
                        <AvatarFallback>{samplePost.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{samplePost.author.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{samplePost.author.bio}</p>
                      </div>
                    </div>

                    {/* Social Share */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("facebook")}
                        disabled={isSharing}
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} disabled={isSharing}>
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("linkedin")}
                        disabled={isSharing}
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare("share")} disabled={isSharing}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.header>

                {/* Featured Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden"
                >
                  <Image
                    src={samplePost.image || "/placeholder.svg"}
                    alt={samplePost.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Inline Ad */}
                <div className="my-8">
                  <AdsBanner type="inline" size="medium" />
                </div>

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="prose prose-lg dark:prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: samplePost.content }}
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {samplePost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                <Separator className="my-8" />

                {/* Author Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8"
                >
                  <div className="flex items-start">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={samplePost.author.avatar || "/placeholder.svg"} alt={samplePost.author.name} />
                      <AvatarFallback>{samplePost.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{samplePost.author.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{samplePost.author.bio}</p>
                      <div className="flex space-x-4">
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments Section */}
                <CommentsSection postId={samplePost.id} totalComments={samplePost.comments} />

                {/* Related Posts */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/post/${post.id}`} className="group">
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                          <div className="relative h-48">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <Badge className="mb-2">{post.category}</Badge>
                            <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <TrendingPosts />
              <CategoryButtons activeCategory={samplePost.category.toLowerCase()} />
              <AdsBanner type="sidebar" size="large" />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
