"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"
import Category from "@/models/Category"

export async function getFeaturedBlogPosts() {
  await connectToDB()
  // Get all categories
  const categories = await Category.find().lean()

  // For each category, get the most recent blog post
  const featuredPosts = await Promise.all(
    categories.map(async (cat) => {
      const post = await BlogPost.findOne({ category: cat.name }) // Use cat.name if your mock data uses string
        .sort({ date: -1 })
        .lean()
      if (!post) return null
      return {
        ...post,
        id: post._id ? post._id.toString() : post.id,
        authorId: post.authorId ? post.authorId.toString() : "",
        category: cat.name,
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