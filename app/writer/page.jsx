// writer/page.jsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { getPostsByAuthor } from "@/controllers/getPostsByAuthor"
import WriterDashboard from "./WriterPage"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    return <div>Please log in to access the writer dashboard.</div>
  }

  const posts = await getPostsByAuthor(user.id)

  return <WriterDashboard user={user} posts={posts} />
}
