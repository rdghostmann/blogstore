import React from "react"
import { getAllBlogPosts } from "@/controllers/getAllBlogPost"
import AdminPostsPage from "./AdminPostsPage"

export default async function Page() {
  const posts = await getAllBlogPosts()
  return <AdminPostsPage posts={posts} />
}
