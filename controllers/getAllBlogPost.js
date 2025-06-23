"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export async function getAllBlogPosts() {
  await connectToDB()
  const posts = await BlogPost.find({}).sort({ date: -1 }).lean()
  return posts.map(post => ({
    ...post,
    id: post._id ? post._id.toString() : post.id,
    authorId: post.authorId ? post.authorId.toString() : "",
    date: post.date instanceof Date
      ? post.date.toISOString().split("T")[0]
      : (typeof post.date === "string" && post.date.includes("T") ? post.date.split("T")[0] : post.date),
    _id: undefined
  }))
}