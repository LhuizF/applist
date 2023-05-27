import React, { useState, useEffect } from "react";
import { Container } from '../../components/Templates/container';
import { ListItemsHeader } from '../../components/Atoms/ListItemsHeader';
import { TableItems } from "../../components/Organisms/TableItems";
import colors from "../../theme/colors";
import { FloatingButton } from "../../components/Atoms/FloatingButton";
import { AddItem } from "../../components/Organisms/AddItem";

export const ListItems = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { list } = route.params

  function openModal() {
    setModalVisible(true)
  }

  function saveItem(item) {
    
  }

  return (
    <Container color={colors.gray} >
      <ListItemsHeader title={list.name} />
      <TableItems items={list.items} />
      <FloatingButton onPress={openModal} />
      <AddItem
        active={modalVisible}
        openModal={() => setModalVisible(false)}
        listName={list.name}
        saveItem={saveItem}
      />
    </Container>
  );
}

