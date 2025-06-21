import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Eye } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function UserOrdersPage({ userOrders = [] }) {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case "processing":
        return "secondary"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your orders</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>All your past and current orders</CardDescription>
          </CardHeader>
          <CardContent>
            {(!userOrders || userOrders.length === 0) ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/store">Start Shopping</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Items</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Order Date</th>
                      <th className="text-left p-4">Delivery Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-4 font-medium">{order.orderId || order.id}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              {order.items.length} item{order.items.length > 1 ? "s" : ""}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items
                                .slice(0, 2)
                                .map((item) => item.name)
                                .join(", ")}
                              {order.items.length > 2 && ` +${order.items.length - 2} more`}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 font-medium">${order.total?.toFixed(2) ?? "0.00"}</td>
                        <td className="p-4">
                          <Badge variant={getStatusVariant(order.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </Badge>
                        </td>
                        <td className="p-4">{order.orderDate}</td>
                        <td className="p-4">{order.deliveryDate || "TBD"}</td>
                        <td className="p-4">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}