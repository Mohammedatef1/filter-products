import type { Product } from "@/db";
import Image from "next/image";

const Product = ({ product }: { product: Product }) => {
  const { imageId, name, size, price, color } = product;
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 border-none lg:h-80 group-hover:opacity-80">
        <Image
          src={imageId}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div>
          <h3 className="text-gray-700 ">{name}</h3>
          <p className="mt-1 text-gray-500">
            Size {size}, {color}
          </p>
        </div>
        <p className="text-gray-900 font-medium">{price}</p>
      </div>
    </div>
  );
};

export default Product;
