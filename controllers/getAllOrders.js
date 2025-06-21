"use server"

import Order from "@/models/Orders"
import { connectToDB } from "@/lib/connectDB"

export async function getAllOrders(userId) {
  await connectToDB()
  const orders = await Order.find({ userId }).lean()
  return orders.map(order => ({
    ...order,
    id: order._id.toString(),
    _id: undefined
  }))
}