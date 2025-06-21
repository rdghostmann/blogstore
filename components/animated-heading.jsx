"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"


export default function AnimatedHeading({
  title,
  subtitle,
  className,
  gradient = false,
  centered = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn("mb-10", centered && "text-center", className)}
    >
      <h2
        className={cn(
          "text-2xl md:text-3xl font-bold mb-2",
          gradient && "text-gray-700 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text",
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </motion.div>
  )
}
