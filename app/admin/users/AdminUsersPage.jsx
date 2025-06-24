"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { UserActions } from "@/components/UserActions/UserActions"
import { updateUser } from "@/controllers/UpdateUser"
import { registerUser } from "@/controllers/registerUser"
import { toast } from "sonner"

export default function AdminUsersPage({ users }) {
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
   const [editingUser, setEditingUser] = useState(null)
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      role: "user",
      password: "",
      phone: "",
   })
   const [userList, setUserList] = useState(users)

   const openEditDialog = (userToEdit) => {
      setEditingUser(userToEdit)
      setFormData({
         name: userToEdit.name || userToEdit.username || "",
         email: userToEdit.email || "",
         role: userToEdit.role || "user",
         password: "",
         phone: userToEdit.phone || "",
      })
      setIsEditDialogOpen(true)
   }

   // Handle Edit User Submit
   const handleEditSubmit = async (e) => {
      e.preventDefault()
      if (!editingUser) return

      try {
         const updated = await updateUser(editingUser.id, {
            name: formData.name,
            email: formData.email,
            role: formData.role,
         })
         if (updated) {
            toast.success("User updated successfully")
            // Update local user list
            setUserList((prev) =>
               prev.map((u) =>
                  u.id === editingUser.id
                     ? { ...u, name: formData.name, email: formData.email, role: formData.role }
                     : u
               )
            )
            setIsEditDialogOpen(false)
         } else {
            toast.error("Failed to update user")
         }
      } catch (err) {
         toast.error("Error updating user")
      }
   }

   // Handle Add User Submit
   const handleAddSubmit = async (e) => {
      e.preventDefault()
      // Validate required fields
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
         toast.error("All fields are required")
         return
      }
      try {
         const result = await registerUser({
            username: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
         })
         if (result.success) {
            toast.success("User added successfully")
            setUserList((prev) => [
               ...prev,
               {
                  id: Math.random().toString(36).slice(2), // Temporary ID, ideally refetch from server
                  name: formData.name,
                  email: formData.email,
                  role: formData.role,
                  status: "active",
                  createdAt: new Date().toLocaleDateString(),
               },
            ])
            setIsAddDialogOpen(false)
            setFormData({
               name: "",
               email: "",
               role: "user",
               password: "",
               phone: "",
            })
         } else {
            toast.error(result.message || "Failed to add user")
         }
      } catch (err) {
         toast.error("Error adding user")
      }
   }

   return (
      <DashboardLayout role="admin">
         <div className="space-y-6">
            <div className="flex justify-between items-center">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage users and their roles</p>
               </div>

               <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                     <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                     </Button>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account with specified role.</DialogDescription>
                     </DialogHeader>
                     <form onSubmit={handleAddSubmit}>
                        <div className="space-y-4">
                           <div>
                              <Label htmlFor="name">Name</Label>
                              <Input
                                 id="name"
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                 required
                              />
                           </div>
                           <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                 required
                              />
                           </div>
                           <div>
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                 id="phone"
                                 type="tel"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                 required
                              />
                           </div>
                           <div>
                              <Label htmlFor="password">Password</Label>
                              <Input
                                 id="password"
                                 type="password"
                                 value={formData.password}
                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                 required
                              />
                           </div>
                           <div>
                              <Label htmlFor="role">Role</Label>
                              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                                 <SelectTrigger>
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="writer">Writer</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                        <DialogFooter className="mt-6">
                           <Button type="submit">Add User</Button>
                        </DialogFooter>
                     </form>
                  </DialogContent>
               </Dialog>
            </div>

            <Card>
               <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead>
                           <tr className="border-b">
                              <th className="text-left p-4">Name</th>
                              <th className="text-left p-4">Email</th>
                              <th className="text-left p-4">Role</th>
                              <th className="text-left p-4">Status</th>
                              <th className="text-left p-4">Created</th>
                              <th className="text-right p-4">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {userList.map((userItem) => (
                              <tr key={userItem.id} className="border-b">
                                 <td className="p-4 font-medium">{userItem.username || userItem.name}</td>
                                 <td className="p-4">{userItem.email}</td>
                                 <td className="p-4">
                                    <Badge
                                       variant={
                                          userItem.role === "admin"
                                             ? "default"
                                             : userItem.role === "writer"
                                             ? "secondary"
                                             : "outline"
                                       }
                                    >
                                       {userItem.role}
                                    </Badge>
                                 </td>
                                 <td className="p-4">
                                    <Badge variant={userItem.status === "active" ? "default" : "destructive"}>
                                       {userItem.status}
                                    </Badge>
                                 </td>
                                 <td className="p-4">{userItem.createdAt}</td>
                                 <td className="p-4">
                                    <UserActions user={userItem} onEdit={openEditDialog} />
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>

            {/* Edit User Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Edit User</DialogTitle>
                     <DialogDescription>Update user information and role.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit}>
                     <div className="space-y-4">
                        <div>
                           <Label htmlFor="edit-name">Name</Label>
                           <Input
                              id="edit-name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="edit-email">Email</Label>
                           <Input
                              id="edit-email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                           />
                        </div>
                        <div>
                           <Label htmlFor="edit-role">Role</Label>
                           <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="user">User</SelectItem>
                                 <SelectItem value="writer">Writer</SelectItem>
                                 <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                     <DialogFooter className="mt-6">
                        <Button type="submit">Update User</Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>
      </DashboardLayout>
   )
}
