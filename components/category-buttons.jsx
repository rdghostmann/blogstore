"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Hash, TrendingUp } from "lucide-react"

const categories = [
  { name: "All", slug: "all", count: 156, color: "bg-gray-500" },
  { name: "Technology", slug: "technology", count: 42, color: "bg-blue-500" },
  { name: "Fashion", slug: "fashion", count: 38, color: "bg-pink-500" },
  { name: "Travel", slug: "travel", count: 27, color: "bg-green-500" },
  { name: "Lifestyle", slug: "lifestyle", count: 31, color: "bg-purple-500" },
  { name: "Food", slug: "food", count: 19, color: "bg-orange-500" },
  { name: "Health", slug: "health", count: 23, color: "bg-teal-500" },
]



export default function CategoryButtons({
  activeCategory = "all",
  showCounts = true,
  layout = "list",
}) {
  return (
    <Card className="">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <Hash className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-bold">Categories</h3>
        </div>

        <div className={layout === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}>
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={activeCategory === category.slug ? "default" : "ghost"}
                asChild
                className="w-full justify-between h-auto p-3"
              >
                <Link href={category.slug === "all" ? "/" : `/category/${category.slug}`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {showCounts && (
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  )}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Most Popular This Week</span>
          </div>
          <div className="space-y-1">
            <Badge variant="outline" className="mr-1 mb-1">
              Technology
            </Badge>
            <Badge variant="outline" className="mr-1 mb-1">
              Travel
            </Badge>
            <Badge variant="outline" className="mr-1 mb-1">
              Lifestyle
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
