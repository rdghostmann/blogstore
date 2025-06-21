"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
        setIsSuccess(true)
      } else {
        setError("Please enter a valid email address")
      }
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className="border-0 shadow-lg relative z-10">
      <CardContent className="p-8 md:p-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-gray-600">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
              Stay updated with our latest articles, product releases, and exclusive offers. We promise not to spam your
              inbox!
            </p>
          </motion.div>

          {!isSuccess ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800"
                disabled={isSubmitting}
              />
              <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-md backdrop-blur-md"
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
