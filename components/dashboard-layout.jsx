"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, FileText, ShoppingBag, Settings, Menu, X, Home, PlusCircle, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoutBtn from "./LogOut/LogOutBtn"
import { useSession } from "next-auth/react"

export default function DashboardLayout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user || {
    username: "Guest",
    email: "guest@example.com",
  }

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { href: "/admin", label: "Dashboard", icon: Home },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/posts", label: "Blog Posts", icon: FileText },
          { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
        ]
      case "writer":
        return [
          { href: "/writer", label: "Dashboard", icon: Home },
          { href: "/writer/posts", label: "My Posts", icon: FileText },
          { href: "/writer/posts/new", label: "New Post", icon: PlusCircle },
        ]
      case "user":
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
          { href: "/dashboard/profile", label: "Profile", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/" className="text-xl font-bold">
            ModernApp
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {role?.charAt(0).toUpperCase() + role?.slice(1)} Panel
            </p>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${pathname === item.href
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">{user?.name || user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <LogoutBtn />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b h-16 flex items-center justify-between px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  )
}