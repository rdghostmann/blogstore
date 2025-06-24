"use server"

import User from "@/models/User"
import { connectToDB } from "@/lib/connectDB"

export async function getRecentUsers() {
  await connectToDB()
  const users = await User.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean()
  return users.map(user => ({
    ...user,
    id: user._id ? user._id.toString() : user.id,
    _id: undefined,
    password: undefined // never return password hash
  }))
}