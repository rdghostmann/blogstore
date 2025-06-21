"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react"
import AnimatedHeading from "@/components/animated-heading"
import Header from "@/components/header"
import Footer from "@/components/footer"

const privacyPrinciples = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Data Protection",
    description: "We implement industry-standard security measures to protect your personal information.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Transparency",
    description: "We're clear about what data we collect, how we use it, and who we share it with.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "User Control",
    description: "You have control over your data and can request access, correction, or deletion at any time.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Minimal Collection",
    description: "We only collect data that's necessary to provide and improve our services.",
  },
]

export default function PrivacyPolicyPage() {
  return (
   <>
   <Header />
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
            <Badge className="mb-4">Privacy Policy</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Privacy Matters</h1>
            <p className="text-lg text-gray-200 mb-4">
              We're committed to protecting your privacy and being transparent about how we collect, use, and share your
              information.
            </p>
            <p className="text-sm text-gray-300">Last updated: December 7, 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedHeading
            title="Our Privacy Principles"
            subtitle="The core values that guide our approach to data privacy"
            gradient={true}
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="text-primary-600 mb-4 flex justify-center">{principle.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">{principle.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
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
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <Database className="h-6 w-6 mr-2 text-primary-600" />
                      Information We Collect
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          When you create an account, make a purchase, or contact us, we may collect:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                          <li>Name and contact information (email, phone, address)</li>
                          <li>Account credentials and preferences</li>
                          <li>Payment information (processed securely by our payment providers)</li>
                          <li>Communication history and support interactions</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          When you use our website and services, we automatically collect:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                          <li>Device information (browser type, operating system, IP address)</li>
                          <li>Usage data (pages visited, time spent, click patterns)</li>
                          <li>Cookies and similar tracking technologies</li>
                          <li>Location data (if you enable location services)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <Globe className="h-6 w-6 mr-2 text-primary-600" />
                      How We Use Your Information
                    </h2>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">We use the information we collect to:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <strong>Provide our services:</strong> Process orders, manage accounts, and deliver content
                        </li>
                        <li>
                          <strong>Improve our platform:</strong> Analyze usage patterns and optimize user experience
                        </li>
                        <li>
                          <strong>Communicate with you:</strong> Send updates, newsletters, and respond to inquiries
                        </li>
                        <li>
                          <strong>Personalize content:</strong> Recommend articles and products based on your interests
                        </li>
                        <li>
                          <strong>Ensure security:</strong> Detect fraud, prevent abuse, and protect our platform
                        </li>
                        <li>
                          <strong>Comply with legal obligations:</strong> Meet regulatory requirements and legal
                          requests
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        We do not sell your personal information. We may share your information in the following
                        circumstances:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <strong>Service providers:</strong> Third-party vendors who help us operate our platform
                        </li>
                        <li>
                          <strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets
                        </li>
                        <li>
                          <strong>Legal requirements:</strong> When required by law or to protect our rights
                        </li>
                        <li>
                          <strong>With your consent:</strong> When you explicitly agree to share information
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        We implement appropriate technical and organizational measures to protect your personal
                        information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments and updates</li>
                        <li>Access controls and employee training</li>
                        <li>Secure payment processing through certified providers</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        You have the following rights regarding your personal information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <strong>Access:</strong> Request a copy of your personal information
                        </li>
                        <li>
                          <strong>Correction:</strong> Update or correct inaccurate information
                        </li>
                        <li>
                          <strong>Deletion:</strong> Request deletion of your personal information
                        </li>
                        <li>
                          <strong>Portability:</strong> Receive your data in a portable format
                        </li>
                        <li>
                          <strong>Opt-out:</strong> Unsubscribe from marketing communications
                        </li>
                        <li>
                          <strong>Restrict processing:</strong> Limit how we use your information
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mt-4">
                        To exercise these rights, please contact us at{" "}
                        <a href="mailto:privacy@modernblog.com" className="text-primary-600 hover:underline">
                          privacy@modernblog.com
                        </a>
                        .
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        We use cookies and similar technologies to enhance your experience:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <strong>Essential cookies:</strong> Required for basic website functionality
                        </li>
                        <li>
                          <strong>Analytics cookies:</strong> Help us understand how you use our site
                        </li>
                        <li>
                          <strong>Marketing cookies:</strong> Used to show relevant advertisements
                        </li>
                        <li>
                          <strong>Preference cookies:</strong> Remember your settings and preferences
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mt-4">
                        You can manage your cookie preferences through your browser settings or our cookie consent tool.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our services are not intended for children under 13 years of age. We do not knowingly collect
                      personal information from children under 13. If you believe we have collected information from a
                      child under 13, please contact us immediately.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your information may be transferred to and processed in countries other than your own. We ensure
                      appropriate safeguards are in place to protect your information in accordance with applicable data
                      protection laws.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by
                      posting the new policy on this page and updating the "Last updated" date. We encourage you to
                      review this policy periodically.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:privacy@modernblog.com" className="text-primary-600 hover:underline">
                          privacy@modernblog.com
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
    <Footer />
   </>
  )
}
