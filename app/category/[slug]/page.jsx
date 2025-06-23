import Header from "@/components/header"
import CategoryPage from "./CategoryPage"
import { getAllBlogPosts } from "@/controllers/getAllBlogPost"
import Footer from "@/components/footer"

export default async function page() {
  const allPosts = await getAllBlogPosts()

  return (
    <>
      <Header />
      <CategoryPage allPosts={allPosts} />
      <Footer />
    </>
  )
}
