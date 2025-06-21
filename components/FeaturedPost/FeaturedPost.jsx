"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import FeaturedPostCard from "@/components/featured-post-card"
import AnimatedHeading from "@/components/animated-heading"
import { useInView } from "framer-motion"


// Sample data for featured posts
const featuredPosts = [
    {
        id: 1,
        title: "The Future of AI in Everyday Technology",
        excerpt: "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
        category: "Technology",
        image: "/post-slide-1.jpg",
        author: {
            name: "Alex Johnson",
            avatar: "/team/team-1.jpg",
        },
        date: "May 28, 2023",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "Summer Fashion Trends to Watch in 2023",
        excerpt: "The hottest styles, colors, and accessories that will dominate the fashion scene this summer.",
        category: "Fashion",
        image: "/post-slide-2.jpg",
        author: {
            name: "Emma Davis",
            avatar: "/team/team-2.jpg",
        },
        date: "May 25, 2023",
        readTime: "4 min read",
    },
    {
        id: 3,
        title: "Hidden Gems: Unexplored Travel Destinations",
        excerpt: "Discover these lesser-known but breathtaking locations for your next adventure.",
        category: "Travel",
        image: "/post-slide-3.jpg",
        author: {
            name: "Michael Wong",
            avatar: "/team/team-3.jpg",
        },
        date: "May 22, 2023",
        readTime: "6 min read",
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
const FeaturedPost = () => {
    const featuredRef = useRef(null)


    const featuredInView = useInView(featuredRef, { once: true, amount: 0.3 })
     useEffect(() => {
       const handleScroll = () => {
         document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`)
       }
   
       window.addEventListener("scroll", handleScroll)
       return () => window.removeEventListener("scroll", handleScroll)
     }, [])

    return (
        <section
            ref={featuredRef}
            className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    animate={featuredInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="mb-10"
                >
                    <AnimatedHeading title="Featured Posts" subtitle="Discover our most popular articles" gradient={true} />
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={featuredInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {featuredPosts.map((post) => (
                        <FeaturedPostCard key={post.id} post={post} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedPost
