"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSection.css";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, ChevronLeft, ChevronLeftCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const sliderImageUrl = [
    {
      url: "https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1696863126083-00f45d5f9112?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="w-[100%] h-[100%] rounded-[10px]"
        autoplay={false}
        onLoad={(e) => console.log("loaded")}
        centeredSlidesBounds
        pagination={{
          clickable: true,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        modules={[Autoplay, Pagination, Navigation, A11y]}
      >
        <Button variant="outline" className="swiper-button-prev black rounded-[100%] !p-[4px] !w-[30px] !h-[30px]">
          <ChevronLeft className="swiper-button-svg" />
        </Button>
        <Button variant="outline" className="swiper-button-next rounded-[100%] !p-[4px] !w-[30px] !h-[30px]">
          <ChevronRight className="swiper-button-svg" />
        </Button>

        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => {
                console.log(isActive, "active");
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
      </Swiper>
    </>
  );
}
