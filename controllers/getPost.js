"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export async function getPost(id) {
  await connectToDB()
  // Populate the category field to get the category name
  const post = await BlogPost.findOne({ _id: id }).populate("category", "name").lean()
  if (!post) return null
  return {
    ...post,
    id: post._id ? post._id.toString() : post.id,
    date: post.date instanceof Date ? post.date.toISOString() : post.date,
    category: post.category?.name || "",
  }
}