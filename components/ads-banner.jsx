"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink } from "lucide-react"


const adsData = {
  banner: {
    title: "Premium Wireless Headphones - 50% Off",
    description: "Experience crystal-clear audio with our latest noise-canceling technology",
    image: "/placeholder-headphones.png",
    cta: "Shop Now",
    sponsor: "TechSound",
    link: "/store/product/1",
  },
  sidebar: {
    title: "Sustainable Fashion Collection",
    description: "Eco-friendly clothing that doesn't compromise on style",
    image: "/black-apparel.jpg",
    cta: "Explore",
    sponsor: "EcoStyle",
    link: "/store/category/fashion",
  },
  inline: {
    title: "Travel Insurance - Get Protected",
    description: "Comprehensive coverage for your next adventure",
    image: "/blog/blog-recent-4.jpg",
    cta: "Get Quote",
    sponsor: "SafeTravel",
    link: "#",
  },
  popup: {
    title: "Limited Time Offer!",
    description: "Subscribe to our newsletter and get 20% off your first purchase",
    image: "/blog/blog-inside-post.jpg",
    cta: "Subscribe",
    sponsor: "ModernBlog",
    link: "#newsletter",
  },
}

export default function AdsBanner({ type = "banner", size = "medium", position = "top" }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  if (!isVisible) return null

  const ad = adsData[type]
  const isPopup = type === "popup"

  const sizeClasses = {
    small: "h-24",
    medium: "h-32 md:h-40",
    large: "h-48 md:h-56",
  }

  const containerClasses = {
    banner: "w-full",
    sidebar: "w-full max-w-sm",
    inline: "w-full max-w-2xl mx-auto",
    popup: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
  }

  const AdContent = () => (
    <Card
      className={`overflow-hidden ${isPopup ? "max-w-md w-full" : ""} ${isHovered ? "shadow-lg" : ""
        } transition-shadow duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative">
        {/* Close button for popup */}
        {isPopup && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Sponsor badge */}
        <Badge className="absolute top-3 left-3 z-10 bg-black/70 text-white">Sponsored</Badge>

        <div className={`relative ${type === "sidebar" ? "block" : "flex"} ${sizeClasses[size]}`}>
          {/* Image */}
          <div
            className={`relative ${type === "sidebar" ? "w-full h-32" : type === "popup" ? "w-full h-40" : "w-1/3 md:w-1/2"
              } overflow-hidden`}
          >
            <Image
              src={ad.image || "/placeholder.svg"}
              alt={ad.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover bg-center transition-transform duration-300 ${isHovered ? "scale-105" : ""}`}
            />
          </div>

          {/* Content */}
          <div
            className={`${type === "sidebar" ? "p-4" : type === "popup" ? "p-6" : "flex-1 p-4 md:p-6"
              } flex flex-col justify-center`}
          >
            <h3 className={`font-bold mb-2 ${type === "popup" ? "text-xl" : "text-sm md:text-base"}`}>{ad.title}</h3>
            <p className={`text-gray-600 dark:text-gray-400 mb-3 ${type === "sidebar" ? "text-xs" : "text-sm"}`}>
              {ad.description}
            </p>
            <div className="flex items-center justify-between">
              <Button size={type === "sidebar" ? "sm" : "default"} className="flex items-center" asChild>
                <a href={ad.link}>
                  {ad.cta}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <span className="text-xs text-gray-500">by {ad.sponsor}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isPopup) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={containerClasses[type]}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AdContent />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={containerClasses[type]}
    >
      <AdContent />
    </motion.div>
  )
}
