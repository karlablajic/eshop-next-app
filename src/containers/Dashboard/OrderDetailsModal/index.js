import React from 'react';
import OrdersList from './OrdersList';
import Button from '@/components/Buttons/Button';
import { ModalContext } from '@/components/Modal';
import { useContext } from 'react';

const OrderDetailsModal = ({ orderProducts }) => {
  let { handleModal } = useContext(ModalContext);

  return (
    <div className="w-[calc(100vw*0.8)] max-w-[600px] ">
      <h2 className="border-b p-4">Order details</h2>
      <div className="p-5 w-full">
        <OrdersList orderProducts={orderProducts} />
      </div>
      <div className="flex justify-end pb-4 pr-5">
        <Button label="Close" onClick={handleModal} className="bg-gray-600" />
      </div>
    </div>
  );
};

export default OrderDetailsModal;
