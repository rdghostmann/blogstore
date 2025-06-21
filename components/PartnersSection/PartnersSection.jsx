"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import "@splidejs/react-splide/css"; // Import Splide CSS

const partners = [
  { id: 1, name: "Cellway", logo: "/partners/cellway.jpg", alt: "Cellway logo" },
  { id: 2, name: "Deloitte", logo: "/partners/Deloitte.png", alt: "Deloitte logo" },
  { id: 3, name: "Grocerapp", logo: "/partners/Grocerapp.jpg", alt: "Grocerapp logo" },
  { id: 4, name: "Heathrow", logo: "/partners/Heathrow.jpg", alt: "Heathrow logo" },
  { id: 5, name: "Lifestyle", logo: "/partners/Lifestyle.jpg", alt: "Lifestyle logo" },
  { id: 6, name: "Malt", logo: "/partners/Malt.png", alt: "Malt logo" },
  { id: 7, name: "Mondelez", logo: "/partners/Mondelez.png", alt: "Mondelez logo" },
  { id: 8, name: "Sunovion", logo: "/partners/Sunovion.jpg", alt: "Sunovion logo" }
];

export default function PartnersSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Splide
          options={{
            type: "loop",
            perPage: 5,
            gap: "2rem",
            pagination: false,
            arrows: false,
            drag: false,
            autoWidth: true,
            breakpoints: {
              1280: { perPage: 5 },
              1024: { perPage: 4 },
              768: { perPage: 3 },
              640: { perPage: 2 },
              400: { perPage: 1 }
            },
            autoScroll: {
              speed: 1.5,
              pauseOnHover: false,
              pauseOnFocus: false,
            },
          }}
          extensions={{ AutoScroll }}
          className="w-full"
        >
          {partners.map((partner) => (
            <SplideSlide key={partner.id}>
              <div className="flex items-center justify-center p-4 bg-white dark:bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-20 w-40 mx-auto">
                <div className="relative h-12 w-32">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100px, 150px"
                  />
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}