"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutBtn({ className = "w-full text-red-500" }) {
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
    >
      <LogOut className="mr-2 h-4 w-4 text-red-600" />
      Logout
    </Button>
  )
}