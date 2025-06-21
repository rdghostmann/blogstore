import { notFound } from "next/navigation"
import ProductDetailPage from "./ProductDetailPage"
import { getSampleProduct } from "@/controllers/getSampleProduct"
import { getRelatedProduct } from "@/controllers/getRelatedProduct"

export default async function Page({ params }) {
  const { id } = params

  const sampleProduct = await getSampleProduct(id)
  if (!sampleProduct) return notFound()

  const relatedProducts = await getRelatedProduct(sampleProduct.category, id)

  return (
    <ProductDetailPage
      sampleProduct={sampleProduct}
      relatedProducts={relatedProducts}
    />
  )
}