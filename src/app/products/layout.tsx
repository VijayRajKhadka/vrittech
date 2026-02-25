import { getProductCategories } from "@/lib/actions/categories-actions";
import { CategoryClient } from "@/src/components/features/categories";
import { PriceRangeSelection } from "@/src/components/features/categories/price-range";
import { CartDrawer } from "@/src/components/ui/drawer/CartDrawer";
import { ShoppingBasketIcon } from "lucide-react";

interface ProductLayoutProps {
  children: React.ReactNode;
}

const ProductLayout = async ({ children }: ProductLayoutProps) => {
  const categories = await getProductCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-gray-500 mt-1">Discover our latest collection</p>
          </div>
          <div>
            <CartDrawer>
              <ShoppingBasketIcon
                size={35}
                className="text-gray-500 hover:text-black transition-colors"
              />
            </CartDrawer>
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Sidebar (Optional for future filters) */}
          <div className="hidden md:block w-64 bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Filters</h2>
            <div className="space-y-8">
              <CategoryClient categories={categories} />
              <PriceRangeSelection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
