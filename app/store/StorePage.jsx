"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import ProductCard from "@/components/product-card"
import FilterSidebar from "@/components/filter-sidebar"
import NewsletterSection from "@/components/newsletter-section"
import ParallaxCTA from "@/components/parallax-cta"
import AnimatedHeading from "@/components/animated-heading"
import AdsBanner from "@/components/ads-banner"
import ShowcaseStore from "@/components/ShowcaseStore/ShowcaseStore"
import PartnersSection from "@/components/PartnersSection/PartnersSection"


// Sample data for hero slider
const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2023",
    excerpt: "Discover our new arrivals for the summer season",
    image: "/post-landscape-3.jpg",
    link: "/collection/summer"
  },
  {
    id: 2,
    title: "Limited Edition Electronics",
    excerpt: "Premium gadgets with exclusive discounts",
    image: "/post-landscape-3.jpg",
    link: "/collection/electronics"
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    excerpt: "Eco-friendly clothing for conscious consumers",
    image: "/post-landscape-3.jpg",
    link: "/collection/sustainable"
  }
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
      staggerChildren: 0.1,
    },
  },
}

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function StorePage({featuredProducts, products }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`)
    }

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Initialize
    handleResize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const productsRef = useRef(null)
  const newsletterRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.3 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.3 })
  const newsletterInView = useInView(newsletterRef, { once: true, amount: 0.3 })

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <div className="pt-16">
      {/* Top Banner Ad */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <AdsBanner type="banner" size="medium" />
        </div>
      </div>

      {/* Hero Section */}
      <ShowcaseStore />

      {/* Partners section  */}
      <PartnersSection />

      {/* Featured Products Carousel */}
      <section id="featured" ref={featuredRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-10"
          >
            <AnimatedHeading title="Featured Products" subtitle="Our most popular and trending items" gradient={true} />
          </motion.div>

          <Splide
            options={{
              perPage: 4,
              gap: "1.5rem",
              arrows: true,
              pagination: false,
              breakpoints: {
                1024: {
                  perPage: 3,
                },
                768: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
              },
            }}
          >
            {featuredProducts.map((product) => (
              <SplideSlide key={product.id}>
                <ProductCard product={product} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>

      {/* Inline Ad */}
      <div className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AdsBanner type="inline" size="medium" />
        </div>
      </div>

      {/* Categories Banner */}
      <section className="py-10 bg-gradient-to-r from-blue-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Electronics", "Clothing", "Accessories", "Home"].map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-32 md:h-40 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setActiveCategory(category.toLowerCase())}
              >
                <Image
                  src={`/placeholder-category-${category.toLowerCase()}.jpg`}
                  alt={category}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <ParallaxCTA
        title="Limited Time Offer"
        description="Get 20% off on all products with code SUMMER20. Hurry, offer ends soon!"
        buttonText="Shop Now"
        buttonLink="#featured"
        backgroundImage="/placeholder-offer.jpg"
      />

      {/* All Products Section with Filters */}
      <section ref={productsRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-between mb-10"
          >
            <AnimatedHeading title="All Products" subtitle="Browse our complete collection" gradient={true} />
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar - Only shown on larger screens or when toggled */}
            {(showFilters || isLargeScreen) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 space-y-6"
              >
                <FilterSidebar
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  onClose={() => setShowFilters(false)}
                />
                <AdsBanner type="sidebar" size="large" />
              </motion.div>
            )}

            {/* Products Grid */}
            <div className={`${showFilters || isLargeScreen ? "lg:col-span-3" : "lg:col-span-4"}`}           >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No products found in this category.</p>
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        ref={newsletterRef}
        className="py-16 relative overflow-hidden"
        style={{
          backgroundImage: "url('/about-company-2.jpg')",
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
    </div>
  )
}