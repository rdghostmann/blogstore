"use server"

import Product from "@/models/Product"
import { connectToDB } from "@/lib/connectDB"

export async function getRelatedProduct(category, excludeId) {
  await connectToDB()
  const products = await Product.find({
    category,
    _id: { $ne: excludeId },
  })
    .limit(4)
    .lean()
  return products.map((product) => {
    const { _id, ...rest } = product
    return { ...rest, id: _id.toString() }
  })
}