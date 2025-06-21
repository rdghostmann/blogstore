"use server"

import User from "@/models/User"
import { connectToDB } from "@/lib/connectDB"

export async function getUserProfile(userId) {
  await connectToDB()
  const user = await User.findById(userId).lean()
  if (!user) return null

  return {
    id: user._id.toString(),
    name: user.username || "",
    email: user.email || "",
    role: user.role || "",
    status: user.status || "",
    createdAt: user.createdAt
      ? (typeof user.createdAt === "string"
          ? user.createdAt
          : user.createdAt.toISOString().split("T")[0])
      : "",
  }
}