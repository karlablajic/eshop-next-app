import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { useFetchUsers } from '@/queries/users/queries';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('_id', {
    header: () => <p>ID</p>,
    minSize: 280,
  }),
  columnHelper.accessor('name', {
    header: () => <p>CLIENT NAME</p>,
    minSize: 500,
  }),
  columnHelper.accessor('email', {
    header: () => <p>EMAIL</p>,
    minSize: 280,
  }),
  columnHelper.accessor('orders', {
    header: () => <p>ORDERS NO</p>,
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full">
          <span>{info.row.original.orders.length}</span>
        </div>
      );
    },
    minSize: 150,
  }),
];

const ClientsTable = ({ onlineForms, onDeleteForm }) => {
  const { data } = useFetchUsers();
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

export default ClientsTable;
