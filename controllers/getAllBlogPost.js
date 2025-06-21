"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export async function getAllBlogPosts() {
  await connectToDB()
  const posts = await BlogPost.find().populate("category", "name").lean()
  return posts.map(post => ({
    ...post,
    id: post._id ? post._id.toString() : post.id,
    authorId: post.authorId ? post.authorId.toString() : "",
    // date: post.date instanceof Date ? post.date.toISOString() : post.date,
    date: post.date instanceof Date
      ? post.date.toISOString().split("T")[0]
      : (typeof post.date === "string" && post.date.includes("T") ? post.date.split("T")[0] : post.date),
    category: post.category?.name || post.category || "", // fallback for string category
    _id: undefined // remove _id from the object
  }))
}