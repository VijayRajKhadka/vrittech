"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { Trash2, X } from "lucide-react";
import { removeFromCart } from "@/src/components/features/cart/cartSlice";

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart?.items ?? []);

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <Drawer direction="right">
      <DrawerTrigger className="cursor-pointer">{children}</DrawerTrigger>

      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">
            Cart ({items.length})
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4 px-4 overflow-y-auto divide-y divide-gray-200">
          {items.length === 0 && (
            <p className="text-gray-500 text-center ">Your cart is empty</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4  border-b border-gray-200 last:border-b-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="object-contain"
              />

              <div className="flex-1">
                <h4 className="text-sm font-semibold line-clamp-1">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500">
                  ${item.price} X {item.count}
                </p>

                <p className="font-semibold text-sm mt-1">
                  ${(item.price * item.count).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-1 rounded hover:bg-red-100 transition-colors"
              >
                <X size={20} className="stroke-red-400 hover:stroke-red-700" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mt-auto p-6 bg-black text-white">
          <span className="font-semibold">Total</span>
          <span className="text-2xl">${total.toFixed(2)}</span>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
