"use client"

import  React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, ShoppingBag, FileText } from "lucide-react"
import AnimatedHeading from "@/components/animated-heading"

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    details: "hello@modernblog.com",
    description: "Send us an email anytime",
    action: "mailto:hello@modernblog.com",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 6pm",
    action: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    details: "123 Modern Street, Tech City, TC 12345",
    description: "Come say hello at our office",
    action: "#",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Business Hours",
    details: "Monday - Friday: 8am - 6pm",
    description: "Weekend support available",
    action: "#",
  },
]

const departments = [
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "General Inquiries",
    email: "hello@modernblog.com",
    description: "Questions about our content or general information",
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: "Customer Support",
    email: "support@modernblog.com",
    description: "Help with orders, accounts, or technical issues",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    title: "Sales & Partnerships",
    email: "sales@modernblog.com",
    description: "Business partnerships and collaboration opportunities",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Editorial",
    email: "editorial@modernblog.com",
    description: "Content submissions and editorial inquiries",
  },
]

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we provide comprehensive customer support for all our products and services. Our support team is available Monday through Friday, 8am to 6pm.",
  },
  {
    question: "Can I schedule a meeting or consultation?",
    answer:
      "Mention your preferred time and purpose in your message, and we'll coordinate a meeting that works for both parties.",
  },
  {
    question: "Do you accept guest posts or content submissions?",
    answer:
      "We welcome high-quality content submissions. Please reach out to our editorial team with your proposal and writing samples.",
  },
  {
    question: "How can I become a partner or affiliate?",
    answer:
      "We're always looking for great partnerships. Contact our sales team with details about your business and how we might collaborate.",
  },
  {
    question: "What are your content guidelines?",
    answer:
      "We maintain high editorial standards focusing on quality, authenticity, and value. All content must be original, well-researched, and align with our brand values.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    subject: "",
    message: "",
    priority: "normal",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    // setFormData((prev) => ({ ...prev, [name] }))
  }

  const handleSelectChange = (name, value) => {
    // setFormData((prev) => ({ ...prev, [name]}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      department: "",
      subject: "",
      message: "",
      priority: "normal",
    })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-secondary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4">Contact Us</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-200 mb-8">
              We'd love to hear from you. Whether you have questions, feedback, or business inquiries, our team is here
              to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-primary-600 mb-4 flex justify-center">{info.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="font-medium mb-1 text-primary-600">{info.details}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedHeading
            title="Contact the Right Department"
            subtitle="Get faster responses by reaching out to the appropriate team"
            gradient={true}
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary-600 mt-1">{dept.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{dept.description}</p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedHeading
              title="Send us a Message"
              subtitle="Fill out the form below and we'll get back to you as soon as possible"
              gradient={true}
              centered={true}
            />

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center"
              >
                <div className="text-green-600 dark:text-green-400 mb-4">
                  <Send className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Thank you for reaching out to us. We've received your message and will get back to you within 24
                  hours.
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Reference ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </motion.div>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Select onValueChange={(value) => handleSelectChange("department", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiries</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="sales">Sales & Partnerships</SelectItem>
                            <SelectItem value="editorial">Editorial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => handleSelectChange("priority", value)} defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide as much detail as possible..."
                        required
                      />
                    </div>

                    <div className="text-center">
                      <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[200px]">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedHeading
              title="Frequently Asked Questions"
              subtitle="Quick answers to common questions"
              gradient={true}
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-primary-700 dark:text-primary-400">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedHeading
              title="Visit Our Office"
              subtitle="We'd love to meet you in person"
              gradient={true}
              centered={true}
            />

            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold mb-4">ModernBlog Headquarters</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-primary-600 mt-1" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            123 Modern Street
                            <br />
                            Tech City, TC 12345
                            <br />
                            United States
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-primary-600 mt-1" />
                        <div>
                          <p className="font-medium">Office Hours</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Monday - Friday: 8:00 AM - 6:00 PM
                            <br />
                            Saturday: 9:00 AM - 2:00 PM
                            <br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-primary-600 mt-1" />
                        <div>
                          <p className="font-medium">Reception</p>
                          <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-64 lg:h-auto flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">Interactive Map</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
