import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import CartPage from "./CartPage"

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/sign-in")
  }


  return <CartPage />
}
