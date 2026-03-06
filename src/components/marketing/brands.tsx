// src/components/marketing/case‑studies.tsx
"use client";

import React from "react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { brands } from "@/constants/brands";

export const BrandCard = ({
  title,
  imageUrl,
  url,
}: {
  title: string;
  imageUrl: string;
  url: string;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block overflow-hidden rounded-lg relative"
  >
    <div className="w-full h-80 bg-gray-800 relative">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={500}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 shadow-lg">
      <h3 className="text-white text-2xl font-semibold">{title}</h3>
    </div>
  </a>
);

const CaseStudies = () => (
  <Container className="py-16 w-full">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="mt-2 text-4xl md:text-5xl font-heading font-bold">
          Brands we manage
        </h2>
      </div>
      <Button variant="outline" className="px-6 py-2" asChild>
        <Link href="/case-studies">See More →</Link>
      </Button>
    </div>

    {/* Carousel on mobile only */}
    <div className="relative block sm:hidden">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-2">
          {brands.map((brand) => (
            <CarouselItem key={brand.title} className="pl-2 basis-full">
              <BrandCard {...brand} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 border-border bg-background/90 disabled:opacity-30" />
        <CarouselNext className="right-2 border-border bg-background/90 disabled:opacity-30" />
      </Carousel>
    </div>

    {/* Grid layout for sm and up */}
    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
      {brands.map((brand) => (
        <BrandCard key={brand.title} {...brand} />
      ))}
    </div>
  </Container>
);

export default CaseStudies;
