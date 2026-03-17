import React, { useMemo, useState } from "react";
import type IProductPresentation from "./IProductPresentation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button, message } from "antd";
import ProductItemDetailPresentation from "../ProductItemDetailPresentation/ProductItemDetailPresentation";
import useUserProductAction from "../../Services/Hooks/useUserProductAction";
import { useDispatch, useSelector } from "react-redux";
import type UserProductsInfoInterface from "../../Interface/Redux/UserProductsInfoInterface";
import { setFavoriteProduct } from "../../Redux/Slice/UserProductInfo";

const ProductPresentation: React.FC<IProductPresentation> = ({ details }) => {
  const { Name, ImageURLs, Price, Description } = details;

  const [messageAPI, contextHandler] = message.useMessage();
  const [open, setOpen] = useState<boolean>(false);

  const { addFavorite, deleteFavorite } = useUserProductAction();
  const { FavoriteProduct } = useSelector(
    (state: any) => state.userProductInfo as UserProductsInfoInterface
  );
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleAddToFavorite = async () => {
    const response = await addFavorite(details.id);
    if (response) {
      messageAPI.success("Added to favorites!");
      dispatch(setFavoriteProduct([...FavoriteProduct, details.id]));
    } else {
      messageAPI.error("Failed to add to favorites.");
    }
  };

  const handleDeleteFavorite = async () => {
    const response = await deleteFavorite(details.id);
    const updateFavoriteProduct = FavoriteProduct.filter(
      (id) => id !== details.id
    );
    if (response) {
      dispatch(setFavoriteProduct(updateFavoriteProduct));
      messageAPI.success("Removed from favorites!");
    } else {
      messageAPI.error("Failed to remove from favorites.");
    }
  };

  // ✅ price calc for discount
  const discountedPrice = useMemo(() => {
    if (!details?.IsDiscounted) return Price;

    const pct = Number(details?.DiscountPercentage ?? 0);
    if (!pct || pct <= 0) return Price;

    const base = Number(Price);
    if (Number.isNaN(base)) return Price;

    return Math.round(base - base * (pct / 100));
  }, [details?.IsDiscounted, details?.DiscountPercentage, Price]);


  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {contextHandler}

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          className="h-64 w-full"
        >
          {ImageURLs.map((url, idx) => (
            <SwiperSlide key={`${Name}-${idx}`} className="h-64">
              <div
                role="button"
                tabIndex={0}
                onClick={handleOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleOpen();
                }}
                className="h-64 w-full cursor-pointer bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
                aria-label={`Open ${Name} image ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Top-left badges container (no overlap) */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          {/* Favorite */}
          {FavoriteProduct.includes(details?.id || 0) ? (
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
          {details?.IsBestSeller && (
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
          {details?.IsDiscounted && (
            <div className="group relative">
              <div className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-500 px-3 text-xs font-bold text-white shadow-lg ring-1 ring-black/10 backdrop-blur transition-transform duration-200 group-hover:scale-105">
                -{details?.DiscountPercentage}%
              </div>

              <div className="pointer-events-none absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                Discount
              </div>
            </div>
          )}
        </div>

        {/* Price badge on image (show discounted if applicable) */}
        <div className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
          ₹{details?.IsDiscounted ? discountedPrice : Price}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 p-4">
        <p className="line-clamp-1 text-base font-semibold text-gray-900">
          {Name}
        </p>
        <p className="line-clamp-2 text-sm text-gray-600">{Description}</p>

        <div className="flex items-center justify-between pt-2">
          {/* ✅ Price section (show strike-through original price when discounted) */}
          {details?.IsDiscounted ? (
            <div className="flex items-end gap-2">
              <p className="text-lg font-bold text-gray-900">
                ₹{discountedPrice}
              </p>
              <p className="text-sm font-semibold text-gray-500 line-through">
                ₹{Price}
              </p>
            </div>
          ) : (
            <p className="text-lg font-bold text-gray-900">₹{Price}</p>
          )}

          <div className="flex items-center gap-2">
            <Button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-0 text-sm text-gray-700 hover:bg-gray-100">
              <i className="bi bi-dash" />
            </Button>

            <p className="text-gray-700">0</p>

            <Button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 p-0 text-sm text-gray-700 hover:bg-gray-100">
              <i className="bi bi-plus" />
            </Button>
          </div>
        </div>
      </div>

      <ProductItemDetailPresentation
        detail={details}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default React.memo(ProductPresentation);
