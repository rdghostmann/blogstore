import CategoryPage from "./CategoryPage"
import { getAllBlogPosts } from "@/controllers/getAllBlogPost"

export default async function page() {
  const allPosts = await getAllBlogPosts()

  return (
    <>
      <CategoryPage allPosts={allPosts} />
    </>
  )
}
