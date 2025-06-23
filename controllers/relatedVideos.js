"use server"

import VBlog from "@/models/VBlog"
import { connectToDB } from "@/lib/connectDB"

export async function getRelatedVideos() {
  await connectToDB()
  const categories = ["Technology", "Travel", "Lifestyle"]

  // Get the most recent video for each category
  const relatedVideos = await Promise.all(
    categories.map(async (cat) => {
      const video = await VBlog.findOne({ category: cat })
        .sort({ createdAt: -1 })
        .lean()
      if (!video) return null
      return {
        ...video,
        id: video._id.toString(),
        _id: undefined,
      }
    })
  )

  // Filter out categories with no videos
  return relatedVideos.filter(Boolean)
}