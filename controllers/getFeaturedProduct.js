"use server"

import Product from "@/models/Product"
import { connectToDB } from "@/lib/connectDB"

export async function getFeaturedProducts() {
  await connectToDB()
  // Only return products where isFeatured is true
  const products = await Product.find({ isFeatured: true }).lean()
  return products.map(product => {
    const { _id, ...rest } = product
    return {
      ...rest,
      id: _id.toString(),
    }
  })
}