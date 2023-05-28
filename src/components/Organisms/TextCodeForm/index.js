import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Input } from "../../Atoms/Input";
import colors from "../../../theme/colors";
import { Button } from "../../Atoms/Button";
import firebase from "../../../services/firebase";
import { useAuth } from "../../../context/auth";

export const TextCodeForm = ({ closeModal, navigation }) => {
  const [text, setText] = useState('-NWUh6y6ADMjvnBoEHVX')
  const { user } = useAuth()

  const submit = async () => {
    if (!text) {
      ToastAndroid.show('Você precisa informar o código', ToastAndroid.SHORT);
      return;
    }

    const res = await firebase.joinList({
      listId: text,
      userId: user.id
    })

    if (res) {
      ToastAndroid.show('Lista encontrada', ToastAndroid.SHORT);
      closeModal()
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.content} >
        <Text style={styles.title}>Digite o código</Text>
        <View style={styles.form} >
          <Input
            value={text}
            onChangeText={setText}
            placeholder="Digite o código da lista"
            cleanInput={() => setText('')}
          />
          <Button
            type={'icon'}
            text="Entrar"
            color={colors.primary}
            textColor={colors.white}
            icon={<></>}
            onPress={submit}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 20
  },
  content: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
})
