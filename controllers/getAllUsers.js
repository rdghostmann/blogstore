"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

// Server action to get all users
export async function getAllUsers() {
  await connectToDB()
  const users = await User.find().lean()
  // Map to plain objects and format createdAt
  return users.map(user => ({
    id: user._id.toString(),
    username: user.username || "",
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
    status: user.status || "",
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "",
  }))
}