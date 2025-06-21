// HeroSection.jsx
"use client"
import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { motion } from "framer-motion"
import Link from "next/link"

const slides = [
    {
        title: "The Best Homemade Masks for Face (keep the Pimples Away)",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque est mollitia!",
        image: "/post-slide-1.jpg",
        link: "/single-post",
    },
    {
        title:
            "17 Pictures of Medium Length Hair in Layers That Will Inspire Your New Haircut",
        excerpt:
            "Beatae minima assumenda repellat harum vero, officiis ipsam magnam obcaecati cumque maxime inventore.",
        image: "/post-slide-2.jpg",
        link: "/single-post",
    },
    {
        title:
            "13 Amazing Poems from Shel Silverstein with Valuable Life Lessons",
        excerpt:
            "Repudiandae quidem necessitatibus rem atque. Discover insights from timeless poetry.",
        image: "/post-slide-3.jpg",
        link: "/single-post",
    },
    {
        title: "9 Half-up/half-down Hairstyles for Long and Medium Hair",
        excerpt:
            "Stylish and versatile hairstyles for any occasion. Explore the best looks now.",
        image: "/post-slide-4.jpg",
        link: "/single-post",
    },
]

const fadeVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const HeroSection = () => {
    return (
        <section
            id="slider"
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeVariant}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Explore Top Stories
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Handpicked articles with inspiration, lifestyle, and trends for you.
                    </p>
                </motion.div>

                <Splide
                    options={{
                        type: "loop",
                        speed: 600,
                        autoplay: true,
                        interval: 5000,
                        pauseOnHover: true,
                        arrows: false,
                        pagination: true,
                    }}
                    className="rounded-lg overflow-hidden"
                >
                    {slides.map((slide, index) => (
                        <SplideSlide key={index}>
                            <div
                                className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-end p-6 md:p-10"
                                style={{
                                    backgroundImage: `url('${slide.image}')`,
                                }}
                            >
                                <div className="bg-black/60 p-6 rounded-md max-w-2xl">
                                    <motion.h3
                                        className="text-2xl md:text-lg font-bold mb-3"
                                        initial="hidden"
                                        whileInView="visible"
                                        variants={fadeVariant}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={slide.link} className="hover:underline">
                                            {slide.title}
                                        </Link>
                                    </motion.h3>
                                    <motion.p
                                        className="text-sm md:text-lg text-gray-300"
                                        initial="hidden"
                                        whileInView="visible"
                                        variants={fadeVariant}
                                        viewport={{ once: true }}
                                    >
                                        {slide.excerpt}
                                    </motion.p>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    )
}

export default HeroSection;
