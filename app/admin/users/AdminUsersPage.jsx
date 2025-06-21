"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Trash2, Edit, UserX, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { UserActions } from "@/components/UserActions/UserActions"

export default function AdminUsersPage({ users }) {

   console.log(users)

   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
   const [editingUser, setEditingUser] = useState(null)
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      role: "user",
   })

   const openEditDialog = (userToEdit) => {
      setEditingUser(userToEdit)
      setFormData({
         name: userToEdit.name,
         email: userToEdit.email,
         role: userToEdit.role,
      })
      setIsEditDialogOpen(true)
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
                     <form onSubmit={() => { }}>
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
                           {users.map((userItem) => (
                              <tr key={userItem.id} className="border-b">
                                 <td className="p-4 font-medium">{userItem.username}</td>
                                 <td className="p-4">{userItem.email}</td>
                                 <td className="p-4">
                                    <Badge
                                       variant={
                                          userItem.role === "admin" ? "default" : userItem.role === "writer" ? "secondary" : "outline"
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
                                    <UserActions
                                       user={userItem}
                                       onEdit={openEditDialog}
                                    />
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
                  <form onSubmit={() => { }}>
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
