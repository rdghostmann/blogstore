"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"


export default function FeaturedPostCard({ post }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <Card className="overflow-hidden h-full">
        <div className="border relative h-48 w-full overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary-600 hover:bg-primary-700">{post.category}</Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <Link href={`/post/${post.id}`} className="block">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
          <div className="text-sm">
  <p className="font-medium">{post.author?.name || "Unknown Author"}</p>
  <div className="flex items-center text-gray-500 dark:text-gray-400">
    <p className="mr-2">{post.date || "Unknown Date"}</p>
    <span className="mx-1">•</span>
    <Clock className="h-3 w-3 mr-1" />
    <span>{post.readTime || "N/A"}</span>
  </div>
</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
