import React from 'react';
import { Container } from './styles';
import { TextButton } from '../../Atoms/TextButton'
import Storage from '../../../storage';
import { useNavigation } from '@react-navigation/native';

export const Menu = ({ closeModal }) => {
  const navigation = useNavigation();

  const logout = async () => {
    await Storage.removeItem('user');
    closeModal();
    navigation.navigate('Login');
  }

  const getUser = async () => {
    const user = await Storage.getItem('user');
    console.log(user);
  }

  return (
    <Container>
      <TextButton text='Adicionar lista' />
      <TextButton text='Ler lista' onPress={getUser} />
      <TextButton text='Sair' onPress={logout} />
    </Container>
  );
}

