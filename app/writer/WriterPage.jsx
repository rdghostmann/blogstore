// writer/WriterPage.jsx
import React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PlusCircle, Eye, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"

export default function WriterDashboard({ user, posts }) {
  const publishedPosts = posts?.filter((post) => post.status === "published") || []
  const draftPosts = posts?.filter((post) => post.status === "draft") || []

  const stats = [
    {
      title: "Total Posts",
      value: posts?.length || 0,
      description: "All your posts",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Published",
      value: publishedPosts?.length || 0,
      description: "Live posts",
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Drafts",
      value: draftPosts?.length || 0,
      description: "Unpublished posts",
      icon: Edit,
      color: "text-orange-600",
    },
  ]

  return (
    <DashboardLayout role="writer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Writer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
          </div>
          <Button asChild>
            <Link href="/writer/posts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/writer/posts/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Post
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-gray-500">{post.excerpt}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/writer/posts/${post.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
