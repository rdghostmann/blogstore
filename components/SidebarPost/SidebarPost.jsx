"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/post-card"
import AnimatedHeading from "@/components/animated-heading"
import TrendingPosts from "@/components/trending-posts"
import CategoryButtons from "@/components/category-buttons"

const SidebarPostClient = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("all")
  const latestRef = useRef(null)
  const filteredPosts = activeTab === "all"
    ? posts
    : posts.filter((post) => post.category.toLowerCase() === activeTab)

  return (
    <section ref={latestRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <AnimatedHeading title="Latest Articles" subtitle="Stay updated with our newest content" gradient={true} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="mb-10">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
                <TabsTrigger value="technology" onClick={() => setActiveTab("technology")}>Technology</TabsTrigger>
                <TabsTrigger value="fashion" onClick={() => setActiveTab("fashion")}>Fashion</TabsTrigger>
                <TabsTrigger value="travel" onClick={() => setActiveTab("travel")}>Travel</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <TrendingPosts />
            <CategoryButtons activeCategory={activeTab} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SidebarPostClient
