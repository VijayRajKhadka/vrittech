"use client";
import { Suspense } from "react";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children} </Provider>;
}
