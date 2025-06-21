import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import UserProfilePage from "./ProfilePage"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return <UserProfilePage user={user} />
}