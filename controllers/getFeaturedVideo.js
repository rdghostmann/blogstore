"use server"

import VBlog from "@/models/VBlog"
import { connectToDB } from "@/lib/connectDB"

export async function getFeaturedVideo() {
  await connectToDB()
  // Find the most recently created video (last inserted)
  const video = await VBlog.findOne().sort({ createdAt: -1 }).lean()
  if (!video) return null
  return {
    ...video,
    _id: video._id.toString(),
  }
}