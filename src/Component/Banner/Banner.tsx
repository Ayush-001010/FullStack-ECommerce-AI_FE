import React from "react";
import type IBanner from "./IBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import useBannerAction from "../../Services/Hooks/useBannerAction";
import { Link } from "react-router-dom";

const Banner: React.FC<IBanner> = () => {
  const { bannerImages } = useBannerAction();
  console.log("Banner Images", bannerImages);

  return (
    <div className="w-full mt-4">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {bannerImages.map((banner, idx) => (
          <SwiperSlide key={`${banner.RouteURL}-${idx}`}>
            <div
              className="relative h-72 w-full overflow-hidden sm:h-80 lg:h-[26rem]"
              style={{
                backgroundImage: `url(${banner.ImageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-6xl px-4">
                  <Link
                    to={banner.RouteURL}
                    className="inline-flex max-w-[42rem] flex-col gap-2 rounded-2xl bg-white/10 p-5 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/15"
                  >
                    <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {banner.BannerText}
                    </p>
                    <p className="text-sm font-medium text-white/80">
                      Shop now →
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;