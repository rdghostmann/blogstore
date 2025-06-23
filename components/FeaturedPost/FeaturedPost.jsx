"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import FeaturedPostCard from "@/components/featured-post-card"
import AnimatedHeading from "@/components/animated-heading"
import { useInView } from "framer-motion"
import { getFeaturedBlogPosts } from "@/controllers/getRecentBlogPost"


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
    const [featuredPosts, setFeaturedPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getFeaturedBlogPosts()
            setFeaturedPosts(posts)
        }
        fetchPosts()
    }, [])

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
