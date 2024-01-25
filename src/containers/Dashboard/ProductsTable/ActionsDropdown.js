import React from 'react';
import Dropdown from '@/components/Dropdown';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useDeleteProduct } from '../queries/mutations';
import { useFetchProducts } from '../queries/queries';

const ActionsDropdown = ({ productId = '' }) => {
  const { refetch: refecthProducts } = useFetchProducts();

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: refecthProducts,
  });

  const onProductDelete = () => {
    deleteProduct(productId);
  };

  return (
    <Dropdown>
      <Dropdown.Button
        render={(open, setOpen) => (
          <button onClick={() => setOpen(!open)}>
            <HiDotsHorizontal size={20} color={'#6B7280'} />
          </button>
        )}
      />

      <Dropdown.List
        render={(open, setOpen) => {
          return (
            <>
              <Dropdown.ListItem>
                <button
                  className="flex items-center gap-2 px-[16px] py-[8px] min-w-[200px] h-[40px] text-xs"
                  onClick={() => {
                    setOpen(!open);
                    // dispatch(removeUser());
                  }}>
                  <MdEdit size={20} color={'#6B7280'} />
                  Edit product
                </button>
              </Dropdown.ListItem>
              <Dropdown.ListItem>
                <button
                  className="flex items-center gap-2 px-[16px] py-[8px] min-w-[200px] h-[40px] text-xs"
                  onClick={() => {
                    setOpen(!open);
                    onProductDelete();
                  }}>
                  <FaTrash size={14} color={'#EF4444'} />
                  <span className="text-red-500">Move to trash</span>
                </button>
              </Dropdown.ListItem>
            </>
          );
        }}
      />
    </Dropdown>
  );
};

export default ActionsDropdown;
