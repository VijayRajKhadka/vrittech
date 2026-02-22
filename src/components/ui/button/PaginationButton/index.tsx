import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  hide?: boolean;
  className?: string;
}

const PagintaionButton: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
  hide = false,
  className,
}) => {
  const totalPages = Math.ceil(totalCount / 10);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={`flex justify-center items-center w-full mt-4 ${className} ${
        hide ? "hidden" : ""
      }`}
    >
      <Pagination className="flex justify-center">
        <PaginationContent className="flex items-center space-x-1">
          <PaginationItem>
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className="p-2   bg-gray-200 disabled:opacity-50 rounded-md"
              disabled={currentPage <= 1}
            >
              <ArrowLeft color="black" size={22} />
            </button>
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <PaginationItem key={index}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === page
                      ? "bg-black text-white hover:bg-black/80"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {page <= 9 && "0"}
                  {page}
                </button>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <span className="px-2">...</span>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <button
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              className="p-2  bg-gray-200 disabled:opacity-50 rounded-md"
              disabled={currentPage >= totalPages}
            >
              <ArrowRight color="black" size={22} />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PagintaionButton;
