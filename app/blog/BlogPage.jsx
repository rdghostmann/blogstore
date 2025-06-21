"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion";
import moment from "moment";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog | Modern Web App",
  description: "Read our latest articles and insights on web development, design, and technology.",
}

export default function BlogPage({blogPosts}) {

  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card className="overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {post.date ? moment(post.date).fromNow() : ""}
                    </span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {post.excerpt}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
  )
}