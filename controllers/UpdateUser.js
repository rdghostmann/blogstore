"use server"

import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"

export async function updateUser(userId, updateData) {
  try {
    await connectToDB()

    // Remove undefined or empty fields to avoid overwriting with empty values
    const cleanData = {}
    for (const key in updateData) {
      if (
        updateData[key] !== undefined &&
        updateData[key] !== null &&
        updateData[key] !== ""
      ) {
        cleanData[key] = updateData[key]
      }
    }

    // Only update if userId is provided
    if (!userId) {
      return null
    }

    const updated = await User.findByIdAndUpdate(userId, cleanData, { new: true, runValidators: true }).lean()
    // Return a plain object with only serializable fields
    if (!updated) return null
    return {
      id: updated._id.toString(),
      username: updated.username || "",
      name: updated.name || "",
      email: updated.email || "",
      role: updated.role || "",
      status: updated.status || "",
      phone: updated.phone || "",
      createdAt: updated.createdAt ? new Date(updated.createdAt).toLocaleDateString() : "",
    }
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}