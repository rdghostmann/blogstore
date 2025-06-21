import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Package, Truck, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { getOrdersStats, getAllOrders } from "@/controllers/getOrders"

export default async function page() {
  const session = await getServerSession(authOptions)
  const user = session?.user || { name: "User" }
  const userId = user.id

  // Fetch all orders and stats for the user
  const userOrders = userId ? await getAllOrders(userId) : []
  const statsData = userId ? await getOrdersStats(userId) : { totalOrders: 0, totalSpent: 0 }

  const stats = [
    {
      title: "Total Orders",
      value: statsData.totalOrders,
      description: "All time orders",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Total Spent",
      value: `₦${statsData.totalSpent.toFixed(2)}`,
      description: "Lifetime spending",
      icon: Package,
      color: "text-green-600",
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-orange-600"
      case "shipped":
        return "text-blue-600"
      case "delivered":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  // Show up to 3 recent orders
  const recentOrders = userOrders.slice(0, 3)

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest purchases</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard/orders">View All Orders</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/store">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Browse Products
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">Order {order.id}</h3>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} • ${order.total.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">Ordered on {order.orderDate}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/store">
                  <ShoppingBag className="h-6 w-6 mb-2" />
                  Browse Store
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/dashboard/orders">
                  <Package className="h-6 w-6 mb-2" />
                  View Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link href="/dashboard/profile">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  Update Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}