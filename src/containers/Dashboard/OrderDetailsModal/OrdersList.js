import Image from 'next/image';
import React from 'react';

const OrdersList = ({ orderProducts }) => {
  return (
    <div>
      {orderProducts?.map((product) => {
        return (
          <div key={product._id} className="flex justify-between px-[8px] py-[24px]">
            <Image src={product.pictures[0].url} alt="id" width={150} height={150} />
            <span>
              {product.productOrder}x{product.name}
            </span>
            <span>${product.price}</span>
            <span></span>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
