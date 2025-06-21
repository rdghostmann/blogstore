import BlogPost from "@/models/BlogPost"
import EditPostForm from "./EditPostForm"
import { connectToDB } from "@/lib/connectDB"

export default async function EditPostPage({ params }) {
  const { id } = params

  await connectToDB()
  const post = await BlogPost.findById(id).lean()

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={JSON.parse(JSON.stringify(post))} />
    </div>
  )
}
