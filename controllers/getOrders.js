"use server"

import Order from "@/models/Orders"
import { connectToDB } from "@/lib/connectDB"

// Get a single order by id and userId
export async function getOrder(orderId, userId) {
  await connectToDB()
  const order = await Order.findOne({ _id: orderId, userId }).lean()
  if (!order) return null
  return {
    ...order,
    id: order._id.toString(),
    _id: undefined
  }
}

// Get all orders for a user
export async function getAllOrders(userId) {
  await connectToDB()
  const orders = await Order.find({ userId }).sort({ orderDate: -1 }).lean()
  return orders.map(order => ({
    ...order,
    id: order._id.toString(),
    _id: undefined
  }))
}

// Get stats for a user: total orders and total spent
export async function getOrdersStats(userId) {
  await connectToDB()
  const orders = await Order.find({ userId }).lean()
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  return { totalOrders, totalSpent }
}