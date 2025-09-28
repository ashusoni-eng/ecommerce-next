"use client";
import React, { useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setWishlistItems } from "@/redux/features/wishlist-slice";
import SingleItem from "./SingleItem";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

export const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await api.get(`/wishlist/${user.id}`);
          const products = response.data.map(item => item.product);
          dispatch(setWishlistItems(products));
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      }
    };

    fetchWishlist();
  }, [user, dispatch]);

  const handleClearWishlist = async () => {
    if (user) {
      try {
        // The backend does not currently support clearing the whole wishlist in one go.
        // We will just clear it from the frontend for now.
        dispatch(setWishlistItems([]));
      } catch (error) {
        console.error("Failed to clear wishlist", error);
      }
    }
  };

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
            <button onClick={handleClearWishlist} className="text-blue">Clear Wishlist</button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[83px]"></div>
                  <div className="min-w-[387px]">
                    <p className="text-dark">Product</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Unit Price</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-dark">Stock Status</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {wishlistItems && wishlistItems.length > 0 ? (
                  wishlistItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))
                ) : (
                  <div className="text-center py-10">Your wishlist is empty.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};