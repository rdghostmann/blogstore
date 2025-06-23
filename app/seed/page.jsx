import mongoose from "mongoose"
import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

const users = [
  {
    id: '6843d2c980c1994a49016e1d',
    username: 'admin@example.com',
  },
  {
    id: '685925e8ec5b783e5576952d',
    username: 'pinky20@gmail.com',
  }
]

const categories = ["Technology", "Fashion", "Travel", "Lifestyle", "Food", "Health"]

// Generate 3 posts per category, alternating users
const posts = categories.flatMap((category, catIdx) =>
  Array.from({ length: 3 }).map((_, i) => {
    const user = users[(catIdx + i) % users.length]
    return {
      title: `${category} Post ${i + 1}`,
      excerpt: `This is an excerpt for ${category} post ${i + 1}.`,
      content: `This is the content for ${category} post ${i + 1}.`,
      category,
      image: `/blog/${category.toLowerCase()}-${i + 1}.jpg`,
      author: {
        name: user.username,
        avatar: "",
      },
      authorId: new mongoose.Types.ObjectId(user.id),
      date: new Date(),
      status: "published",
      slug: `${category.toLowerCase()}-post-${i + 1}`,
      tags: [category.toLowerCase()],
      views: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 20),
      readTime: `${4 + i} min read`,
    }
  })
)

export default async function SeedBlogPosts() {
  await connectToDB()
  await BlogPost.insertMany(posts)
  await mongoose.disconnect()
  return <div>Seeded blog posts for all categories!</div>
}