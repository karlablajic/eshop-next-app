import React, { useEffect, useMemo } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useFetchUsers } from '@/queries/users/queries';
import { FaTrash } from 'react-icons/fa';
import { useFetchProducts } from '@/queries/products/queries';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import {
  useIncreaseProductQuantity,
  useDecreaseProductQuantity,
  useDeleteProductFromCart,
} from '@/queries/cart/mutations';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/userSlice';

const CartList = () => {
  const user = useSelector((state) => state.user);
  const { data: dataProducts, isLoading: isLoadingProducts } = useFetchProducts();

  const cartProducts = useMemo(() => {
    if (dataProducts) {
      return dataProducts?.data?.filter((product) => {
        return user?.userData?.cart[product?._id];
      });
    } else return [];
  }, [user?.userData, dataProducts]);

  const dispatch = useDispatch();

  const onChangeIncreaseSuccess = ({ data }) => {
    dispatch(setUserData(data));
  };

  const { mutate: mutateIncreaseProductQuantity } = useIncreaseProductQuantity({
    onSuccess: onChangeIncreaseSuccess,
  });
  const { mutate: mutateDecreaseProductQuantity } = useDecreaseProductQuantity({
    onSuccess: onChangeIncreaseSuccess,
  });
  const { mutate: mutateDeleteProductFromCart } = useDeleteProductFromCart({
    onSuccess: onChangeIncreaseSuccess,
  });

  const onIncreaseQuantity = (productData) => {
    mutateIncreaseProductQuantity(productData);
  };

  const onDecreaseQuantity = (productData) => {
    mutateDecreaseProductQuantity(productData);
  };

  const onDeleteProductFromCart = (productData) => {
    mutateDeleteProductFromCart(productData);
  };

  return (
    <ul className="grid grid-cols-1 min-[450px]:grid-cols-2 min-[850px]:grid-cols-3 lg:grid-cols-4  auto-rows-max gap-4 [&>*]:border-b">
      {cartProducts?.map((product) => {
        const price = product.price;
        const id = product._id;
        const productData = {
          productId: product._id,
          price: product.price,
        };
        const total = price * user?.userData?.cart[id];
        return (
          <li key={product._id} className="maw-w-[300px] h-full relative pb-2">
            <div className="flex flex-col justify-between  p-2 h-full gap-[16px]">
              <Image
                src={product?.pictures[0]?.url}
                alt={product._id}
                width={0}
                height={0}
                className="h-4/5 w-full object-contain"
                unoptimized={true}
              />
              <div className="flex flex-col items-center gap-[8px]">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => {
                      onDeleteProductFromCart(productData);
                    }}>
                    <FaTrash color={'#EF4444'} />
                  </button>
                </div>
                <p className="leading-6 text-xl font-bold">{product.name}</p>
                <p className="leading-6">${product.price}</p>
                <div className="flex justify-center items-center min-w-full gap-4 ">
                  <button onClick={() => onDecreaseQuantity(productData)}>
                    <FaMinusCircle size={20} className="text-gray-500" />
                  </button>

                  <p>{user?.userData?.cart[id]}</p>
                  <button onClick={() => onIncreaseQuantity(productData)}>
                    <FaPlusCircle size={20} className="text-gray-500" />
                  </button>
                </div>
                <p className="leading-6 text-lg">
                  <span className="text-gray-400 text-sm mr-2">SUBTOTAL</span>
                  {total}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CartList;
