import Product from "@/components/products/Product";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
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

const COLOR_FILTERS = {
  name: "Color",
  id: "color",
  options: [
    { name: "Biege", value: "biege" },
    { name: "White", value: "white" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Purple", value: "purple" },
  ],
};

const SIZE_FILTERS = {
  name: "Size",
  id: "size",
  options: [
    { name: "Small", value: "S" },
    { name: "Medium", value: "M" },
    { name: "Large", value: "L" },
  ],
};

const PRICE_FILTERS = {
  name: "Price",
  id: "price",
  options: [
    { name: "Any price", range: [0, 100] },
    { name: "Under 20$", range: [0, 20] },
    { name: "Under 40$", range: [0, 40] },
  ],
};

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
    color: ["white", "green", "blue", "purple", "biege"],
    size: ["S", "M", "L"],
    price: {
      isCustom: false,
      range: [0, 100],
    },
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

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 py-6">
        {/* Sort options */}
        <div>
          <div className="pb-6 border-b border-gray-200">
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
          <div className="text-sm">
            <Accordion type="multiple">
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-gray-400 hover:text-gray-500">
                  <span className="text-gray-900 font-medium">Color</span>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <ul className=" space-y-4 ">
                    {COLOR_FILTERS.options.map((option) => (
                      <li
                        key={option.name}
                        className="flex items-center gap-3">
                        <input
                          id={`color-${option.value}`}
                          type="checkbox"
                          className="w-4 h-4"
                          checked={filter.color.includes(option.value)}
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              color: prev.color.includes(option.value) ? prev.color.filter((v) => v != option.value) : [...prev.color, option.value],
                            }));
                          }}
                        />
                        <label
                          className="text-gray-600"
                          htmlFor={`color-${option.value}`}>
                          {option.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size">
                <AccordionTrigger className="py-3 text-gray-400 hover:text-gray-500">
                  <span className="text-gray-900 font-medium">Size</span>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <ul className=" space-y-4 ">
                    {SIZE_FILTERS.options.map((option) => (
                      <li
                        key={option.name}
                        className="flex items-center gap-3">
                        <input
                          id={`size-${option.value}`}
                          type="checkbox"
                          className="w-4 h-4"
                          checked={filter.size.includes(option.value)}
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              size: prev.size.includes(option.value) ? prev.size.filter((v) => v != option.value) : [...prev.size, option.value],
                            }));
                          }}
                        />
                        <label
                          className="text-gray-600"
                          htmlFor={`size-${option.value}`}>
                          {option.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-gray-400 hover:text-gray-500">
                  <span className="text-gray-900 font-medium">Price</span>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <ul className=" space-y-4 ">
                    {PRICE_FILTERS.options.map((option, index) => (
                      <li
                        key={option.name}
                        className="flex items-center gap-3">
                        <input
                          id={`price-${index}`}
                          name="price"
                          type="radio"
                          className="w-4 h-4"
                          checked={!filter.price.isCustom && filter.price.range[0] === option.range[0] && filter.price.range[1] === option.range[1]}
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              price: {
                                isCustom: false,
                                range: [option.range[0], option.range[1]],
                              },
                            }));
                          }}
                        />
                        <label
                          className="text-gray-600"
                          htmlFor={`price-${index}`}>
                          {option.name}
                        </label>
                      </li>
                    ))}
                    <li className="flex items-center gap-3">
                      <input
                        id={`price-${PRICE_FILTERS.options.length}`}
                        type="radio"
                        name="price"
                        className="w-4 h-4"
                        checked={filter.price.isCustom}
                        onChange={() => {
                          setFilter((prev) => ({
                            ...prev,
                            price: {
                              isCustom: true,
                              range: [0, 100],
                            },
                          }));
                        }}
                      />
                      <label
                        className="text-gray-600"
                        htmlFor={`price-${PRICE_FILTERS.options.length}`}>
                        Custom
                      </label>
                    </li>
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-900 font-medium">Price</h3>
                      <p>
                        {minPrice} $ - {maxPrice} $
                      </p>
                    </div>
                    <Slider
                      className={cn("", {
                        "opacity-60 cursor-not-allowed": !filter.price.isCustom,
                      })}
                      disabled={!filter.price.isCustom}
                      min={0}
                      max={100}
                      value={[filter.price.range[0], filter.price.range[1]]}
                      onValueChange={(range) => {
                        setFilter((prev) => ({
                          ...prev,
                          price: {
                            isCustom: true,
                            range: [range[0], range[1]],
                          },
                        }));
                      }}
                    />
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
