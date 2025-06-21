import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import CheckoutPage from "./CheckoutPage"

export default async function Checkout() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/sign-in")
  }

  const { email } = session.user

  return <CheckoutPage email={email} />
}
