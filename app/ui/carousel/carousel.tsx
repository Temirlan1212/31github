"use client";
import { Swiper, SwiperProps } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { Button } from "@/app/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./carousel.css";

export function Carousel(props: SwiperProps) {
  return (
    <Swiper
      spaceBetween={10}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      slidesPerView={1}
      className="w-[100%] h-[100%] rounded-[10px]"
      autoplay={false}
      centeredSlidesBounds
      pagination={{
        clickable: true,
      }}
      loop={true}
      modules={[Autoplay, Pagination, Navigation, A11y]}
      {...props}
    >
      <Button
        variant="outline"
        className="swiper-button-prev black rounded-[100%] !p-[4px] !w-[30px] !h-[30px]"
      >
        <ChevronLeft className="swiper-button-svg" />
      </Button>
      <Button
        variant="outline"
        className="swiper-button-next rounded-[100%] !p-[4px] !w-[30px] !h-[30px]"
      >
        <ChevronRight className="swiper-button-svg" />
      </Button>

      {props.children}
    </Swiper>
  );
}
