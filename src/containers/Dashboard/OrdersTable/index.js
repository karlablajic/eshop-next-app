import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { useFetchOrders } from '@/queries/orders/queries';
import { useMarkOrderShipped } from '@/queries/orders/mutations';
import { FaEye } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import LoadingScreen from '@/components/LoadingScreen';
import { ModalContext } from '@/components/Modal';

import OrderDetailsModal from '../OrderDetailsModal';
import { useFetchProducts } from '@/queries/products/queries';
import { useSelector } from 'react-redux';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('_id', {
    header: () => <p>ID</p>,
    minSize: 280,
  }),
  columnHelper.accessor('name', {
    header: () => <p>CLIENT NAME</p>,
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full">
          <span>{info.row.original.owner.name}</span>
        </div>
      );
    },
    minSize: 500,
  }),
  columnHelper.accessor('count', {
    header: () => <p>ITEMS</p>,
    minSize: 280,
  }),
  columnHelper.accessor('total', {
    header: () => <p>ORDER TOTAL</p>,
    minSize: 280,
  }),
  columnHelper.accessor('address', {
    header: () => <p>ADDRESS</p>,
    minSize: 280,
  }),
  columnHelper.accessor('country', {
    header: () => <p>COUNTRY</p>,
    minSize: 280,
  }),
  columnHelper.accessor('status', {
    header: () => <p>STATUS</p>,
    cell: (info) => {
      const id = info.row.original._id;
      const isShipped = info.row.original.status === 'shipped';
      const ownerId = info.row.original.owner._id;
      const { mutateAsync: mutateOrderAsShipped, isPending: isPendingOrderShipping } = useMarkOrderShipped();
      const { refetch: refetchOrders } = useFetchOrders();

      const onMarkAsShipped = async () => {
        await mutateOrderAsShipped({
          id,
          ownerId,
        });
        refetchOrders();
      };

      return (
        <div>
          {isShipped ? (
            <div className="capitalize bg-green-500 text-white px-3 py-1 rounded-xl">
              <span>{info.row.original.status}</span>
            </div>
          ) : (
            <button
              onClick={onMarkAsShipped}
              className="flex justify-center items-center capitalize bg-blue-500 text-white px-3 py-1 min-w-[150px]">
              {isPendingOrderShipping ? <Spinner /> : 'Mark as shipped'}
            </button>
          )}
        </div>
      );
    },
    minSize: 280,
  }),
  columnHelper.accessor('view', {
    header: () => <p></p>,
    cell: (info) => {
      let { handleModal } = useContext(ModalContext);
      const { data: dataProducts } = useFetchProducts();

      const onViewOrdersClick = () => {
        let orderProducts = [];
        if (dataProducts) {
          const orderProductsData = dataProducts?.data?.filter((product) => {
            return info.row.original.products[product?._id];
          });
          orderProducts = orderProductsData.map((product) => {
            return {
              ...product,
              productOrder: info.row.original.products[product?._id],
            };
          });
        } else return [];
        handleModal(<OrderDetailsModal orderProducts={orderProducts} />);
      };

      return (
        <button onClick={onViewOrdersClick} className="flex justify-center items-center w-full gap-[8px]">
          <span>View order</span>
          <FaEye />
        </button>
      );
    },
    minSize: 150,
  }),
];

const OrdersTable = () => {
  const { data: dataOrders, isLoading: isLoadingOrders } = useFetchOrders();
  const { isLoading: isLoadingProducts } = useFetchProducts();

  const table = useReactTable({
    data: dataOrders?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {!isLoadingOrders || isLoadingProducts ? (
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
            {table?.getRowModel().rows.map((row) => (
              <tr
                key={row._getAllCellsByColumnIdid}
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
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default OrdersTable;
