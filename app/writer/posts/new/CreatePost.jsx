'use client'

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import slugify from "slugify"
import { uploadToVercelBlob } from "@/lib/vercelBlob"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { addPost } from "@/controllers/addPost" // server action

export default function CreatePost({ categories, user }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
  })

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("All fields are required")
      return
    }

    if (!user?.id && !user?._id) {
      toast.error("User is not authenticated properly.")
      return
    }

    let imageUrl = formData.image
    if (imageFile) {
      try {
        toast.info("Uploading image...")
        imageUrl = await uploadToVercelBlob(imageFile)
        toast.success("Image uploaded!")
      } catch (err) {
        toast.error("Image upload failed")
        return
      }
    }

    const slug = slugify(formData.title, { lower: true, strict: true })

    startTransition(async () => {
      const result = await addPost({
        ...formData,
        image: imageUrl,
        authorId: user.id || user._id,
        authorName: user.name || user.username,
        slug,
      })

      if (result?.success) {
        toast.success("Post created successfully")
        router.push("/writer/posts")
      } else {
        toast.error(result?.error || "Failed to create post")
      }
    })
  }

  return (
    <DashboardLayout role="writer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
          <p className="text-gray-600 dark:text-gray-400">Write and publish a new blog post</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Fill in the information for your new blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of your post"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image">Featured Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" />
                )}
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={15}
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Post"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/writer/posts")}>
                  Cancel
                </Button>
                <Button type="button" variant="outline" onClick={() => { }}>
                  Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
