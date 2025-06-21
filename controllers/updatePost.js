'use server'

import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import BlogPost from "@/models/BlogPost"
import { revalidatePath } from "next/cache"

export async function updatePost(data) {
  try {
    await connectToDB()

    const { _id, ...updates } = data
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return { success: false, message: "Invalid post ID" }
    }

    const updated = await BlogPost.findByIdAndUpdate(_id, updates, { new: true })

    if (!updated) {
      return { success: false, message: "Post not found" }
    }

    // Revalidate the posts listing or specific post path
    revalidatePath('/writer/posts') // adjust path if needed (e.g., `/writer/posts/${_id}`)

    return { success: true, message: "Post updated" }
  } catch (err) {
    console.error("Update Error:", err.message)
    return { success: false, message: "Update failed", error: err.message }
  }
}
