import React from 'react'
import WriterPostsPage from './WriterPostsPage'
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { getPostsByAuthor } from '@/controllers/getPostsByAuthor'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) {
    return <div>Please log in to access the writer dashboard.</div>
  }

  const myPosts = await getPostsByAuthor(user.id)

  return <WriterPostsPage myPosts={myPosts} />
}
