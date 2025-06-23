"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export async function getFeaturedBlogPosts() {
  await connectToDB()
  const categories = ["Fashion", "Travel", "Technology"]

  // Get the most recent post for each category
  const featuredPosts = await Promise.all(
    categories.map(async (cat) => {
      const post = await BlogPost.findOne({ category: cat })
        .sort({ date: -1 })
        .lean()
      if (!post) return null
      return {
        ...post,
        id: post._id ? post._id.toString() : post.id,
        authorId: post.authorId ? post.authorId.toString() : "",
        date: post.date instanceof Date
          ? post.date.toISOString().split("T")[0]
          : (typeof post.date === "string" && post.date.includes("T") ? post.date.split("T")[0] : post.date),
        _id: undefined
      }
    })
  )
  // Filter out categories with no posts
  return featuredPosts.filter(Boolean)
}