import React, { useEffect } from "react";
import { Container } from './styles';
import { Modal } from 'react-native'

export const ModalOptions = ({ children, active = false, closeModal }) => {
  return (
    <Modal
      transparent
      visible={active}
      animationType="none"
    >
      <Container onPress={closeModal} >
        {children}
      </Container>
    </Modal>
  )
}
