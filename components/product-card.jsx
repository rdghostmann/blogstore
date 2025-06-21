"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button";


export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }


  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full">
        <div
          className="relative h-64 w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/store/product/${product.id}`}>
            {/* <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              priority
            /> */}

            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{
                backgroundImage: `url(${product.image || "/placeholder.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              aria-label={product.name}
            />

            {/* Product badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
              {product.discountPrice && (
                <Badge className="bg-stone-400 hover:bg-gray-400">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Quick actions */}
            <motion.div
              className="absolute bottom-3 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex gap-1">
                <AddToCartButton product={product} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-accent-500 text-accent-500" : ""}`} />
                </Button>
              </div>
            </motion.div>
          </Link>
        </div>

        <CardContent className="p-4">
          <Link href={`/store/product/${product.id}`} className="block">
            <h3 className="font-medium mb-1 hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "fill-none"}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviewCount})</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {product.discountPrice ? (
                <p className="text-sm line-through text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</p>
              ) : null}
              <p className="text-lg font-semibold text-primary-600">
                ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4 text-amber-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
