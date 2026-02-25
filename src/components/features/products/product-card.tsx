"use client";

import { Product } from "@/src/types/product";
import { ShoppingCart, ShoppingCartIcon, Star } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../cart/cartSlice";
import { RootState } from "@/lib/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItem = useSelector((state: RootState) =>
    state.cart?.items?.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.count || 0;

  const increase = () => {
    if (cartItem) {
      dispatch(updateQuantity({ id: product.id, count: quantity + 1 }));
      toast.success("Quantity Updated");
    } else {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          count: 1,
        })
      );
    }
  };

  const decrease = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(product.id));
      toast.success("Item Removed from cart");
    } else {
      dispatch(updateQuantity({ id: product.id, count: quantity - 1 }));
      toast.success("Quantity Updated");
    }
  };

  const handleCartClick = () => {
    if (cartItem) {
      toast.warning("Already in cart 🛒");
    } else {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          count: 1,
        })
      );

      toast.success("Added to cart 🎉");
    }
  };
  if (!mounted) return null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      <div className="h-48 w-full flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="max-h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="mt-3 font-semibold line-clamp-2">{product.title}</h3>

        <span className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </span>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <Star size={16} fill="#FACA52" stroke="#FACA52" />
              {product.rating.rate}
            </span>
            <span className="text-gray-400">({product.rating.count})</span>
          </div>

          <p className="my-1 font-bold text-lg">${product.price}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 gap-4">
              <button
                onClick={decrease}
                disabled={quantity === 0}
                className="text-lg text-gray-500 hover:text-black transition-colors hover:transform hover:scale-120  cursor-pointer font-semibold w-6 h-6 flex items-center justify-center"
              >
                -
              </button>

              <span className="font-semibold text-sm w-4 text-center">
                {quantity}
              </span>

              <button
                onClick={increase}
                className="text-lg text-gray-500 hover:text-black transition-colors hover:transform hover:scale-120  cursor-pointer font-semibold w-6 h-6 flex items-center justify-center"
              >
                +
              </button>
            </div>

            <button
              onClick={handleCartClick}
              disabled={quantity === 0}
              className="ml-auto w-8 h-8 disabled:bg-gray-400 rounded-full bg-gray-800 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
            >
              <ShoppingCartIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
