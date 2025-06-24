import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import AdminDashboard from "./AdminPage"
import { getRecentUsers } from "@/controllers/getRecentUsers"
import { getFeaturedBlogPosts } from "@/controllers/getRecentBlogPost"

export default async function page() {
  const session = await getServerSession(authOptions)
  const user = session?.user || { username: "Admin User", role: "admin" }

  // Fetch recent users and featured posts from server actions
  const recentUsers = await getRecentUsers()
  const recentPosts = await getFeaturedBlogPosts()

  return (
    <>
      <AdminDashboard user={user} recentUsers={recentUsers} recentPosts={recentPosts} />
    </>
  )
}
