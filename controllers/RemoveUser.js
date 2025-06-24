"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"
import mongoose from "mongoose"

export async function removeUser(userId) {
  await connectToDB()
  // Validate ObjectId before attempting to delete
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return false
  }
  const deleted = await User.findByIdAndDelete(userId)
  return !!deleted
}