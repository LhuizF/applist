import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { ModalOptions } from '../../Molecules/Modal'
import colors from "../../../theme/colors"
import { Button } from "../../Atoms/Button";
import firebase from "../../../services/firebase";
import { useAuth } from "../../../context/auth";

export const DeleteList = ({ active, closeModal, list, navigation }) => {
  const { user } = useAuth()

  async function submit() {
    const isSuccess = await firebase.removeList({
      listId: list.id,
      userId: user.id
    })

    if(isSuccess) {
      ToastAndroid.show('Lista removida com sucesso!', ToastAndroid.SHORT)
      closeModal()
      navigation.goBack()
      return;
    }

    ToastAndroid.show('Erro ao remover lista!', ToastAndroid.SHORT)
  }

  return (
    <ModalOptions active={active} closeModal={closeModal} >
      <View style={styles.container} >
        <TouchableOpacity style={styles.content} activeOpacity={1} >
          <Text style={styles.title}>Tem certeza que você deseja remover essa lista?</Text>
          <View style={styles.form} >
            <Text style={styles.subTitle} >Lista: {list.name}</Text>

            <View style={styles.buttonContainer}>
              <Button
                type={'icon'}
                text="Cancelar"
                color={colors.primary}
                textColor={colors.white}
                onPress={closeModal}
              />

              <Button
                type={'icon'}
                text="Remover"
                color={colors.red}
                textColor={colors.white}
                onPress={() => submit()}
              />
            </View>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
