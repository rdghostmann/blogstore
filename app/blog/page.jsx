import React, { Suspense } from "react";
import { getAllBlogPosts } from "@/controllers/getAllBlogPost"
import BlogPage from "./BlogPage"

export const metadata = {
  title: "Blog | Modern Web App",
  description: "Read our latest articles and insights on web development, design, and technology.",
}

export default async function Page() {
  const blogPosts = await getAllBlogPosts();

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Our Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          No blog posts available at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
        <p className="mt-4 text-slate-500 md:text-xl dark:text-slate-400 max-w-[700px]">
          Stay updated with our latest articles and insights on web development, design, and technology.
        </p>
      </div>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
      }>
        <BlogPage blogPosts={blogPosts} />
      </Suspense>
    </div>
  )
}