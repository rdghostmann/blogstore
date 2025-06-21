import React from "react"
import { getServerSession } from "next-auth"
import { getAllOrders } from "@/controllers/getAllOrders"
import OrderPage from "./OrderPage"
import { authOptions } from "@/auth"

export default async function UserOrdersPage() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  let userOrders = []
  if (userId) {
    userOrders = await getAllOrders(userId)
  }

  return <OrderPage userOrders={userOrders} />
}
