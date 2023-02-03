import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Container, Text } from './styles';
import { Input } from '../../../Atoms/Input';
import { Button } from '../../../Atoms/Button';
import colors from '../../../../theme/colors';
import ListModel from '../../../../services/firebase/List';
import Storage from '../../../../storage';

export const ListForm = ({ closeModal }) => {
  const [nameList, setNameList] = useState('');
  const [description, setDescription] = useState('');

  const handlerCloseForm = () => {
    setNameList('');
    setDescription('');
    closeModal();
  }

  const handleSave = async () => {
    const user = await Storage.getItem('user');
    const res = await ListModel.createList({
      userId: user.id,
      name: nameList,
      description
    })

    if (res.status === 'error') {
      console.log(res.message);
      if(Array.isArray(res.message)) {
        res.message.map((msg) => {
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        })
        return
      }
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
      return
    }
    handlerCloseForm();
    ToastAndroid.show(res.message, ToastAndroid.SHORT);
  }

  return (
    <Container>
      <Text>Crie uma nova lista</Text>
      <Input
        placeholder="Nome da lista"
        cleanInput={() => setNameList('')}
        onChangeText={setNameList}
        value={nameList}
      />
      <Input
        placeholder="Descrição"
        cleanInput={() => setDescription('')}
        onChangeText={setDescription}
        value={description}
      />
      <Button
        type='icon'
        text="Salvar"
        color={colors.primary}
        textColor={colors.white}
        onPress={handleSave}
      />
    </Container>
  );
}
