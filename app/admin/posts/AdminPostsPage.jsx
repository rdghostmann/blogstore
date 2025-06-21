"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Eye } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminPostsPage({ posts }) {
    const router = useRouter();

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage all blog posts from writers</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Blog Posts</CardTitle>
                        <CardDescription>Review, edit, and manage blog posts from all writers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-4">Title</th>
                                        <th className="text-left p-4">Author</th>
                                        <th className="text-left p-4">Category</th>
                                        <th className="text-left p-4">Status</th>
                                        <th className="text-left p-4">Date</th>
                                        <th className="text-right p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.id} className="border-b">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-medium">{post.title}</p>
                                                    <p className="text-sm text-gray-500">{post.excerpt}</p>
                                                </div>
                                            </td>
                                            <td className="p-4">{post.authorName}</td>
                                            <td className="p-4">
                                                <Badge variant="outline">{post.category}</Badge>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                                            </td>
                                            <td className="p-4">{post.date}</td>
                                            <td className="p-4">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/admin/posts/${post.id}`} passHref legacyBehavior>
                                                        <Button as="a" variant="ghost" size="icon" className="flex items-center">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => { }}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => { }}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
