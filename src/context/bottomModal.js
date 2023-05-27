import React, { useContext, useEffect } from 'react';
import { createContext, useState } from "react";
import { BottomModal } from '../components/Molecules/BottomModal';
import { ListForm } from '../components/Organisms/Form/ListForm';

export const BottomModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  return (
    <BottomModalContext.Provider value={{ modal, openModal, closeModal }} >
      {children}
      <BottomModal isOpen={modal} close={closeModal} max="36" >
        <ListForm closeModal={closeModal} />
      </BottomModal>
    </BottomModalContext.Provider>
  )
}

const fakeFunction = () => { }

export const BottomModalContext = createContext({
  modal: false, openModal: fakeFunction, closeModal: fakeFunction
});

export const useBottomModal = () => {
  const context = useContext(BottomModalContext);

  return context;
};
