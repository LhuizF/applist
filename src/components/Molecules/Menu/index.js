import React from 'react';
import { Container } from './styles';
import { TextButton } from '../../Atoms/TextButton'
import Storage from '../../../storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/auth';
import { useBottomModal } from '../../../context/bottomModal';

export const Menu = ({ closeModal }) => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { openModal } = useBottomModal();

  const logout = async () => {
    await signOut();
    closeModal();
    navigation.navigate('Login');
  }

  const goToJoinList = async () => {
    closeModal();
    navigation.navigate('JoinList')
  }

  const openListForm = () => {
    closeModal();
    openModal();
  }

  return (
    <Container>
      <TextButton text='Adicionar lista' onPress={openListForm} />
      <TextButton text='Entrar em uma lista' onPress={goToJoinList} />
      <TextButton text='Sair' onPress={logout} />
    </Container>
  );
}

