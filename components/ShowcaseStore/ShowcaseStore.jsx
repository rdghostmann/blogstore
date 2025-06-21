"use client";

import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Ultimate Power for Pro Gamers",
    description: "Dominate your favorite games with this powerful Gaming CPU. Enjoy faster load times, smoother gameplay, and seamless multitasking for an unbeatable gaming experience.",
    image: "/Gaming_cpu.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Fitsense Smartwatch Digit",
    description: "Stay connected and track your fitness with this stylish smartwatch. Monitor health, receive notifications, and enjoy long battery life, all in one sleek design.",
    image: "/smartwatch.png",
    link: "#"
  },
  {
    id: 3,
    title: "Air Fryer Cooking Made Easy",
    description: "Cook crispy, tasty meals with little to no oil using this efficient air fryer. Perfect for fast, healthy cooking, it's a must have for every modern, family-friendly kitchen.",
    image: "/air-fryer.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Headphones Immersive Sound",
    description: "Enjoy crystal-clear audio and unmatched comfort with these wireless headphones. Perfect for music lovers, gamers, and on-the-go listening, they provide freedom without wires.",
    image: "/redphone.png",
    link: "#"
  },
  {
    id: 5,
    title: "Coffee Maker Brew Your Cup",
    description: "Wake up to the aroma of fresh coffee with this programmable coffee maker. Easily customize brew strength and timing for your ideal morning ritual every day.",
    image: "/coffee-maker.jpg",
    link: "#"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function ShowcaseStore() {
  return (
    <div id="slide-banner" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 md:py-20">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          arrows: false,
          pagination: false,
          speed: 800,
          rewind: true,
          classes: {
            arrows: "splide__arrows absolute top-1/2 w-full",
            arrow: "splide__arrow bg-transparent hover:bg-transparent opacity-80 hover:opacity-100",
            prev: "splide__arrow--prev left-4 transform -translate-y-1/2",
            next: "splide__arrow--next right-4 transform -translate-y-1/2"
          }
        }}
        aria-label="Product Showcase"
        className="container mx-auto px-4"
      >
        {slides.map((slide) => (
          <SplideSlide key={slide.id}>
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 w-full">
              {/* Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="flex-1 flex flex-col justify-center items-center md:items-start space-y-6 text-center md:text-left w-full"
              >
                <motion.h2
                  className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                  variants={fadeIn}
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-300 max-w-2xl mx-auto md:mx-0"
                  variants={fadeIn}
                >
                  {slide.description}
                </motion.p>
                <motion.div variants={fadeIn}>
                  <Link
                    href={slide.link}
                    className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="flex-1 flex justify-center items-center w-full h-64 md:h-96 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-full max-w-xs md:max-w-md">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}