import Header from "@/components/header"
import CategoryPage from "./CategoryPage"
import { getAllBlogPosts } from "@/controllers/getAllBlogPost"
import Footer from "@/components/footer"
// import { Suspense } from "react"
import Loading from "@/app/loading"

export default async function page() {
  const allPosts = await getAllBlogPosts()
  if (!allPosts) {
    return <div className="container text-center mx-auto px-4 py-8">
      No posts found.
    </div>
  }
  return (
    <>
      <Header />
      {/* <Suspense fallback={<Loading />}> */}
        <CategoryPage allPosts={allPosts} />
      {/* </Suspense> */}
      <Footer />
    </>
  )
}
