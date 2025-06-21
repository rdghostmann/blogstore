"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function updateUser(userId, updateData) {
  await connectToDB()
  const updated = await User.findByIdAndUpdate(userId, updateData, { new: true })
  return updated
}