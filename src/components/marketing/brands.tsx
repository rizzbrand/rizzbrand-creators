// src/components/marketing/case‑studies.tsx
"use client";

import React from "react";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";
import {Button} from "../ui/button";
import Image from "next/image";

const brands = [
  {
    title: "Gelos",
    imageUrl: "/images/brand1.jpg",
    url: "https://theproductivitymethod.com",
  },
  {
    title: "CarFusion",
    imageUrl: "/images/carfusion.jpg",
    url: "https://www.neutonic.com",
  },
  {
    title: "Glamplugg",
    imageUrl: "/images/creator1.jpg",
    url: "https://www.shreddy.com",
  },
  {
    title: "Payollar",
    imageUrl: "/images/payollar.jpg",
    url: "https://www.brand4.com",
  },
  {
    title: "Ziva",
    imageUrl: "/images/ziva.png",
    url: "https://www.brand5.com",
  },
  {
    title: "Trackify",
    imageUrl: "/images/trackify.jpg",
    url: "https://www.brand6.com",
  },
];

const CaseStudies = () => (
  <Container className="py-16 w-full">
    <div className="flex items-center justify-between mb-8">
      <div>
        {/* <SectionBadge title="Case Studies" /> */}
        <h2 className="mt-2 text-4xl md:text-5xl font-heading font-bold">
          Brands we manage
        </h2>
      </div>
      <Button variant="outline" className="px-6 py-2">
        <a href="/case‑studies">See More →</a>
      </Button>
    </div>

    {/* Grid layout for larger screens */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {brands.map((brand) => (
        <a
          key={brand.title}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-lg relative"
        >
          <div className="w-full h-80 bg-gray-800 relative">
            <Image
              src={brand.imageUrl}
              alt={brand.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Bottom shadow added to enhance text visibility */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 shadow-lg">
              <h3 className="text-white text-2xl font-semibold">{brand.title}</h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  </Container>
);

export default CaseStudies;
