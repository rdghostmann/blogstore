"use server"

import Product from "@/models/Product"
import { connectToDB } from "@/lib/connectDB"

export async function getSampleProduct(id) {
  await connectToDB()
  const product = await Product.findById(id).lean()
  if (!product) return null
  const { _id, ...rest } = product
  return { ...rest, id: _id.toString() }
}