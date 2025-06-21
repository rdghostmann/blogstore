'use server'

import { connectToDB } from "@/lib/connectDB"
import BlogPost from "@/models/BlogPost"

export async function addPost(formData) {
  try {
    await connectToDB()

    const newPost = await BlogPost.create({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      image: formData.image,
      authorId: formData.authorId,
      authorName: formData.authorName,
      status: "draft", // Set to 'draft' by default
    })

    const postObject = newPost.toObject()
    delete postObject.authorId // Remove authorId from the returned object

    return {
      success: true,
      message: "Post created successfully",
      post: {
        ...postObject,
        _id: newPost._id.toString(),
      },
    }
  } catch (error) {
    console.error("Error creating post:", error.message)
    return {
      success: false,
      message: "Failed to create post",
      error: error.message,
    }
  }
}
