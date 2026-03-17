import React from "react";
import type IProductItemDetailPresentation from "./IProductItemDetailPresentation";
import { Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const ProductItemDetailPresentation: React.FC<
  IProductItemDetailPresentation
> = ({ detail, open, onClose }) => {
  const { Name, ImageURLs, Price, Description } = detail;

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={700} height={1000} className="!p-0">
      <div className="w-full overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-6">
          {/* Left: Image Slider */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-50">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              loop
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              className="h-72 w-full md:h-80"
            >
              {ImageURLs.map((url, idx) => (
                <SwiperSlide key={`${Name}-${idx}`} className="h-72 md:h-80">
                  <img
                    src={url}
                    alt={`${Name} - ${idx + 1}`}
                    className="h-72 w-full object-cover md:h-80"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Price badge on image */}
            <div className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
              ₹{Price}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                {Name}
              </p>

              <p className="text-sm leading-6 text-gray-600 md:text-base">
                {Description}
              </p>

              <div className="flex items-end gap-3 pt-1">
                <p className="text-2xl font-bold text-gray-900">₹{Price}</p>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductItemDetailPresentation;
