import Link from "next/link";
import { ChevronRight, LayoutTemplate, PackageSearch } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Practice
          </h1>
          <p className="text-slate-500">Select a tab..</p>
        </div>

        <div className="grid gap-4">
          <Link
            href="/products"
            prefetch
            className="group flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <PackageSearch size={24} strokeWidth={2} />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-slate-800">
                  Select A
                </span>
                <span className="text-sm text-slate-400">
                  Product Dashboard
                </span>
              </div>
            </div>
            <ChevronRight
              className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
              size={20}
            />
          </Link>

          <Link
            href="/register"
            prefetch
            className="group flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <LayoutTemplate size={24} strokeWidth={2} />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-slate-800">
                  Select B
                </span>
                <span className="text-sm text-slate-400">
                  Go to Layout Build
                </span>
              </div>
            </div>
            <ChevronRight
              className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
              size={20}
            />
          </Link>
        </div>

        <footer className="text-center text-xs text-slate-400 flex items-center justify-center">
          Powered by : Vijay Raj Khadka
        </footer>
      </div>
    </main>
  );
}
