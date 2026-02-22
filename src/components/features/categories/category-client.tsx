"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryClientProps {
  categories: string[];
}

interface CategoryClientProps {
  categories: string[];
}

export const CategoryClient = ({ categories }: CategoryClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  const initialCategory = searchParams.get("category") ?? "";
  const [selected, setSelected] = React.useState(initialCategory);

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "") {
      params.delete("category");
      setSelected("");
    } else {
      params.set("category", encodeURIComponent(category));
      setSelected(category);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <RadioGroup
      value={selected}
      onValueChange={(value) => handleCategory(value)}
      className="flex flex-col gap-2"
    >
      {/* All option */}
      <div className="flex items-center">
        <RadioGroupItem value="" id="all" className="mr-2" />
        <label htmlFor="all" className="cursor-pointer">
          All
        </label>
      </div>

      {categories.map((category) => (
        <div key={category} className="flex items-center">
          <RadioGroupItem value={category} id={category} className="mr-2" />
          <label htmlFor={category} className="cursor-pointer">
            {category}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};
