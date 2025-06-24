"use server"

import { connectToDB } from "@/lib/connectDB"
import BlogPost from "@/models/BlogPost"
import mongoose from "mongoose"

// Helper to generate a slug from the title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function addPost({
  title,
  excerpt,
  content,
  category,
  image,
  authorId,
  authorName,
  status = "published",
  tags = [],
}) {
  try {
    await connectToDB()

    // Validate required fields
    if (!title || !excerpt || !content || !category || !authorId || !authorName) {
      return { success: false, error: "All fields are required" }
    }

    // Prepare authorId as ObjectId if possible
    let authorObjId = authorId
    if (mongoose.Types.ObjectId.isValid(authorId)) {
      authorObjId = new mongoose.Types.ObjectId(authorId)
    }

    const newPost = new BlogPost({
      title,
      excerpt,
      content,
      category,
      image: image || "/placeholder.svg",
      author: {
        name: authorName,
      },
      authorId: authorObjId,
      status,
      slug: slugify(title),
      tags,
    })

    await newPost.save()

    return { success: true, postId: newPost._id.toString() }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, error: "Failed to create post" }
  }
}