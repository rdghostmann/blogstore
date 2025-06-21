import React from "react"
import AdminUsersPage from "./AdminUsersPage"
import { getAllUsers } from "@/controllers/getAllUsers"

export default async function Page() {
  const users = await getAllUsers()
  return <AdminUsersPage users={users} />
}