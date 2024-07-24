import Product from "@/components/products/Product";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Product as TProduct } from "@/db";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: High to Low", value: "price-asc" },
  { name: "Price: Low to High", value: "price-desc" },
] as const;

const PRODUCTS_OPTIONS = [
  { name: "T-Shirts", available: true },
  { name: "Hoodies", available: false },
  { name: "Sweetshirts", available: false },
  { name: "Accessories", available: false },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post("/api/products", {
        filter: filter,
      });
      return data;
    },
  });

  console.log(products);

  console.log(filter);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="pt-24 pb-6 border-gray-200 border-b flex justify-between items-end">
        <h1 className="text-gray-900 font-bold tracking-tight text-4xl">High quality cotton selection</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="group text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1">
            <p>Sort</p>
            <ChevronDown className="w-5 h-5 text-gray-200 group-hover:text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1 flex flex-col">
            {SORT_OPTIONS.map((option) => (
              <button
                className={cn("p-2 px-4 text-left text-sm cursor-pointer", {
                  "bg-gray-100 text-gray-900": option.value === filter.sort,
                  "text-gray-500": option.value !== filter.sort,
                })}
                key={option.name}
                onClick={() => {
                  setFilter((prev) => ({
                    ...prev,
                    sort: option.value,
                  }));
                }}>
                {option.name}
              </button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 py-6">
        {/* Sort options */}
        <div>
          <div>
            <ul className="space-y-4">
              {PRODUCTS_OPTIONS.map((product) => (
                <li
                  key={product.name}
                  className={cn("font-medium text-sm", {
                    "cursor-pointer text-gray-900 ": product.available,
                    "cursor-not-allowed text-gray-500 ": !product.available,
                  })}>
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products*/}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products
            ? products?.map((item: { id: string; metadata: TProduct }) => (
                <Product
                  key={item.id}
                  product={item.metadata}
                />
              ))
            : new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      </div>
    </main>
  );
}
