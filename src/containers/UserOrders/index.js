'use client';
import * as React from 'react';
import { useFetchUsersOrders } from '@/queries/orders/queries';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import LoadingScreen from '@/components/LoadingScreen';
import clsx from 'clsx';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('_id', {
    header: () => <p>ID</p>,
    minSize: 280,
  }),
  columnHelper.accessor('status', {
    header: () => <p>STATUS</p>,
    cell: (info) => {
      const isShipped = info.row.original.status === 'shipped';
      return (
        <div
          className={clsx('capitalize  text-white px-3 py-1 rounded-xl text-xs', {
            ['bg-green-500 ']: isShipped,
            ['bg-orange-500']: !isShipped,
          })}>
          <span>{info.row.original.status}</span>
        </div>
      );
    },
    minSize: 280,
  }),
  columnHelper.accessor('date', {
    header: () => <p>Date</p>,
    minSize: 280,
  }),

  columnHelper.accessor('total', {
    header: () => <p>TOTAL</p>,
    cell: (info) => {
      return <span>${info.row.original.total}</span>;
    },
    minSize: 280,
  }),
];

const OrdersTable = () => {
  const { data: datauserOrders, isLoading: isLoadingUsersOrders } = useFetchUsersOrders();
  const table = useReactTable({
    data: datauserOrders?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2 className="text-center mb-[48px]">Your orders</h2>
      {!isLoadingUsersOrders ? (
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
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default OrdersTable;
