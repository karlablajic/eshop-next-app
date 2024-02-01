'use client';
import Image from 'next/image';
import React from 'react';
import { useFetchProducts } from '@/queries/products/queries';
import { CATEGORIES } from '../constants';
import Link from 'next/link';
import ProductsList from '@/components/ProductsList';

const HomeContainer = () => {
  const { data } = useFetchProducts();

  return (
    <div className="h-screen w-full overflow-scroll pb-[70px]">
      <Image
        src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
        alt="home-image"
        className="object-cover w-full min-h-[300px] "
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="flex flex-col max-w-[1248px] px-[24px] mx-auto mt-[64px]">
        <h2 className="text-center">Last products</h2>
        <ProductsList products={data?.data.slice(0, 3)} />
        <Image
          src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
          alt="home-image"
          className="object-contain w-full min-h-[300px] sm:mt-[48px]"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="flex flex-col gap-[32px]">
          <h2 className="text-center mt-[48px]">Categories</h2>
          <div className="flex justify-center flex-wrap gap-[16px]">
            {CATEGORIES.map((category) => {
              return (
                <div key={category.id} className={`relative flex flex-col items-center grow-1 basis-[300px]`}>
                  <Link href={`/category/${category.name}`}>
                    <Image
                      src={category.thumbnailUrl}
                      alt={category.id}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full brightness-50"
                      unoptimized={true}
                    />
                    <span className="text-lg text-white absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {category.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
