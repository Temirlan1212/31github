"use client";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Carousel } from "@/app/ui/carousel/carousel";

export function HeroSection() {
  const sliderImageUrl = [
    {
      url: "https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1696863126083-00f45d5f9112?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1701781741800-feacbac1d7a0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1698345926746-59d1f5f48421?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1696863126083-00f45d5f9112?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1701781741800-feacbac1d7a0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1698345926746-59d1f5f48421?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
      <Carousel autoplay>
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => {
                return (
                  <Image
                    src={imageUrl.url}
                    alt={`Photo by ${index}`}
                    className="aspect-[3/4] h-fit w-fit object-cover !w-[100%] !max-h-[300px]"
                    width={300}
                    height={400}
                    unoptimized
                  />
                );
              }}
            </SwiperSlide>
          );
        })}
      </Carousel>
    </div>
  );
}
