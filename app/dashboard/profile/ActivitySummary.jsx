"use client"

import { useEffect, useState } from "react"
import { getAllOrders, getOrdersStats } from "@/controllers/getOrders"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ActivitySummary({ userId }) {
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (!userId) return
      const statsData = await getOrdersStats(userId)
      setStats(statsData)
      const orders = await getAllOrders(userId)
      setRecentOrders(orders.slice(0, 3))
    }
    fetchData()
  }, [userId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
        <CardDescription>Overview of your recent account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalSpent.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Total Spent</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-500">Wishlist Items</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
