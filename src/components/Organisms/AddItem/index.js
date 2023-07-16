import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { ModalOptions } from '../../Molecules/Modal'
import colors from "../../../theme/colors";
import { Input } from '../../Atoms/Input'
import { Button } from "../../Atoms/Button";
import { AntDesign } from '@expo/vector-icons';


export const AddItem = ({ active, closeModal, listName = '', saveItem }) => {
  const [itemNome, setItemNome] = useState('')

  function submit(item) {
    if (itemNome === '') {
      ToastAndroid.show('Você precisa informar o nome do item', ToastAndroid.SHORT);
      return;
    }

    handlerCloseForm()
    saveItem(item)
  }

  function handlerCloseForm() {
    setItemNome('')
    closeModal()
  }

  return (
    <ModalOptions active={active} closeModal={handlerCloseForm} >
      <View style={styles.container} >
        <TouchableOpacity style={styles.content} activeOpacity={1} >
          <Text style={styles.title}>Novo item</Text>
          <View style={styles.form} >
            <Text style={styles.subTitle} >Lista {listName}</Text>
            <Input
              placeholder="Nome do item"
              value={itemNome}
              onChangeText={setItemNome}
            />
            <Button
              type={'icon'}
              text="Salvar"
              color={colors.primary}
              textColor={colors.white}
              icon={<AntDesign name="plus" size={24} color={colors.white} />}
              onPress={() => submit(itemNome)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ModalOptions>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  form: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  }
})
