import React, { useState } from "react";
import { Container } from '../../components/Templates/container';
import { ListItemsHeader } from '../../components/Atoms/ListItemsHeader';
import { TableItems } from "../../components/Organisms/TableItems";
import colors from "../../theme/colors";
import { FloatingButton } from "../../components/Atoms/FloatingButton";
import { AddItem } from "../../components/Organisms/AddItem";
import firebase from "../../services/firebase";
import { useAuth } from '../../context/auth'

export const ListItems = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { list } = route.params

  const { user } = useAuth()

  function openModal() {
    setModalVisible(true)
  }

  async function saveItem(name) {

    const newItem = {
      name: name,
      checked: false,
      createdAt: new Date().toISOString(),
      completeDate: '',
      userId: user.id,
    }

    const res = await firebase.insertItem(list.key, newItem)

    //console.log(res)
  }

  return (
    <Container color={colors.gray} >
      <ListItemsHeader title={list.name} />

      <TableItems listKey={list.key} />

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

