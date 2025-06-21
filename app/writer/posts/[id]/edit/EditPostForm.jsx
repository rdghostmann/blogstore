"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updatePost } from "@/controllers/updatePost"

export default function EditPostForm({ post }) {
  const router = useRouter()
  const [formData, setFormData] = useState({ ...post })
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await updatePost(formData)

    setLoading(false)

    if (result.success) {
      router.push("/writer/posts")
    }
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <Input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Post Title"
        required
      />
      <Textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Post Content"
        rows={10}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Post"}
      </Button>
    </form>
  )
}
