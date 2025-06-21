// writer/posts/new/page.jsx
import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { getCategories } from '@/controllers/getCategories'
import CreatePost from './CreatePost'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return <div>Please log in to access the writer dashboard.</div>
  }

  const categories = await getCategories()

  return <CreatePost user={user} categories={categories} />
}
