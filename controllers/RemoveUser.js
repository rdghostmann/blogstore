"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function removeUser(userId) {
  await connectToDB()
  const deleted = await User.findByIdAndDelete(userId)
  return !!deleted
}