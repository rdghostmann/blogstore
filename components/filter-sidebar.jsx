"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// interface FilterSidebarProps {
//   activeCategory: string
//   setActiveCategory: (category: string) => void
//   onClose?: () => void
// }

const categories = ["Electronics", "Clothing", "Accessories", "Home", "Health"]

export default function FilterSidebar({ activeCategory, setActiveCategory, onClose }) {
  const [priceRange, setPriceRange] = useState([0, 200])

  const handleCategoryClick = (category) => {
    setActiveCategory(category.toLowerCase())
    onClose?.()
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
       <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Search</h3>
        <Input type="text" placeholder="Search products..." className="bg-white dark:bg-gray-700" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Category</h3>
        <ul className="space-y-2">
          <li>
            <Button variant="link" className="justify-start w-full p-0" onClick={() => handleCategoryClick("all")}>
              <Checkbox
                id="category-all"
                checked={activeCategory === "all"}
                onCheckedChange={() => handleCategoryClick("all")}
              />
              <label
                htmlFor="category-all"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-data-[state=checked]:text-primary"
              >
                All
              </label>
            </Button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Button variant="link" className="justify-start w-full p-0" onClick={() => handleCategoryClick(category)}>
                <Checkbox
                  id={`category-${category.toLowerCase()}`}
                  checked={activeCategory === category.toLowerCase()}
                  onCheckedChange={() => handleCategoryClick(category)}
                />
                <label
                  htmlFor={`category-${category.toLowerCase()}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-data-[state=checked]:text-primary"
                >
                  {category}
                </label>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Price Range</h3>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <Slider defaultValue={priceRange} max={200} step={10} onValueChange={(value) => setPriceRange(value)} />
      </div>

     
    </motion.div>
  )
}
