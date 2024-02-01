'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useFetchProductsByCategory } from '@/queries/products/queries';
import ProductsList from '@/components/ProductsList';
import Image from 'next/image';

const ProductsCategory = () => {
  const { slug } = useParams();
  const { data: dataProducts } = useFetchProductsByCategory(slug, {
    enabled: !!slug,
  });
  return (
    <div>
      <div className="flex justify-center items-center text-white w-full h-[200px] md:h-[400px] bg-[#182e39] mb-[40px] text-[24px]  md:text-[48px] ">
        <span>{slug}</span>
      </div>
      <ProductsList products={dataProducts} />
    </div>
  );
};

export default ProductsCategory;
