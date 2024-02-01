import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductsList = ({ products }) => {
  return (
    <ul className="grid grid-cols-1 min-[450px]:grid-cols-2 min-[850px]:grid-cols-3 lg:grid-cols-4  auto-rows-max gap-4">
      {products?.map((product) => {
        return (
          <li key={product._id} className="maw-w-[300px]  h-full">
            <Link href={`/product/details/${product._id}`}>
              <div className="flex flex-col justify-between  p-2 h-full">
                <Image
                  src={product?.pictures[0]?.url}
                  alt={product._id}
                  width={0}
                  height={0}
                  className="h-4/5 w-full object-contain"
                  unoptimized={true}
                />
                <div className="flex flex-col items-center">
                  <p className="leading-6 text-lg">{product.name}</p>
                  <div className="bg-[#ffc107] px-[9px] py-[4px] rounded-lg w-min">
                    <p className="text-xs leading-3 font-bold ">{product.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;
