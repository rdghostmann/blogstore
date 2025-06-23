import mongoose from "mongoose"
import BlogPost from "@/models/BlogPost"
import { connectToDB } from "@/lib/connectDB"

export const dynamic = "force-dynamic"

const posts = [
  {
    title: "How to Build a Smart Home on a Budget",
    excerpt:
      "Transform your living space with these affordable smart home solutions.",
    category: "Technology",
    image: "/blog/blog-recent-1.jpg",
    author: {
      name: "David Chen",
      avatar: "/blog/comments-2.jpg",
    },
    date: new Date("2023-05-20"),
    readTime: "7 min read",
    comments: 12,
    views: 1543,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for How to Build a Smart Home on a Budget.",
    tags: [],
    slug: "how-to-build-a-smart-home-on-a-budget",
  },
  {
    title: "Sustainable Fashion: Eco-Friendly Brands to Support",
    excerpt:
      "These fashion brands are leading the way in environmental responsibility.",
    category: "Fashion",
    image: "/blog/blog-recent-3.jpg",
    author: {
      name: "Sophia Martinez",
      avatar: "/blog/comments-1.jpg",
    },
    date: new Date("2023-05-18"),
    readTime: "5 min read",
    comments: 8,
    views: 982,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for Sustainable Fashion: Eco-Friendly Brands to Support.",
    tags: [],
    slug: "sustainable-fashion-eco-friendly-brands-to-support",
  },
  {
    title: "Digital Nomad Essentials: Work From Anywhere",
    excerpt:
      "The tools and tips you need to successfully work while traveling the world.",
    category: "Travel",
    image: "/blog/blog-recent-2.jpg",
    author: {
      name: "James Wilson",
      avatar: "/blog/comments-5.jpg",
    },
    date: new Date("2023-05-15"),
    readTime: "8 min read",
    comments: 15,
    views: 2134,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for Digital Nomad Essentials: Work From Anywhere.",
    tags: [],
    slug: "digital-nomad-essentials-work-from-anywhere",
  },
  {
    title: "The Rise of Foldable Smartphones",
    excerpt:
      "Are foldable phones the future? We examine the pros and cons of this emerging technology.",
    category: "Technology",
    image: "/blog/blog-recent-4.jpg",
    author: {
      name: "Lisa Park",
      avatar: "/blog/comments-3.jpg",
    },
    date: new Date("2023-05-12"),
    readTime: "6 min read",
    comments: 23,
    views: 3201,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for The Rise of Foldable Smartphones.",
    tags: [],
    slug: "the-rise-of-foldable-smartphones",
  },
  {
    title: "Minimalist Wardrobe: Less is More",
    excerpt:
      "How to build a versatile wardrobe with fewer, high-quality pieces.",
    category: "Fashion",
    image: "/blog/blog-recent-5.jpg",
    author: {
      name: "Robert Brown",
      avatar: "/blog/comments-6.jpg",
    },
    date: new Date("2023-05-10"),
    readTime: "4 min read",
    comments: 7,
    views: 1245,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for Minimalist Wardrobe: Less is More.",
    tags: [],
    slug: "minimalist-wardrobe-less-is-more",
  },
  {
    title: "Budget Travel Tips for Europe",
    excerpt:
      "See the best of Europe without breaking the bank with these insider tips.",
    category: "Travel",
    image: "/blog/blog-recent-5.jpg",
    author: {
      name: "Anna Schmidt",
      avatar: "/blog/comments-4.jpg",
    },
    date: new Date("2023-05-08"),
    readTime: "9 min read",
    comments: 19,
    views: 2876,
    authorId: new mongoose.Types.ObjectId("68332e909190ee0fe4528689"),
    status: "published",
    content: "Sample content for Budget Travel Tips for Europe.",
    tags: [],
    slug: "budget-travel-tips-for-europe",
  },
]

export default async function SeedSidebarPosts() {
  let status = "idle"
  let error = null

  try {
    await connectToDB()
    status = "loading"

    await BlogPost.insertMany(posts)
    console.log("Seeded sidebar posts!")

    status = "done"
    await mongoose.disconnect()
  } catch (err) {
    error = err.message || "Unknown error"
    status = "error"
  }

  return (
    <div>
      <h1>Seed Database</h1>
      {status === "done" && (
        <p style={{ color: "green" }}>
          Seeding complete!
          <br />
          Sidebar blog posts have been seeded.
        </p>
      )}
      {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
      {status === "idle" && <p>Ready to seed.</p>}
      {status === "loading" && <p>Seeding in progress...</p>}
    </div>
  )
}