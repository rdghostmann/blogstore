import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-black dark:text-white">
              BlogStore
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A modern blog and store platform with the latest trends in technology, fashion, and travel.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/technology"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/fashion"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  href="/category/travel"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/category/lifestyle"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-white dark:bg-gray-800" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ModernBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
