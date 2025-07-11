"use client"

import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedHeading from "@/components/animated-heading"
import ParallaxCTA from "@/components/parallax-cta"
import TrendingPosts from "@/components/trending-posts"
import CategoryButtons from "@/components/category-buttons"
import AdsBanner from "@/components/ads-banner"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, Eye, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



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

export default function CategoryPage({ allPosts }) {
  const params = useParams()
  const slug = params.slug
  const [sortBy, setSortBy] = useState("latest")

  const postsRef = useRef(null)
  const postsInView = useInView(postsRef, { once: true, amount: 0.3 })

  const category = categoryInfo[slug?.toLowerCase()]
  const categoryPosts = allPosts.filter(
    (post) => post.category?.toLowerCase() === slug?.toLowerCase()
  )
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
                <div
                
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {categoryPosts.map((post) => (


                    <Card key={post.id} className="overflow-hidden h-full">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary-600 hover:bg-primary-700">{post.category}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-accent-500"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-5">
                        <Link href={`/blog/post/${post.id}`} className="block">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Image
                              src={post.author.avatar || "/blog-author.jpg"}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="rounded-full mr-2"
                            />
                            <span className="text-sm font-medium">{post.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                            {post.comments !== undefined && (
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{post.comments}</span>
                              </div>
                            )}
                            {post.views !== undefined && (
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{post.views}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>

                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found in this category yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/">Browse All Articles</Link>
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
