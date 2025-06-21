// lib/actions/categories.js
import { connectToDB } from "@/lib/connectDB"
import Category from "@/models/Category"

export async function getCategories() {
  try {
    await connectToDB()
    const categories = await Category.find().lean()

    return categories.map((cat) => ({
      _id: cat._id.toString(),
      name: cat.name,
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
