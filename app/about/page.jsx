"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"
import AnimatedHeading from "@/components/animated-heading"
import ParallaxCTA from "@/components/parallax-cta"
import Header from "@/components/header"
import Footer from "@/components/footer"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about creating meaningful content and building communities.",
  },
  {
    name: "Michael Chen",
    role: "Head of Technology",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Tech enthusiast with 10+ years of experience in web development.",
  },
  {
    name: "Emma Davis",
    role: "Content Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Storyteller and content strategist with a love for authentic narratives.",
  },
  {
    name: "David Wilson",
    role: "Product Manager",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Product expert focused on creating exceptional user experiences.",
  },
]

const values = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community First",
    description: "We believe in building strong, supportive communities around shared interests and values.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Quality Content",
    description: "Every piece of content is carefully crafted to provide value and inspire our readers.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from content creation to customer service.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Authenticity",
    description: "We believe in being genuine and transparent in all our communications and relationships.",
  },
]

const stats = [
  { number: "50K+", label: "Monthly Readers" },
  { number: "1000+", label: "Articles Published" },
  { number: "25+", label: "Countries Reached" },
  { number: "98%", label: "Customer Satisfaction" },
]

export default function AboutPage() {
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
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">We're passionate about sharing stories that matter</h1>
            <p className="text-lg text-gray-200 mb-8">
              ModernBlog started as a simple idea: to create a platform where quality content meets exceptional
              products, bringing together a community of curious minds and conscious consumers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <AnimatedHeading title="Our Story" subtitle="How it all began" gradient={true} />
              <div className="prose dark:prose-invert">
                <p>
                  Founded in 2020, ModernBlog emerged from a simple observation: the digital world was full of content,
                  but much of it lacked depth, authenticity, and genuine value. We set out to change that.
                </p>
                <p>
                  What started as a small blog has grown into a comprehensive platform that combines thoughtful content
                  creation with carefully curated products. We believe that the things we read and the things we buy
                  should reflect our values and aspirations.
                </p>
                <p>
                  Today, we're proud to serve a global community of readers and customers who share our passion for
                  quality, authenticity, and meaningful connections.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=Our+Story"
                alt="Our story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedHeading title="Our Values" subtitle="What drives us every day" gradient={true} centered={true} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="text-primary-600 mb-4 flex justify-center">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedHeading
            title="Meet Our Team"
            subtitle="The people behind ModernBlog"
            gradient={true}
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxCTA
        title="Join Our Journey"
        description="Be part of our growing community and stay updated with our latest content and products."
        buttonText="Get Started"
        buttonLink="/register"
      />
    </div>
    <Footer />
  </>
  )
}
