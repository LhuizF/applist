import React, { useEffect, useState } from "react";
import { Container } from '../../components/Templates/container';
import { ListItemsHeader } from '../../components/Atoms/ListItemsHeader';
import { TableItems } from "../../components/Organisms/TableItems";
import colors from "../../theme/colors";
import { FloatingButton } from "../../components/Atoms/FloatingButton";
import { AddItem } from "../../components/Organisms/AddItem";
import firebase from "../../services/firebase";
import { useAuth } from '../../context/auth'
import { DeleteList } from "../../components/Organisms/DeleteList";
import Lottie from 'lottie-react-native';

export const ListItems = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [list, setList] = useState({})
  const { listId } = route.params

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

    const res = await firebase.insertItem(listId, newItem)

  }

  useEffect(() => {
    (async () => {
      const res = await firebase.findListById(listId)
      setList(res)
    })()
  }, [])


  if (!list) {
    return (
      <Container color={colors.gray} >
        <Lottie
          source={require('../../assets/animation/loading.json')}
          autoPlay
          loop
        />
      </Container>
    )
  }

  return (
    <Container color={colors.gray} >
      <ListItemsHeader title={list.name} />

      <TableItems listKey={listId} />

      <FloatingButton
        icon='plus'
        position='right'
        onPress={openModal}
      />
      {list.orderId === user.id && (
        <FloatingButton
          icon='delete'
          position="left"
          onPress={() => setModalDelete(true)}
        />
      )}
      <AddItem
        active={modalVisible}
        closeModal={() => setModalVisible(false)}
        listName={list.name}
        saveItem={saveItem}
      />

      <DeleteList
        active={modalDelete}
        closeModal={() => setModalDelete(false)}
        list={list}
        navigation={navigation}
      />

    </Container>
  );
}

