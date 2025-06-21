"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import NewsletterSection from "../newsletter-section"
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
const Newsletter = () => {
    const newsletterRef = useRef(null)

    const newsletterInView = useInView(newsletterRef, { once: true, amount: 0.3 })
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
    return (
        <section
            ref={newsletterRef}
            className="py-16 relative overflow-hidden"
            style={{
                // backgroundImage: "url('/news_letter.png')",
                backgroundImage: "url('/blog/blog-2.jpg')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 bg-primary-600/80 backdrop-blur-sm"></div>
            <div className="container mx-auto px-4">
                <motion.div initial="hidden" animate={newsletterInView ? "visible" : "hidden"} variants={fadeInUp}>
                    <NewsletterSection />
                </motion.div>
            </div>
        </section>
    )
}

export default Newsletter
