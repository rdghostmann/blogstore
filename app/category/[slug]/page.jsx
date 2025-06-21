"use client"

import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/post-card"
import AnimatedHeading from "@/components/animated-heading"
import ParallaxCTA from "@/components/parallax-cta"
import TrendingPosts from "@/components/trending-posts"
import CategoryButtons from "@/components/category-buttons"
import AdsBanner from "@/components/ads-banner"

// Sample posts data - in real app, this would come from an API
const allPosts = [
  {
    id: 1,
    title: "The Future of AI in Everyday Technology",
    excerpt: "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    author: { name: "Alex Johnson", avatar: "/placeholder.svg?height=50&width=50" },
    date: "May 28, 2023",
    readTime: "5 min read",
    comments: 24,
    views: 1543,
  },
  {
    id: 2,
    title: "Summer Fashion Trends to Watch in 2023",
    excerpt: "The hottest styles, colors, and accessories that will dominate the fashion scene this summer.",
    category: "Fashion",
    image: "/placeholder.svg?height=400&width=600",
    author: { name: "Emma Davis", avatar: "/placeholder.svg?height=50&width=50" },
    date: "May 25, 2023",
    readTime: "4 min read",
    comments: 18,
    views: 982,
  },
  {
    id: 3,
    title: "Hidden Gems: Unexplored Travel Destinations",
    excerpt: "Discover these lesser-known but breathtaking locations for your next adventure.",
    category: "Travel",
    image: "/placeholder.svg?height=400&width=600",
    author: { name: "Michael Wong", avatar: "/placeholder.svg?height=50&width=50" },
    date: "May 22, 2023",
    readTime: "6 min read",
    comments: 31,
    views: 2134,
  },
  {
    id: 4,
    title: "Mindful Living: Creating Balance in a Busy World",
    excerpt: "Practical tips for incorporating mindfulness into your daily routine for better mental health.",
    category: "Lifestyle",
    image: "/placeholder.svg?height=400&width=600",
    author: { name: "Sarah Chen", avatar: "/placeholder.svg?height=50&width=50" },
    date: "May 20, 2023",
    readTime: "6 min read",
    comments: 15,
    views: 1876,
  },
  // Add more posts for each category...
]

const categoryInfo = {
  technology: {
    title: "Technology",
    description: "Latest gadgets, software updates, and tech industry insights",
    color: "bg-blue-500",
  },
  fashion: {
    title: "Fashion",
    description: "Style guides, trends, and fashion industry news",
    color: "bg-pink-500",
  },
  travel: {
    title: "Travel",
    description: "Destinations, travel tips, and adventure stories",
    color: "bg-green-500",
  },
  lifestyle: {
    title: "Lifestyle",
    description: "Living well, personal growth, and life inspiration",
    color: "bg-purple-500",
  },
  food: {
    title: "Food",
    description: "Recipes and culinary adventures",
    color: "bg-orange-500",
  },
  health: {
    title: "Health",
    description: "Wellness and fitness advice",
    color: "bg-teal-500",
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug 
  const [sortBy, setSortBy] = useState("latest")

  const postsRef = useRef(null)
  const postsInView = useInView(postsRef, { once: true, amount: 0.3 })

  const category = categoryInfo[slug ?.toLowerCase()] 
  const categoryPosts = allPosts.filter((post) => post.category.toLowerCase() === slug)

  if (!category) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Top Banner Ad */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <AdsBanner type="banner" size="medium" />
        </div>
      </div>

      {/* Category Hero */}
      <section className="relative bg-gradient-to-r from-primary-700 to-secondary-700 text-white pt-10 md:pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className={`mb-4 ${category.color} text-white`}>{categoryPosts.length} Articles</Badge>
            <h1 className="text-3xl text-gray-700 md:text-5xl font-bold mb-4">{category.title}</h1>
            <p className="text-lg text-gray-400 mb-8">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Posts Section with Sidebar */}
      <section ref={postsRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <AnimatedHeading
                  title={`${category.title} Articles`}
                  subtitle={`${categoryPosts.length} articles found`}
                  gradient={true}
                />

                <Tabs defaultValue="latest" className="mt-4 md:mt-0">
                  <TabsList>
                    <TabsTrigger value="latest" onClick={() => setSortBy("latest")}>
                      Latest
                    </TabsTrigger>
                    <TabsTrigger value="popular" onClick={() => setSortBy("popular")}>
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="trending" onClick={() => setSortBy("trending")}>
                      Trending
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Inline Ad */}
              <div className="mb-8">
                <AdsBanner type="inline" size="medium" />
              </div>

              {categoryPosts.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate={postsInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found in this category yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/">Browse All Articles</a>
                  </Button>
                </div>
              )}

              {categoryPosts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <TrendingPosts />
              <CategoryButtons activeCategory={slug} />
              <AdsBanner type="sidebar" size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxCTA
        title="Stay Updated"
        description="Subscribe to our newsletter and never miss the latest updates in your favorite categories."
        buttonText="Subscribe Now"
        buttonLink="#newsletter"
      />
    </div>
  )
}
