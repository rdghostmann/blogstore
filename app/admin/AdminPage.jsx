import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, ShoppingBag, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const user = session?.user || { username: "Admin User", role: "admin" }

    // Add mock stats data
  const stats = [
    {
      title: "Users",
      value: 1280,
      description: "Total registered users",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Posts",
      value: 342,
      description: "Published blog posts",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Orders",
      value: 87,
      description: "Total store orders",
      icon: ShoppingBag,
      color: "text-purple-500",
    },
    {
      title: "Growth",
      value: "12%",
      description: "Monthly growth",
      icon: TrendingUp,
      color: "text-pink-500",
    },
  ]

   // Add mock recent users data
  const recentUsers = [
    { id: 1, name: "Jane Doe", email: "jane@example.com", role: "user", createdAt: "2024-06-01" },
    { id: 2, name: "John Smith", email: "john@example.com", role: "editor", createdAt: "2024-05-28" },
    { id: 3, name: "Alice Lee", email: "alice@example.com", role: "user", createdAt: "2024-05-25" },
  ]

  // Add mock recent posts data
  const recentPosts = [
    { id: 1, title: "How to Use Zustand in Next.js", authorName: "Jane Doe", status: "published", date: "2024-06-01" },
    { id: 2, title: "Modern React Patterns", authorName: "John Smith", status: "draft", date: "2024-05-30" },
    { id: 3, title: "Deploying with Vercel", authorName: "Alice Lee", status: "published", date: "2024-05-28" },
  ]

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">{user.role}</p>
                      <p className="text-xs text-gray-500">{user.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Latest blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500">by {post.authorName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">{post.status}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
