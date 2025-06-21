// app/actions/createOrder.js
"use server"

import { connectToDB } from "@/lib/connectDB"
import Order from "@/models/Orders"
import { nanoid } from "nanoid"

export async function createOrder({ userId, username, items, total, shippingAddress }) {
  try {
    await connectToDB()

    const order = await Order.create({
      orderId: `ORD-${nanoid(6).toUpperCase()}`,
      userId,
      username,
      items,
      total,
      status: "processing",
      orderDate: new Date().toISOString(),
      deliveryDate: null,
      shippingAddress,
    })

    return { success: true, orderId: order.orderId }
  } catch (err) {
    console.error("Order creation failed:", err)
    throw new Error("Failed to create order.")
  }
}
