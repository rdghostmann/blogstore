import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "./ui/card"
import { AddToCartButton } from "./add-to-cart-button"
import { getFeaturedProducts } from "@/controllers/getFeaturedProduct"

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {featuredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link href={`/store/${product.id}`}>
              <div className="relative h-48 w-full">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/store/${product.id}`}>
                <h3 className="font-semibold text-lg lg:text-sm mb-1 hover:underline">{product.name}</h3>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-3">{product.description}</p>
              <p className="font-bold">₦{product.price.toFixed(2)}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}