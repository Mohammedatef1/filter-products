import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: High to Low", value: "price-asc" },
  { name: "Price: Low to High", value: "price-desc" },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
  });

  console.log(filter);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="pt-24 pb-6 border-gray-200 border-b flex justify-between items-end">
        <h1 className="text-gray-900 font-bold tracking-tight text-4xl">High quality cotton selection</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="group text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2">
              <p>Sort</p>
              <ChevronDown className="w-5 h-5 text-gray-200 group-hover:text-gray-400" />
            </button>
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
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Sort options */}
        <div></div>

        {/* Products*/}
        <div></div>
      </div>
    </main>
  );
}
