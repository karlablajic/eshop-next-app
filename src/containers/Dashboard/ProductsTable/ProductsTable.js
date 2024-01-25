import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
// import { DefaultCell, ClientCell, DateCell, ActionsCell, HeaderCell, StatusCell } from '../TableCells';
import PropTypes from 'prop-types';
// import NoFormsSent from '/public/icons/no-forms-sent.svg';
// import { downloadPdf } from '@components/Pdf/generatePdf';
import Image from 'next/image';
import { useFetchProducts } from '../queries/queries';
// import { useFetchOnlineFormsTypes } from 'containers/OnlineForms/queries/queries';
import { HiDotsHorizontal } from 'react-icons/hi';
import ActionsDropdown from './ActionsDropdown';
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('_id', {
    header: () => <p>Id</p>,
    // cell: ({ info }) => <DefaultCell label={info.getValue()} />,
    minSize: 280,
  }),
  columnHelper.accessor('name', {
    header: () => <p>FORM TYPE</p>,
    // cell: ({ info }) => <DefaultCell label={info.getValue()?.name} />,
    minSize: 258,
  }),
  columnHelper.accessor('price', {
    header: () => <p>PRICE</p>,

    // cell: ({ info }) => {
    //   const firstName = info?.row?.original?.client_first_name;
    //   const lastName = info?.row?.original?.client_last_name;
    //   const fullName = (firstName ?? '') + ' ' + (lastName ?? '');
    //   return (
    //     <ClientCell
    //       imgSrc="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    //       name={fullName}
    //       email={info.getValue()}
    //     />
    //   );
    // },
    minSize: 280,
  }),
  columnHelper.accessor('description', {
    header: () => <p>DESCRIPTION</p>,

    // cell: ({ info }) => {
    //   const firstName = info?.row?.original?.client_first_name;
    //   const lastName = info?.row?.original?.client_last_name;
    //   const fullName = (firstName ?? '') + ' ' + (lastName ?? '');
    //   return (
    //     <StatusCell
    //       status={info.getValue()}
    //       formPublicIdentifier={info.row.original.public_identifier}
    //       clientEmail={info.row.original.client_email}
    //       formTitle={info.row.original.form_type.name}
    //       clientName={fullName}
    //     />
    //   );
    // },
    minSize: 150,
  }),
  columnHelper.accessor('actions', {
    header: () => <p>ACTIONS</p>,
    cell: (info) => {
      return (
        <button className="flex justify-center items-center w-full">
          <ActionsDropdown productId={info.row.original._id} />
        </button>
      );
    },
    // cell: ({ info, onDeleteForm }) => {
    //   const formTypeId = info.row.original.form_type.id;
    //   const { data, isSuccess } = useFetchOnlineFormsTypes();
    //   const onDownloadPdf = async () => {
    //     if (isSuccess && formTypeId) {
    //       const typeData = data?.data?.find((type) => type.id === formTypeId);
    //       downloadPdf(typeData.content, false, info.row.original.submitted_answers, typeData.name);
    //     }
    //   };
    //   return (
    //     <ActionsCell
    //       formId={info.row.original.id}
    //       onDownloadPdf={() => {
    //         onDownloadPdf();
    //       }}
    //       onDeleteForm={() => {
    //         onDeleteForm(info.row.original.id);
    //       }}
    //     />
    //   );
    // },
    minSize: 150,
  }),
];

const ProductsTable = ({ onlineForms, onDeleteForm }) => {
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
