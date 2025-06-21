import Link from "next/link"
import { ArrowRight, ShoppingBag, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedVideo from "@/components/featured-video"
import FeaturedProducts from "@/components/featured-products"
import RecentPosts from "@/components/recent-posts"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your Modern Digital Hub
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                Discover our blog, shop our products, and watch our <br className="hidden md:block" /> featured videos all in one place.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/blog">Read Blog</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/store">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">
                <div className="flex items-center">
                  <Video className="mr-1 h-4 w-4" />
                  <span>Featured Video</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Video of the Week</h2>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                Check out our latest featured video content.
              </p>
            </div>
            <Suspense fallback={<div className="h-48 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />}>
              <FeaturedVideo />
            </Suspense>
            <Button asChild variant="link">
              <Link href="/videos" className="flex items-center">
                View all videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-4 w-4" />
                  <span>Shop</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                Explore our curated selection of products.
              </p>
            </div>
            <FeaturedProducts />
            <Button asChild variant="link">
              <Link href="/store" className="flex items-center">
                View all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Recent Blog Posts</h2>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                Stay updated with our latest articles and insights.
              </p>
            </div>
            <Suspense fallback={<div className="h-48 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />}>
              <RecentPosts />
            </Suspense>

            <Button asChild variant="link">
              <Link href="/blog" className="flex items-center">
                View all posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
