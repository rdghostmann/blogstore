"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function deactiveUser(userId) {
  await connectToDB()
  const updated = await User.findByIdAndUpdate(userId, { status: "inactive" }, { new: true })
  return updated
}