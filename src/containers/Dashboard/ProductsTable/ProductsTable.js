import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { useFetchProducts } from '@/queries/products/queries';
import ActionsDropdown from './ActionsDropdown';
import Image from 'next/image';
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('images', {
    header: () => <p></p>,
    cell: (info) => {
      return (
        <>
          {!!info.row.original?.pictures?.length ? (
            <Image
              src={info.row.original.pictures[0]?.url}
              className="min-w-[140px] min-h-[140] object-contain"
              width={140}
              height={140}
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
  columnHelper.accessor('_id', {
    header: () => <p>ID</p>,
    minSize: 280,
  }),
  columnHelper.accessor('name', {
    header: () => <p>NAME</p>,
    minSize: 258,
  }),
  columnHelper.accessor('price', {
    header: () => <p>PRICE</p>,
    minSize: 280,
  }),
  columnHelper.accessor('description', {
    header: () => <p>DESCRIPTION</p>,
    minSize: 150,
  }),
  columnHelper.accessor('actions', {
    header: () => <p>ACTIONS</p>,
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full">
          <ActionsDropdown productId={info.row.original._id} />
        </div>
      );
    },
    minSize: 150,
  }),
];

const ProductsTable = () => {
  const { data } = useFetchProducts();

  const table = useReactTable({
    data: data?.data ?? [],
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
    </>
  );
};

export default ProductsTable;
