'use server'

import { connectToDB } from "@/lib/connectDB"
import BlogPost from "@/models/BlogPost"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

export async function DeleteBlogPost(postId) {
  try {
    await connectToDB()

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return { success: false, message: "Invalid post ID" }
    }

    const deletedPost = await BlogPost.findByIdAndDelete(postId)

    if (!deletedPost) {
      return { success: false, message: "Post not found" }
    }

    revalidatePath("/writer/posts")

    return { success: true, message: "Post deleted successfully" }
  } catch (error) {
    console.error("Delete Post Error:", error.message)
    return { success: false, message: "Error deleting post", error: error.message }
  }
}
