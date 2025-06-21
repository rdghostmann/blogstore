"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart-store"

export default function Cart() {
  const openCart = useCartStore((state) => state.openCart)
  const items = useCartStore((state) => state.items)

  return (
    <Button className="relative" onClick={openCart} aria-label="Open cart">
      <ShoppingCart className="h-5 w-5" />
      {items.length > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {items.length}
        </Badge>
      )}
    </Button>
  )
}