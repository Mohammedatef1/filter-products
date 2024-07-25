import { CircleX } from "lucide-react";

const NoProduct = () => {
  return (
    <div className="flex flex-col justify-center h-80 items-center bg-gray-50 col-span-full">
      <CircleX className="w-8 h-8 text-red-500" />
      <h3 className="text-gray-900 text-xl font-medium">No product found</h3>
      <p className="text-sm text-zinc-500">We found no search results for these filters.</p>
    </div>
  );
};

export default NoProduct;
