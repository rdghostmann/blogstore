'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Eye, PlusCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { DeleteBlogPost } from "@/controllers/DeleteBlogPost"
import { toast } from "sonner"
import { useTransition } from "react"

export default function WriterPostsPage({ myPosts }) {
  const [isPending, startTransition] = useTransition()

  const handleDeletePost = (postId) => {
    startTransition(async () => {
      const res = await DeleteBlogPost(postId)

      toast(
        res.success
          ? {
              title: "Post deleted",
              description: res.message,
            }
          : {
              title: "Failed to delete",
              description: res.message || "Unknown error",
            }
      )
    })
  }

  return (
    <DashboardLayout role="writer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your blog posts</p>
          </div>
          <Button asChild>
            <Link href="/writer/posts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>Your published and draft blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {myPosts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">Create your first blog post to get started.</p>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Title</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPosts.map((post) => (
                      <tr key={post.id} className="border-b">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-gray-500">{post.excerpt}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{post.category}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>
                            {post.status}
                          </Badge>
                        </td>
                        <td className="p-4">{post.date}</td>
                        <td className="p-4">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/writer/posts/${post.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/writer/posts/${post.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isPending}
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
