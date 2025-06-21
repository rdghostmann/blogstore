"use server"

import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export async function getPostsByAuthor(authorId) {
  await connectToDB()
  const posts = await BlogPost.find({ authorId: authorId.toString() }).sort({ date: -1 }).lean()
  return posts.map(post => {
    const { authorId, _id, ...rest } = post
    return {
      ...rest,
      id: _id.toString(),
      date: post.date ? new Date(post.date).toLocaleDateString() : null,
    }
  })
}
