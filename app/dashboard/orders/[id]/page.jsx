import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Truck, CheckCircle, MapPin } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { getOrder } from "@/controllers/getOrders"

export default async function OrderDetailsPage({ params }) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  const orderId = params.id

  let order = null
  if (userId && orderId) {
    order = await getOrder(orderId, userId)
  }

  if (!order) {
    return (
      <DashboardLayout role="user">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Order Not Found</h1>
          <p className="text-gray-500 mt-2">The order you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/orders">Back to Orders</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package className="h-5 w-5" />
      case "shipped":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-orange-600 bg-orange-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "delivered":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const orderSteps = [
    { status: "processing", label: "Order Confirmed", completed: true },
    { status: "shipped", label: "Shipped", completed: order.status === "shipped" || order.status === "delivered" },
    { status: "delivered", label: "Delivered", completed: order.status === "delivered" },
  ]

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order {order.id}</h1>
            <p className="text-gray-600 dark:text-gray-400">Placed on {order.orderDate}</p>
          </div>
        </div>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              Order Status
            </CardTitle>
            <CardDescription>Track your order progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <Badge className={`${getStatusColor(order.status)} border-0`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              {order.deliveryDate && <p className="text-sm text-gray-500">Expected delivery: {order.deliveryDate}</p>}
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {orderSteps.map((step, index) => (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <p className="text-xs mt-2 text-center">{step.label}</p>
                  {index < orderSteps.length - 1 && (
                    <div className={`w-16 h-0.5 mt-4 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="relative w-16 h-16">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">₦{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₦{(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₦{(order.total * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.shippingAddress}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}