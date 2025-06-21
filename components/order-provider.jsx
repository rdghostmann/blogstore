"use client"

import { createContext, useContext, useState } from "react"

const OrderContext = createContext(null)

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    userId: "3",
    items: [
      { id: "1", name: "Wireless Headphones", price: 199.99, quantity: 1 },
      { id: "2", name: "Smart Watch", price: 249.99, quantity: 1 },
    ],
    total: 494.98,
    status: "delivered",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-15",
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "ORD-002",
    userId: "3",
    items: [{ id: "3", name: "Mechanical Keyboard", price: 129.99, quantity: 2 }],
    total: 285.98,
    status: "shipped",
    orderDate: "2025-05-18",
    deliveryDate: "2025-05-22",
    shippingAddress: "123 Main St, City, State 12345",
  },
  {
    id: "ORD-003",
    userId: "3",
    items: [{ id: "4", name: "Wireless Mouse", price: 79.99, quantity: 1 }],
    total: 87.99,
    status: "processing",
    orderDate: "2025-05-20",
    deliveryDate: null,
    shippingAddress: "123 Main St, City, State 12345",
  },
]

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(mockOrders)

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      orderDate: new Date().toISOString().split("T")[0],
      status: "processing",
    }
    setOrders((prev) => [...prev, newOrder])
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
  }

  const getUserOrders = (userId) => {
    return orders.filter((order) => order.userId === userId)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
