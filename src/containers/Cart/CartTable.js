import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useFetchProducts } from '@/queries/products/queries';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useIncreaseProductQuantity, useDecreaseProductQuantity } from '@/queries/cart/mutations';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/userSlice';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('button', {
    header: () => <div></div>,
    cell: (info) => {
      return (
        <div className="flex justify-center min-w-full">
          <button onClick={() => {}}>
            <FaTrash size={14} color={'#EF4444'} />
          </button>
        </div>
      );
    },
    minSize: 100,
  }),
  columnHelper.accessor('images', {
    header: () => <p>PRODUCT</p>,
    cell: (info) => {
      return (
        <>
          {!!info.row.original?.pictures?.length ? (
            <Image
              src={info.row.original.pictures[0]?.url}
              className="max-w-[120px] max-h-[120px] object-contain"
              width={120}
              height={120}
              unoptimized
              alt=""
            />
          ) : (
            <div className="border min-w-[140px] min-h-[140px] grow flex items-center justify-center text-gray-400">
              <span>No image added</span>
            </div>
          )}
        </>
      );
    },
    minSize: 280,
  }),

  columnHelper.accessor('name', {
    header: () => <p>NAME</p>,
    minSize: 258,
  }),
  columnHelper.accessor('price', {
    header: () => <p>PRICE</p>,
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full">
          <p>${info?.row?.original?.price}</p>
        </div>
      );
    },
    minSize: 280,
  }),
  columnHelper.accessor('_id', {
    header: () => <p>QUANTITY</p>,
    cell: (info) => {
      const user = useSelector((state) => state.user);
      const dispatch = useDispatch();
      const price = info?.row?.original?.price;
      const id = info?.row?.original?._id;

      const onChangeIncreaseSuccess = ({ data }) => {
        dispatch(setUserData(data));
      };

      const { mutate: mutateIncreaseProductQuantity } = useIncreaseProductQuantity({
        onSuccess: onChangeIncreaseSuccess,
      });
      const { mutate: mutateDecreaseProductQuantity } = useDecreaseProductQuantity({
        onSuccess: onChangeIncreaseSuccess,
      });
      const onIncreaseQuantity = () => {
        const productData = {
          productId: info?.row?.original?._id,
          price: info?.row?.original?.price,
        };
        mutateIncreaseProductQuantity(productData);
      };

      const onDecreaseQuantity = () => {
        const productData = {
          productId: info?.row?.original?._id,
          price: info?.row?.original?.price,
        };
        mutateDecreaseProductQuantity(productData);
      };

      return (
        <div className="flex justify-start items-center min-w-full gap-4">
          <button onClick={onDecreaseQuantity}>
            <FaMinusCircle size={20} className="text-gray-600" />
          </button>

          <p>{user?.userData?.cart[id]}</p>
          <button onClick={onIncreaseQuantity}>
            <FaPlusCircle size={20} className="text-gray-600" />
          </button>
        </div>
      );
    },
    minSize: 280,
  }),
  columnHelper.accessor('description', {
    header: () => <p>SUBTOTAL</p>,
    cell: (info) => {
      const user = useSelector((state) => state.user);
      const price = info?.row?.original?.price;
      const id = info?.row?.original?._id;
      const total = price * user?.userData?.cart[id];
      return (
        <div className="flex justify-center items-center w-full">
          <p>${total}</p>
        </div>
      );
    },
    minSize: 150,
  }),
];

const CartTable = () => {
  const user = useSelector((state) => state.user);
  const { data: dataProducts, isLoading: isLoadingProducts } = useFetchProducts();

  const cartProducts = useMemo(() => {
    if (dataProducts) {
      return dataProducts?.data?.filter((product) => {
        return user?.userData?.cart[product?._id];
      });
    } else return [];
  }, [user?.userData, dataProducts]);

  const table = useReactTable({
    data: cartProducts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="w-full">
        <thead className="h-[60px] bg-gray-50 ">
          {table?.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                key={headerGroup.id}
                className="h-[70px] w-fit [&>*]:px-[16px] [&>*]:py-[12px] [&>*:first-child]:px-[24px]  border-y-[1px] border-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="[&>*]:w-fit  text-xs leading-4 font-medium text-gray-500"
                      style={{
                        width: header.column.getSize(),
                      }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="">
          {cartProducts.length > 0 &&
            table?.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-[80px] text-sm  border-b-[1px] border-gray-200  [&>*]:p-[16px] [&>*:first-child]:px-[24px]">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="[&>*]:w-max"
                      style={{
                        width: cell.column.getSize(),
                      }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default CartTable;
