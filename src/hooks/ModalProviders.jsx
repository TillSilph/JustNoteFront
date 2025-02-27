// ModalProvider.jsx
import React, { createContext, useState, useContext } from 'react';
import Modal from '../Components/Modal/Modal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (data) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} data={modalData}/>
    </ModalContext.Provider>
  );
};

// Хук для удобного доступа к контексту
export const useModal = () => useContext(ModalContext);
