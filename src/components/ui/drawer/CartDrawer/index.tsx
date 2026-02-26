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
import { Minus, Plus, X } from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
} from "@/src/components/features/cart/cartSlice";

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart?.items ?? []);
  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleIncrement = (id: number, currentCount: number) => {
    dispatch(updateQuantity({ id, count: currentCount + 1 }));
  };

  const handleDecrement = (id: number, currentCount: number) => {
    if (currentCount > 1) {
      dispatch(updateQuantity({ id, count: currentCount - 1 }));
    } else {
      dispatch(removeFromCart(id)); // Remove item if it goes below 1
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="h-full w-full max-w-md ml-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl font-bold">
            Cart ({items.length})
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-4 px-4 overflow-y-auto flex-1 divide-y divide-gray-100">
          {items.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 shrink-0 bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  ${item.price.toFixed(2)} each
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg border-gray-200">
                    <button
                      onClick={() => handleDecrement(item.id, item.count)}
                      className="p-1 hover:bg-gray-100 transition-colors rounded-l-lg"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium min-w-[24px] text-center">
                      {item.count}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id, item.count)}
                      className="p-1 hover:bg-gray-100 transition-colors rounded-r-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
                <p className="font-bold text-sm">
                  ${(item.price * item.count).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-2xl font-black">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]">
            Checkout Now
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
