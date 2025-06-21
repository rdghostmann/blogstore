"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"
import AnimatedHeading from "@/components/animated-heading"

const termsHighlights = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Service Agreement",
    description: "Terms governing your use of our platform and services.",
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "User Rights & Responsibilities",
    description: "What you can expect from us and what we expect from you.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Content & Intellectual Property",
    description: "Guidelines for content usage and intellectual property rights.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Limitations & Liability",
    description: "Important limitations and liability information.",
  },
]

export default function TermsPage() {
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
            <Badge className="mb-4">Terms & Conditions</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-lg text-gray-200 mb-4">
              Please read these terms carefully before using our services. By accessing or using ModernBlog, you agree
              to be bound by these terms.
            </p>
            <p className="text-sm text-gray-300">Last updated: December 7, 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Terms Highlights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedHeading
            title="Key Terms Overview"
            subtitle="Important aspects of our terms and conditions"
            gradient={true}
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {termsHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="text-primary-600 mb-4 flex justify-center">{highlight.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">{highlight.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      By accessing and using ModernBlog ("the Service"), you accept and agree to be bound by the terms
                      and provision of this agreement. If you do not agree to abide by the above, please do not use this
                      service.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      These Terms of Service ("Terms") govern your use of our website located at modernblog.com (the
                      "Service") operated by ModernBlog ("us", "we", or "our").
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">ModernBlog provides a platform for:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        Reading and accessing blog content on various topics including technology, fashion, travel, and
                        lifestyle
                      </li>
                      <li>Purchasing products through our integrated e-commerce platform</li>
                      <li>Creating user accounts and managing personal preferences</li>
                      <li>Subscribing to newsletters and updates</li>
                      <li>Interacting with content through comments and social features</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Account Creation</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          To access certain features of the Service, you may be required to create an account. You must
                          provide accurate, complete, and current information during the registration process.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          You are responsible for safeguarding the password and for maintaining the confidentiality of
                          your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Account Termination</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We reserve the right to terminate or suspend your account at any time for violations of these
                          Terms or for any other reason at our sole discretion.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">4. User Conduct</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">You agree not to use the Service to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe upon the rights of others</li>
                      <li>Upload or transmit viruses or malicious code</li>
                      <li>Spam, harass, or abuse other users</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Use the Service for any commercial purpose without our consent</li>
                      <li>Post false, misleading, or defamatory content</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">5. Content and Intellectual Property</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Our Content</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          All content on ModernBlog, including text, graphics, logos, images, and software, is the
                          property of ModernBlog or its content suppliers and is protected by copyright and other
                          intellectual property laws.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">User-Generated Content</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          By submitting content to our Service, you grant us a non-exclusive, worldwide, royalty-free
                          license to use, reproduce, modify, and distribute your content in connection with the Service.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Copyright Infringement</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We respect intellectual property rights. If you believe your copyright has been infringed,
                          please contact us with details of the alleged infringement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">6. E-commerce Terms</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Product Information</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We strive to provide accurate product descriptions and pricing. However, we do not warrant
                          that product descriptions or other content is accurate, complete, or error-free.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Orders and Payment</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          All orders are subject to acceptance and availability. We reserve the right to refuse or
                          cancel any order. Payment must be received before products are shipped.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Shipping and Returns</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Shipping terms and return policies are detailed separately and form part of these Terms.
                          Please review our shipping and return policies before making a purchase.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">7. Privacy</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                      the Service, to understand our practices regarding the collection and use of your personal
                      information.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">8. Disclaimers and Limitation of Liability</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Service Availability</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          The Service is provided "as is" and "as available" without warranties of any kind. We do not
                          guarantee that the Service will be uninterrupted or error-free.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          To the maximum extent permitted by law, ModernBlog shall not be liable for any indirect,
                          incidental, special, consequential, or punitive damages arising from your use of the Service.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      You agree to indemnify and hold harmless ModernBlog and its affiliates from any claims, damages,
                      or expenses arising from your use of the Service or violation of these Terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                      which ModernBlog operates, without regard to conflict of law principles.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      We reserve the right to modify these Terms at any time. We will notify users of any material
                      changes by posting the new Terms on this page and updating the "Last updated" date. Your continued
                      use of the Service after such modifications constitutes acceptance of the updated Terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      If you have any questions about these Terms, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:legal@modernblog.com" className="text-primary-600 hover:underline">
                          legal@modernblog.com
                        </a>
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Modern Street, Tech City, TC 12345
                      </p>
                      <p>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
