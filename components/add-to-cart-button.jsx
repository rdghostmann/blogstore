"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"



export function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)

  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-9 w-9 bg-blue-300 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  )
}