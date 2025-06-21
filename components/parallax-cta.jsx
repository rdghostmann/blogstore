"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function ParallaxCTA({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage = "/post-slide-1.jpg",
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80" />

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ opacity }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">{description}</p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent-600 text-gray-500">
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
