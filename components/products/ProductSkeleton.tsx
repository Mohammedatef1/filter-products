const ProductSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 border-none lg:h-80 group-hover:opacity-80"></div>
      <div className="mt-4 text-sm">
        <div>
          <h3 className="bg-gray-200 h-5 "></h3>
          <div className="mt-1 bg-gray-200 h-5"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
