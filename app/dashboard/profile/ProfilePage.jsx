"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    User,
    Mail,
    Calendar,
    Shield,
    Edit2,
    Save,
    X,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { getUserProfile } from "@/controllers/getUserProfile"
import ActivitySummary from "./ActivitySummary"
import { toast } from "sonner"

export default function UserProfilePage({ user }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
        createdAt: "",
    })

    useEffect(() => {
        async function fetchProfile() {
            if (!user?.id) {
                router.push("/sign-in")
                return
            }
            const profile = await getUserProfile(user.id)
            if (profile) {
                setFormData(profile)
            }
        }
        fetchProfile()
    }, [user?.id, router])

    if (!user || user.role !== "user") return null

    const getInitials = (username = "") =>
        username.split(" ").map((n) => n[0]).join("").toUpperCase()

    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case "admin":
                return "default"
            case "writer":
                return "secondary"
            case "user":
                return "outline"
            default:
                return "outline"
        }
    }

    const handleCancel = () => {
        setFormData({
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
        })
        setIsEditing(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            // await updateUserProfile(user.id, formData)
            setIsEditing(false)
            toast({ title: "Profile updated successfully!" })
        } catch (error) {
            toast({ title: "Failed to update profile", variant: "destructive" })
        }
    }

    return (
        <DashboardLayout role={user?.role || "user"}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your account information and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/placeholder.svg" alt={formData.username} />
                                    <AvatarFallback className="text-lg">{getInitials(formData.username)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle>{formData.username}</CardTitle>
                            <CardDescription>{formData.email}</CardDescription>
                            <div className="flex justify-center mt-2">
                                <Badge variant={getRoleBadgeVariant(formData.role)}>{formData.role}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span>Member since {formData.createdAt}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    <span>Account Status: {formData.status}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Editable Profile Info */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details and contact information</CardDescription>
                            </div>
                            {!isEditing ? (
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCancel}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button size="sm" type="submit" form="profile-form">
                                        <Save className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSave} id="profile-form" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        {isEditing ? (
                                            <Input
                                                id="name"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span>{formData.username}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        {isEditing ? (
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="Enter your email address"
                                                required
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span>{formData.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Account Role</Label>
                                        <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                                            <Shield className="h-4 w-4 text-gray-500" />
                                            <span className="capitalize">{formData.role}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Member Since</Label>
                                        <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>{formData.createdAt}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Account Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences and security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-medium">Email Notifications</h3>
                                    <p className="text-sm text-gray-500">Receive email updates about your orders and account</p>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-medium">Privacy Settings</h3>
                                    <p className="text-sm text-gray-500">Control who can see your profile and activity</p>
                                </div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-medium">Change Password</h3>
                                    <p className="text-sm text-gray-500">Update your account password for security</p>
                                </div>
                                <Button variant="outline" size="sm">Update</Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                                <div>
                                    <h3 className="font-medium text-red-900 dark:text-red-100">Delete Account</h3>
                                    <p className="text-sm text-red-700 dark:text-red-300">
                                        Permanently delete your account and all associated data
                                    </p>
                                </div>
                                <Button variant="destructive" size="sm">Delete Account</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Summary */}
                <ActivitySummary userId={user.id} />
            </div>
        </DashboardLayout>
    )
}
