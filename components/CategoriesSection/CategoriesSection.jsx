"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import AnimatedHeading from "../animated-heading"
import CategorySection from "../category-section"


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
const CategoriesSection = () => {
    const categoriesRef = useRef(null)

    const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.3 })

    useEffect(() => {
        const handleScroll = () => {
            document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <section
            ref={categoriesRef}
            className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    animate={categoriesInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="mb-10"
                >
                    <AnimatedHeading
                        title="Explore Categories"
                        subtitle="Find content that matches your interests"
                        gradient={true}
                    />
                </motion.div>

                <CategorySection />
            </div>
        </section>
    )
}

export default CategoriesSection
