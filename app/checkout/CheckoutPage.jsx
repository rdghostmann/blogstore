"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

export default function CheckoutPage({ email }) {
    const router = useRouter()
    const cartItems = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)
    const subtotal = cartItems.reduce(
        (total, item) => total + (item.discountPrice || item.price) * item.quantity,
        0
    )
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    // Simulate authentication state (replace with your auth logic)
    const [isLoading, setIsLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)


    const [formData, setFormData] = useState({
        email,
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        phone: "",
        paymentMethod: "card",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
        saveInfo: false,
        agreeToTerms: false,
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleCheckboxChange = (name, checked) => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.agreeToTerms) {
            alert("Please agree to the terms and conditions")
            return
        }

        setIsProcessing(true)

        try {
            // Here you would send order data to your backend/payment gateway

            clearCart()
            router.push("/store/order-success")
        } catch (error) {
            console.error("Payment failed:", error)
            alert("Payment failed. Please try again.")
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        // Redirect to cart if cart is empty
        if (cartItems.length === 0 && !isLoading) {
            router.replace("/store/cart")
        }
    }, [cartItems, isLoading, router])

    if (isLoading) {
        return (
            <div className="pt-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }



    return (
        <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Button>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-gray-600 dark:text-gray-400">Complete your order securely</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                            >
                                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Shipping Address */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                            >
                                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <Label htmlFor="zipCode">ZIP Code</Label>
                                            <Input
                                                id="zipCode"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>


                            {/* Payment Method */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                            >
                                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                                <RadioGroup
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                                    className="mb-6"
                                >
                                    <div className="flex items-center space-x-2 p-3 border rounded-md">
                                        <RadioGroupItem value="transfer" id="transfer" />
                                        <Label htmlFor="transfer" className="flex items-center cursor-pointer">
                                            <Truck className="h-4 w-4 mr-2" />
                                            Bank Transfer
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 border rounded-md mb-2">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                                            <CreditCard className="h-4 w-4 mr-2" />
                                            Credit/Debit Card
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {formData.paymentMethod === "card" && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                                <Input
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    placeholder="MM/YY"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input
                                                    id="cvv"
                                                    name="cvv"
                                                    placeholder="123"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="nameOnCard">Name on Card</Label>
                                                <Input
                                                    id="nameOnCard"
                                                    name="nameOnCard"
                                                    value={formData.nameOnCard}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {formData.paymentMethod === "transfer" && (
                                    <div className="space-y-4 bg-gray-50 dark:bg-gray-900 rounded-md p-4 border mt-4">
                                        <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
                                        <div>
                                            <Label>Bank Name</Label>
                                            <div className="font-medium">Access Bank</div>
                                        </div>
                                        <div>
                                            <Label>Account Name</Label>
                                            <div className="font-medium">Chigozie</div>
                                        </div>
                                        <div>
                                            <Label>Account Number</Label>
                                            <div className="font-medium tracking-widest">1497330142</div>
                                        </div>
                                        <div>
                                            <Label>Bank Name</Label>
                                            <div className="font-medium">Guranty Trust Bank</div>
                                        </div>
                                        <div>
                                            <Label>Account Name</Label>
                                            <div className="font-medium">Chigozie</div>
                                        </div>
                                        <div>
                                            <Label>Account Number</Label>
                                            <div className="font-medium tracking-widest">0592700853</div>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                            Please make your payment to the above account and include your email as the payment reference. Your order will be processed once payment is confirmed.
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="saveInfo"
                                            name="saveInfo"
                                            checked={formData.saveInfo}
                                            onCheckedChange={(checked) => handleCheckboxChange("saveInfo", checked)}
                                        />
                                        <Label htmlFor="saveInfo" className="text-sm">
                                            Save this information for next time
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked)}
                                            required
                                        />
                                        <Label htmlFor="agreeToTerms" className="text-sm">
                                            I agree to the{" "}
                                            <a href="/terms" className="text-primary-600 hover:underline">
                                                Terms and Conditions
                                            </a>{" "}
                                            and{" "}
                                            <a href="/privacy" className="text-primary-600 hover:underline">
                                                Privacy Policy
                                            </a>
                                        </Label>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-24"
                            >
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                {/* Order Items */}
                                <div className="space-y-3 mb-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3">
                                            <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                                <Image src={item.image || (item.images?.[0]) || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium">
                                                ₦{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                {/* Price Breakdown */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>₦{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>₦{tax.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>₦{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Security Features */}
                                <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <Shield className="h-4 w-4 mr-2 text-green-500" />
                                        <span>Secure SSL encryption</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Truck className="h-4 w-4 mr-2 text-blue-500" />
                                        <span>Free shipping on orders over $50</span>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isProcessing || !formData.agreeToTerms}>
                                    {isProcessing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Complete Order - ₦${total.toFixed(2)}`
                                    )}
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}