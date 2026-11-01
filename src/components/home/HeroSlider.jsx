"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/hero/cyc-studio.jpg",
    alt: "Bright photography studio with a white cyc wall, strobes, and a camera",
    headline: "Find Your Perfect Frame",
    subtext: "Hourly rentals of pro photo studios — cyc walls, strobes, and seamless backdrops ready when you are.",
  },
  {
    image: "/images/hero/control-room.jpg",
    alt: "Recording studio control room with mixing desk, speakers, and acoustic panels",
    headline: "Hear the Difference",
    subtext: "Treat yourself to treated rooms, analog consoles, and monitors that tell the truth.",
  },
  {
    image: "/images/studios/product-studio.jpg",
    alt: "Product photography setup with camera, softboxes, and tabletop backdrop",
    headline: "Make Every Detail Shine",
    subtext: "Book a ready-to-shoot product studio with lighting and backdrops for your next campaign.",
  },
  {
    image: "/images/categories/podcast-rooms.jpg",
    alt: "Podcast microphone and headphones in a sound-treated recording room",
    headline: "Find Your Voice",
    subtext: "Step into a podcast-ready room with the microphones and sound treatment to bring your ideas to life.",
  },
  {
    image: "/images/studios/vintage-keys.jpg",
    alt: "Sunlit vintage creative studio with a retro television, plants, and comfortable seating",
    headline: "Make Room for Ideas",
    subtext: "Find a character-filled creative space for relaxed shoots, workshops, and collaborative projects.",
  },
];

export default function HeroSlider() {
  // Swiper's own Autoplay module reads `new Date()` while the instance is
  // constructed during render, which aborts the Cache Components prerender.
  // We run autoplay from an effect instead (effects never run at prerender).
  const swiperRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const swiper = swiperRef.current;
      if (!swiper || swiper.destroyed || pausedRef.current) return;
      if (document.hidden) return;
      if (swiper.params?.autoplay && swiper.autoplay) return; // real module active
      swiper.slideNext();
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    pausedRef.current = false;
  }

  return (
    <section
      aria-label="Featured spaces"
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <Swiper
        modules={[EffectFade, Pagination]}
        effect="fade"
        loop
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        pagination={{ clickable: true }}
        className="h-[72vh] min-h-[540px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.image}>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Legibility gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
            <div className="absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-16 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
                  StudioSpace
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-200 sm:text-lg">
                  {slide.subtext}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/studios"
                    className="rounded-lg bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/studios"
                    className="rounded-lg border border-white/70 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white hover:text-zinc-950"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-pagination-bullet { background: #fff; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #f59e0b; opacity: 1; }
      `}</style>
    </section>
  );
}
