"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Technology",
    description: "Latest gadgets and tech news",
    image: "/post-landscape-1.jpg",
    count: 42,
    slug: "technology",
  },
  {
    name: "Fashion",
    description: "Style guides and trends",
    image: "/post-landscape-2.jpg",
    count: 38,
    slug: "fashion",
  },
  {
    name: "Travel",
    description: "Destinations and travel tips",
    image: "/post-landscape-8.jpg",
    count: 27,
    slug: "travel",
  },
  {
    name: "Lifestyle",
    description: "Living well and personal growth",
    image: "/post-landscape-4.jpg",
    count: 31,
    slug: "lifestyle",
  },
  {
    name: "Food",
    description: "Recipes and culinary adventures",
    image: "/post-landscape-5.jpg",
    count: 19,
    slug: "food",
  },
  {
    name: "Health",
    description: "Wellness and fitness advice",
    image: "/post-landscape-6.jpg",
    count: 23,
    slug: "health",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CategorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <motion.div key={category.slug} variants={cardVariants} transition={{ duration: 0.5, delay: index * 0.1 }}>
          <Link href={`/category/${category.slug}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:border-primary-500 hover:-translate-y-1">
              <div className="relative h-40 w-full">
                <Image src={category.image || "/post-landscape-1.jpg"} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-top from-primary-900/80 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.count} articles</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
