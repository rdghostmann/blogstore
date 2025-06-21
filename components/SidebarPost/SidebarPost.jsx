"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/post-card"
import AnimatedHeading from "@/components/animated-heading"
import TrendingPosts from "@/components/trending-posts"
import CategoryButtons from "@/components/category-buttons"
import AdsBanner from "@/components/ads-banner"
import { useInView } from "framer-motion"

// Sample data for regular posts
const posts = [
    {
        id: 4,
        title: "How to Build a Smart Home on a Budget",
        excerpt: "Transform your living space with these affordable smart home solutions.",
        category: "Technology",
        image: "/blog/blog-recent-1.jpg",
        author: {
            name: "David Chen",
            avatar: "/blog/comments-2.jpg",
        },
        date: "May 20, 2023",
        readTime: "7 min read",
        comments: 12,
        views: 1543,
    },
    {
        id: 5,
        title: "Sustainable Fashion: Eco-Friendly Brands to Support",
        excerpt: "These fashion brands are leading the way in environmental responsibility.",
        category: "Fashion",
        image: "/blog/blog-recent-3.jpg",
        author: {
            name: "Sophia Martinez",
            avatar: "/blog/comments-1.jpg",
        },
        date: "May 18, 2023",
        readTime: "5 min read",
        comments: 8,
        views: 982,
    },
    {
        id: 6,
        title: "Digital Nomad Essentials: Work From Anywhere",
        excerpt: "The tools and tips you need to successfully work while traveling the world.",
        category: "Travel",
        image: "/blog/blog-recent-2.jpg",
        author: {
            name: "James Wilson",
            avatar: "/blog/comments-5.jpg",
        },
        date: "May 15, 2023",
        readTime: "8 min read",
        comments: 15,
        views: 2134,
    },
    {
        id: 7,
        title: "The Rise of Foldable Smartphones",
        excerpt: "Are foldable phones the future? We examine the pros and cons of this emerging technology.",
        category: "Technology",
        image: "/blog/blog-recent-4.jpg",
        author: {
            name: "Lisa Park",
            avatar: "/blog/comments-3.jpg",
        },
        date: "May 12, 2023",
        readTime: "6 min read",
        comments: 23,
        views: 3201,
    },
    {
        id: 8,
        title: "Minimalist Wardrobe: Less is More",
        excerpt: "How to build a versatile wardrobe with fewer, high-quality pieces.",
        category: "Fashion",
        image: "/blog/blog-recent-5.jpg",
        author: {
            name: "Robert Brown",
            avatar: "/blog/comments-6.jpg",
        },
        date: "May 10, 2023",
        readTime: "4 min read",
        comments: 7,
        views: 1245,
    },
    {
        id: 9,
        title: "Budget Travel Tips for Europe",
        excerpt: "See the best of Europe without breaking the bank with these insider tips.",
        category: "Travel",
        image: "/blog/blog-recent-5.jpg",
        author: {
            name: "Anna Schmidt",
            avatar: "/blog/comments-4.jpg",
        },
        date: "May 8, 2023",
        readTime: "9 min read",
        comments: 19,
        views: 2876,
    },
]
// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}


const SidebarPost = () => {
    const [activeTab, setActiveTab] = useState("all")

    const latestRef = useRef(null)
    // const latestInView = useInView(latestRef, { once: true, amount: 0.3 })

    // useEffect(() => {
    //     const handleScroll = () => {
    //         document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`)
    //     }

    //     window.addEventListener("scroll", handleScroll)
    //     return () => window.removeEventListener("scroll", handleScroll)
    // }, [])

    // Filter posts based on active tab
    const filteredPosts = activeTab === "all" ? posts : posts.filter((post) => post.category.toLowerCase() === activeTab)

    return (
        <section ref={latestRef} className="py-16">
            <div className="container mx-auto px-4">
                {/* <motion.div
                    initial="hidden"
                    animate={latestInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="mb-10"
                > */}
                <div className="mb-10">
                    <AnimatedHeading title="Latest Articles" subtitle="Stay updated with our newest content" gradient={true} />
                </div>
                {/* </motion.div> */}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="all" className="mb-10">
                            <TabsList>
                                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="technology" onClick={() => setActiveTab("technology")}>
                                    Technology
                                </TabsTrigger>
                                <TabsTrigger value="fashion" onClick={() => setActiveTab("fashion")}>
                                    Fashion
                                </TabsTrigger>
                                <TabsTrigger value="travel" onClick={() => setActiveTab("travel")}>
                                    Travel
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {/* <motion.div
                            initial="hidden"
                            animate={latestInView ? "visible" : "hidden"}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        > */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                        {/* </motion.div> */}

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

export default SidebarPost
