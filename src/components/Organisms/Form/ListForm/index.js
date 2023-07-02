import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Container, Text } from './styles';
import { Input } from '../../../Atoms/Input';
import { Button } from '../../../Atoms/Button';
import colors from '../../../../theme/colors';
import storage from '../../../../storage';
import firebase from '../../../../services/firebase';

export const ListForm = ({ closeModal }) => {
  const [nameList, setNameList] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlerCloseForm = () => {
    setNameList('');
    setDescription('');
    closeModal();
  }

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await storage.getItem('user');

    if (!user) {
      ToastAndroid.show('Você precisa estar logado para criar uma lista', ToastAndroid.SHORT);
      setIsLoading(false);
      return;
    }

    if (!nameList) {
      ToastAndroid.show('Você precisa informar o nome da lista', ToastAndroid.SHORT);
      setIsLoading(false);
      return;
    }

    const list = {
      users: {
        0: user.id
      },
      orderId: user.id,
      name: nameList,
      description,
      createdAt: new Date().toISOString()
    }

    const res = await firebase.createList(list);

    if (!res) {
      ToastAndroid.show('Erro ao criar lista', ToastAndroid.SHORT);
      setIsLoading(false);
      return
    }

    ToastAndroid.show('Lista criada com sucesso', ToastAndroid.SHORT);

    handlerCloseForm();
  }

  return (
    <Container activeOpacity={1}>
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
        isLoading={isLoading}
      />
    </Container>
  );
}
