import React, { useMemo } from "react";
import type IProductItemDetailPresentation from "./IProductItemDetailPresentation";
import { Modal, message } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import type UserProductsInfoInterface from "../../Interface/Redux/UserProductsInfoInterface";
import useUserProductAction from "../../Services/Hooks/useUserProductAction";
import { setFavoriteProduct } from "../../Redux/Slice/UserProductInfo";

const ProductItemDetailPresentation: React.FC<IProductItemDetailPresentation> = ({
  detail,
  open,
  onClose,
}) => {
  const { Name, ImageURLs, Price, Description } = detail;

  const [messageAPI, contextHandler] = message.useMessage();

  const dispatch = useDispatch();
  const { addFavorite, deleteFavorite } = useUserProductAction();

  const { FavoriteProduct } = useSelector(
    (state: any) => state.userProductInfo as UserProductsInfoInterface
  );

  const isFavorite = FavoriteProduct.includes(detail?.id || 0);

  // ✅ discount price calculation
  const discountedPrice = useMemo(() => {
    if (!detail?.IsDiscounted) return Price;

    const pct = Number(detail?.DiscountPercentage ?? 0);
    if (!pct || pct <= 0) return Price;

    const base = Number(Price);
    if (Number.isNaN(base)) return Price;

    return Math.round(base - base * (pct / 100));
  }, [detail?.IsDiscounted, detail?.DiscountPercentage, Price]);

  const handleAddToFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const response = await addFavorite(detail.id);
    if (response) {
      messageAPI.success("Added to favorites!");
      dispatch(setFavoriteProduct([...FavoriteProduct, detail.id]));
    } else {
      messageAPI.error("Failed to add to favorites.");
    }
  };

  const handleDeleteFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const response = await deleteFavorite(detail.id);
    if (response) {
      dispatch(setFavoriteProduct(FavoriteProduct.filter((id) => id !== detail.id)));
      messageAPI.success("Removed from favorites!");
    } else {
      messageAPI.error("Failed to remove from favorites.");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      className="!p-0"
    >
      {contextHandler}

      <div className="w-full overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-6">
          {/* Left: Image Slider */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 md:self-stretch">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              loop
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              className="h-[320px] w-full md:h-full"
            >
              {(ImageURLs || []).map((url, idx) => (
                <SwiperSlide key={`${Name}-${idx}`} className="!h-full">
                  <div className="relative h-full w-full">
                    <img
                      src={url}
                      alt={`${Name} - ${idx + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ Top-left badges container: Favorite + BestSeller + Discount */}
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              {/* Favorite */}
              {isFavorite ? (
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-white/90 hover:text-rose-500 active:scale-[0.98]"
                  aria-label="Remove from favorites"
                  onClick={handleDeleteFavorite}
                >
                  <i className="bi bi-suit-heart-fill text-base" />
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow ring-1 ring-black/5 backdrop-blur transition hover:bg-rose-500 hover:text-white active:scale-[0.98]"
                  aria-label="Add to favorites"
                  onClick={handleAddToFavorite}
                >
                  <i className="bi bi-suit-heart text-base" />
                </button>
              )}

              {/* Best Seller */}
              {detail?.IsBestSeller && (
                <div className="group relative">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg ring-1 ring-black/10 backdrop-blur transition-transform duration-200 group-hover:scale-105">
                    <i className="bi bi-star-fill text-[14px]" />
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                    Best Seller
                  </div>
                </div>
              )}

              {/* Discount */}
              {detail?.IsDiscounted && (
                <div className="group relative">
                  <div className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-500 px-3 text-xs font-bold text-white shadow-lg ring-1 ring-black/10 backdrop-blur transition-transform duration-200 group-hover:scale-105">
                    -{detail?.DiscountPercentage}%
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                    Discount
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Price badge on image */}
            <div className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
              ₹{detail?.IsDiscounted ? discountedPrice : Price}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                {Name}
              </p>

              {/* ✅ scrollable description (prevents modal stretching too tall) */}
              <p className="max-h-48 overflow-y-auto pr-2 text-sm leading-6 text-gray-600 md:max-h-64 md:text-base">
                {Description}
              </p>

              {/* ✅ Price section */}
              {detail?.IsDiscounted ? (
                <div className="flex flex-wrap items-end gap-x-3 gap-y-1 pt-1">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{discountedPrice}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 line-through">
                    ₹{Price}
                  </p>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
              ) : (
                <div className="flex items-end gap-3 pt-1">
                  <p className="text-2xl font-bold text-gray-900">₹{Price}</p>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
              )}
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