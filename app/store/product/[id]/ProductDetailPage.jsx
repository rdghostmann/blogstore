"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, Truck, Shield, RotateCcw, ChevronRight, Home, Minus, Plus } from "lucide-react"
import ProductCard from "@/components/product-card"
import AdsBanner from "@/components/ads-banner"
import { AddToCartButton } from "@/components/add-to-cart-button"


export default function ProductDetailPage({ relatedProducts, sampleProduct }) {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

    // Ensure images is always an array and fallback to image or placeholder
  const images =
    Array.isArray(sampleProduct.images) && sampleProduct.images.length > 0
      ? sampleProduct.images
      : sampleProduct.image
        ? [sampleProduct.image]
        : ["/placeholder.svg"]

   const discountPercentage = sampleProduct.discountPrice
    ? Math.round(((sampleProduct.price - sampleProduct.discountPrice) / sampleProduct.price) * 100)
    : 0

  return (
    <div className="pt-16">
      {/* Top Banner Ad */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <AdsBanner type="banner" size="small" />
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/store" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
              Store
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/store/category/${sampleProduct.category.toLowerCase()}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
            >
              {sampleProduct.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100 truncate">{sampleProduct.name}</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Product Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-96 md:h-[500px] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={sampleProduct.name}
                    fill
                    className="object-cover"
                  />
                  {sampleProduct.discountPrice && (
                    <Badge className="absolute top-4 left-4 bg-accent text-white">{discountPercentage}% OFF</Badge>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-primary-500" : "border-gray-200 dark:border-gray-700"
                        }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${sampleProduct.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <Badge className="mb-2">{sampleProduct.category}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{sampleProduct.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{sampleProduct.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-amber-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(sampleProduct.rating) ? "fill-current" : "fill-none"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {sampleProduct.rating} ({sampleProduct.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    {sampleProduct.discountPrice ? (
                      <>
                        <span className="text-2xl font-bold text-primary-600">
                          ${sampleProduct.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-lg line-through text-gray-500">${sampleProduct.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary-600">${sampleProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                  {sampleProduct.inStock ? (
                    <p className="text-green-600 text-sm">✓ In stock ({sampleProduct.stockCount} available)</p>
                  ) : (
                    <p className="text-red-600 text-sm">✗ Out of stock</p>
                  )}
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= (sampleProduct.stockCount || 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <AddToCartButton product={sampleProduct} />
                    <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    </Button>
                  </div>
                </div>

                {/* Features */}
                {sampleProduct.features && sampleProduct.features.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Key Features:</h3>
                    <ul className="space-y-1">
                      {sampleProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm font-medium">Free Shipping</p>
                      <p className="text-xs text-gray-500">Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm font-medium">2 Year Warranty</p>
                      <p className="text-xs text-gray-500">Full coverage</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm font-medium">30-Day Returns</p>
                      <p className="text-xs text-gray-500">No questions asked</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Inline Ad */}
            <div className="my-8 mx-auto">
              <AdsBanner type="inline" size="medium" />
            </div>

            {/* Product Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({sampleProduct.reviewCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{sampleProduct.description}</p>
                    {sampleProduct.features && sampleProduct.features.length > 0 && (
                      <>
                        <h3>Features</h3>
                        <ul>
                          {sampleProduct.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleProduct.specifications &&
                      Object.entries(sampleProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    {sampleProduct.reviews && sampleProduct.reviews.length > 0 ? (
                      sampleProduct.reviews.map((review, idx) => (
                        <div key={review.id || idx} className="border-b pb-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                              <AvatarFallback>{review.user?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-current text-amber-500" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Related Products */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <AdsBanner type="sidebar" size="large" />

            {/* Recently Viewed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Recently Viewed</h3>
              <div className="space-y-3">
                {relatedProducts.slice(0, 3).map((product) => (
                  <Link key={product.id} href={`/store/product/${product.id}`} className="flex space-x-3 group">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-primary-600 font-semibold text-sm">
                        ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
