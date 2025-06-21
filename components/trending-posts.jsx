"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Eye } from "lucide-react"

const trendingPosts = [
  {
    id: 1,
    title: "10 AI Tools That Will Transform Your Workflow in 2024",
    category: "Technology",
    image: "/blog/blog-1.jpg",
    views: "25.3K",
    readTime: "5 min",
    trending: true,
  },
  {
    id: 2,
    title: "Sustainable Fashion: The Future of Style",
    category: "Fashion",
    image: "/blog/blog-2.jpg",
    views: "18.7K",
    readTime: "7 min",
    trending: true,
  },
  {
    id: 3,
    title: "Digital Nomad Paradise: Top 10 Destinations",
    category: "Travel",
    image: "/blog/blog-3.jpg",
    views: "22.1K",
    readTime: "6 min",
    trending: true,
  },
  {
    id: 4,
    title: "Minimalist Living: Less is More",
    category: "Lifestyle",
    image: "/blog/blog-4.jpg",
    views: "15.9K",
    readTime: "4 min",
    trending: true,
  },
  {
    id: 5,
    title: "Smart Home Security: Complete Guide",
    category: "Technology",
    image: "/blog/blog-5.jpg",
    views: "12.4K",
    readTime: "8 min",
    trending: false,
  },
]

export default function TrendingPosts() {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-accent mr-2" />
          <h3 className="text-lg font-bold">Trending Posts</h3>
        </div>

        <div className="space-y-4">
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/post/${post.id}`} className="block group">
                <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.trending && (
                      <div className="absolute top-1 right-1">
                        <TrendingUp className="h-3 w-3 text-accent" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600 transition-colors mb-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Link
            href="/trending"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
          >
            View All Trending
            <TrendingUp className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
