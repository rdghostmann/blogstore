"use client"

import dynamic from "next/dynamic"
import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Move the component logic into a separate function
function CartSidebarComponent() {
  const cartOpen = useCartStore((state) => state.cartOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)

  return (
    <>
      {/* Overlay */}
      <div className={`fixed min-h-screen inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden={!cartOpen}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "100%", maxWidth: 400 }}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-64px)]">
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">Your cart is empty</div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{item.description?.slice(0, 40)}...</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                          className="w-14 border rounded px-2 py-1 text-center"
                        />
                        <span className="text-xs">x ₦{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold">₦{getTotal().toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mb-2" disabled={items.length === 0}>
              <Link href="/store/checkout" onClick={closeCart}>Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart} disabled={items.length === 0}>
              Clear Cart
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

// Export as dynamic to disable SSR and fix hydration errors
export const CartSidebar = dynamic(() => Promise.resolve(CartSidebarComponent), { ssr: false })