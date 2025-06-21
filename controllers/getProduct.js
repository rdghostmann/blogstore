"use server"

import Product from "@/models/Product"
import { connectToDB } from "@/lib/connectDB"

export async function getProduct(id) {
  await connectToDB()
  const product = await Product.findOne({ _id: id }).lean()
  if (!product) return null
  return {
    ...product,
    _id: product._id.toString(),
  }
}