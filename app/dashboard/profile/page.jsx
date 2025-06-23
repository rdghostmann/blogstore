import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import UserProfilePage from "./ProfilePage"
import { Suspense } from "react"
import Loading from "@/app/loading"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <Suspense fallback={<Loading />}>
      <UserProfilePage user={user} />
    </Suspense>
  )
}