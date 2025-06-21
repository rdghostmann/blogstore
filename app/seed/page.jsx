import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import Product from "@/models/Product"

export const dynamic = "force-dynamic"

const products = [
  {
    name: "Premium Wireless Headphones",
    brand: "TechSound",
    sku: "TS-WH-001",
    price: 199.99,
    discountPrice: 149.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    image: "/placeholder-headphones.png",
    rating: 4.8,
    reviewCount: 124,
    category: "Electronics",
    inStock: true,
    stockCount: 15,
    description:
      "Experience premium audio quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design.",
    isNewArrival: true,
    isFeatured: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort design",
      "Bluetooth 5.0 connectivity",
      "Quick charge technology",
      "Voice assistant compatible",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
    },
    reviews: [
      {
        user: "John D.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "May 15, 2023",
        comment: "Excellent sound quality and comfort. The noise cancellation works perfectly!",
      },
      {
        user: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "May 10, 2023",
        comment: "Great headphones, but the price could be better. Overall satisfied with the purchase.",
      },
    ],
  },
  {
    name: "Minimalist Leather Watch",
    price: 89.99,
    discountPrice: null,
    images: ["/minimalist-leather-watch.jpg"],
    image: "/minimalist-leather-watch.jpg",
    rating: 4.5,
    reviewCount: 86,
    category: "Accessories",
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    stockCount: 10,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    discountPrice: 24.99,
    images: ["/organic-cotton-t-shirt.jpg"],
    image: "/organic-cotton-t-shirt.jpg",
    rating: 4.7,
    reviewCount: 215,
    category: "Clothing",
    isNewArrival: true,
    isFeatured: true,
    inStock: true,
    stockCount: 30,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Smart Fitness Tracker",
    price: 129.99,
    discountPrice: 99.99,
    images: ["/placeholder-smartwatch.png"],
    image: "/placeholder-smartwatch.png",
    rating: 4.6,
    reviewCount: 178,
    category: "Electronics",
    isNewArrival: false,
    isFeatured: true,
    inStock: true,
    stockCount: 20,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    discountPrice: 59.99,
    images: ["/placeholder-smartwatch.png"],
    image: "/placeholder-smartwatch.png",
    rating: 4.4,
    reviewCount: 92,
    category: "Electronics",
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    stockCount: 25,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Handcrafted Ceramic Mug",
    price: 24.99,
    discountPrice: null,
    images: ["/ceramic-mug.jpg"],
    image: "/ceramic-mug.jpg",
    rating: 4.9,
    reviewCount: 67,
    category: "Home",
    isNewArrival: true,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Recycled Canvas Backpack",
    price: 59.99,
    discountPrice: null,
    images: ["/canvas-backpack.jpg"],
    image: "/canvas-backpack.jpg",
    rating: 4.7,
    reviewCount: 103,
    category: "Accessories",
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    stockCount: 18,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    discountPrice: 19.99,
    images: ["/stainless-steel-water-bottle.jpg"],
    image: "/stainless-steel-water-bottle.jpg",
    rating: 4.8,
    reviewCount: 156,
    category: "Home",
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    stockCount: 50,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Wireless Charging Pad",
    price: 39.99,
    discountPrice: null,
    images: ["/placeholder-charger.png"],
    image: "/placeholder-charger.png",
    rating: 4.5,
    reviewCount: 88,
    category: "Electronics",
    isNewArrival: true,
    isFeatured: false,
    inStock: true,
    stockCount: 22,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Laptop Stand with Cooling Fan",
    price: 44.99,
    discountPrice: 34.99,
    images: ["/placeholder-stand.png"],
    image: "/placeholder-stand.png",
    rating: 4.6,
    reviewCount: 72,
    category: "Home",
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    stockCount: 12,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Sustainable Bamboo Toothbrush",
    price: 9.99,
    discountPrice: null,
    images: ["/bamboo-toothbrush.jpg"],
    image: "/bamboo-toothbrush.jpg",
    rating: 4.7,
    reviewCount: 203,
    category: "Health",
    isNewArrival: false,
    isFeatured: false,
    inStock: true,
    stockCount: 100,
    features: [],
    specifications: {},
    reviews: [],
  },
  {
    name: "Organic Lip Balm Set",
    price: 14.99,
    discountPrice: 12.99,
    images: ["/organic-lip-balm-set.jpg"],
    image: "/organic-lip-balm-set.jpg",
    rating: 4.8,
    reviewCount: 118,
    category: "Health",
    isNewArrival: true,
    isFeatured: false,
    inStock: true,
    stockCount: 60,
    features: [],
    specifications: {},
    reviews: [],
  },
]

export default async function SeedPage() {
  let status = "idle"
  let error = null

  try {
    await connectToDB()
    status = "loading"

    // Remove all existing products before seeding
    await Product.deleteMany({})

    // Insert new products
    await Product.insertMany(products)

    status = "done"
    await mongoose.disconnect()
  } catch (err) {
    error = err.message || "Unknown error"
    status = "error"
  }

  return (
    <div>
      <h1>Seed Database</h1>
      {status === "done" && (
        <p style={{ color: "green" }}>
          Seeding complete!<br />
          Products have been seeded.
        </p>
      )}
      {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
      {status === "idle" && <p>Ready to seed.</p>}
      {status === "loading" && <p>Seeding in progress...</p>}
    </div>
  )
}