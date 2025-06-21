import Link from "next/link"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { getFeaturedBlogPosts } from "@/controllers/getRecentBlogPost"

export default async function RecentPosts() {
  const featuredPosts = await getFeaturedBlogPosts()

  if (!featuredPosts || featuredPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No featured blog posts found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {featuredPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link href={`/blog/${post.id}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                {post.date && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              <Link href={`/blog/${post.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:underline line-clamp-2">{post.title}</h3>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{post.excerpt}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}