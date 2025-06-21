import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPost } from "@/controllers/getPost"

export async function generateMetadata({ params }) {
  const post = await getPost(params.id)
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }
  return {
    title: `${post.title} | Modern Web App Blog`,
    description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/writer/posts" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Writer Posts
        </Link>
      </Button>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="relative w-full h-[300px] md:h-[400px] mb-6">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover rounded-lg" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {post.date ? post.date.slice(0, 10) : ""}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm">By {post.author}</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}