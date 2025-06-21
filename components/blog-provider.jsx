"use client"

import { createContext, useContext, useState } from "react"

const BlogContext = createContext(null)

// Extended blog posts with author information
const mockBlogPosts = [
  {
    id: "1",
    title: "10 JavaScript Tricks You Didn't Know",
    excerpt: "Discover advanced JavaScript techniques that will level up your coding skills.",
    content: `
      <p>JavaScript continues to evolve, and with each passing year, new features and techniques emerge that can make your code more efficient, readable, and powerful.</p>
      
      <h2>1. Optional Chaining</h2>
      <p>Optional chaining (?.) is a safe way to access nested object properties, even when an intermediate property doesn't exist.</p>
      <pre><code>const name = user?.profile?.name;</code></pre>
      
      <h2>2. Nullish Coalescing</h2>
      <p>The nullish coalescing operator (??) provides a way to provide a default value when dealing with null or undefined.</p>
      <pre><code>const username = user.name ?? 'Anonymous';</code></pre>
    `,
    date: "May 12, 2025",
    authorId: "2",
    authorName: "Jane Smith",
    category: "Development",
    status: "published",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "The Future of Web Design in 2025",
    excerpt: "Explore the latest trends and technologies shaping the future of web design.",
    content: `<p>As we move further into 2025, web design continues to evolve at a rapid pace.</p>`,
    date: "May 8, 2025",
    authorId: "4",
    authorName: "Alex Johnson",
    category: "Design",
    status: "published",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Building Accessible Web Applications",
    excerpt: "Learn how to create web applications that are accessible to everyone.",
    content: `<p>Web accessibility is not just a legal requirement.</p>`,
    date: "May 5, 2025",
    authorId: "2",
    authorName: "Jane Smith",
    category: "Accessibility",
    status: "draft",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(mockBlogPosts)

  const addPost = (postData) => {
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      date: new Date().toLocaleDateString(),
      status: "draft",
    }
    setPosts((prev) => [...prev, newPost])
    return newPost
  }

  const updatePost = (postId, postData) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...postData } : p)))
  }

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }

  const getPostsByAuthor = (authorId) => {
    return posts.filter((post) => post.authorId === authorId)
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        getPostsByAuthor,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
