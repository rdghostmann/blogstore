import mongoose from "mongoose"
import VBlog from "@/models/VBlog"
import { connectToDB } from "@/lib/connectDB"

const videos = [
  {
    title: "The Future of Sustainable Fashion: A Deep Dive into Eco-Friendly Materials",
    description: "Join us as we explore the latest innovations in sustainable fashion, from lab-grown materials to circular design principles that are reshaping the industry.",
    thumbnail: "/blog/blog-inside-post.jpg",
    duration: "12:34",
    views: "15.2K",
    likes: "1.2K",
    publishedDate: "3 days ago",
    category: "Fashion",
    author: {
      name: "Emma Davis",
      avatar: "/team/team-4.jpg",
    },
  },
  {
    title: "Tech Gadgets That Will Change Your Life in 2024",
    thumbnail: "/blog/blog-6.jpg",
    duration: "8:45",
    views: "8.7K",
    category: "Technology",
    author: {
      name: "Lisa Parker",
      avatar: "",
    },
  },
  {
    title: "Hidden Travel Gems in Southeast Asia",
    thumbnail: "/blog/blog-recent-4.jpg",
    duration: "15:22",
    views: "12.1K",
    category: "Travel",
    author: {
      name: "Robert Brown",
      avatar: "",
    },
  },
  {
    title: "Minimalist Living: Transform Your Space",
    thumbnail: "/blog/blog-recent-5.jpg",
    duration: "10:18",
    views: "9.3K",
    category: "Lifestyle",
    author: {
      name: "Sophia Martinez",
      avatar: "",
    },
  },
]

export default async function SeedVBlogs() {
  await connectToDB()
  await VBlog.insertMany(videos)
  await mongoose.disconnect()
  return <div>Seeded video blogs!</div>
}