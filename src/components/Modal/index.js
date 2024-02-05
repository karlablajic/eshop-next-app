'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import { createContext, useContext } from 'react';
import useModal from '@/utils/hooks/useModal';

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };

const Modal = ({ className }) => {
  let { modalContent, handleModal, modal } = useContext(ModalContext);
  if (modal) {
    return createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-[999]"
        style={{ background: 'rgba(0,0,0,0.8)' }}>
        <div
          className={`bg-white relative  shadow-lg rounded flex flex-col items-start text-lg text-gray-800  ${className}`}>
          <button
            className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full  mb-3 bg-white text-red-700 w-8 h-8"
            onClick={() => handleModal()}>
            &times;
          </button>
          {modalContent}
        </div>
      </div>,
      document.querySelector('#modal-root'),
    );
  } else return null;
};
