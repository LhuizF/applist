import React, { useState } from "react";
import { Container } from './styles'
import { OptionsButton } from '../../Atoms/OptionsButton'
import { ModalOptions } from '../../Molecules/Modal'
import { Menu } from '../../Molecules/Menu'

export const MenuOptions = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Container>
      <OptionsButton onPress={() => setModalVisible(true)} />
      <ModalOptions active={modalVisible} closeModal={closeModal} >
        <Menu closeModal={closeModal} />
      </ModalOptions>
    </Container>
  )
}
