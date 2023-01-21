import React from 'react';
import { Container, Text } from './styles';

export const TextButton = ({ text = '', onPress }) => {
  return (
    <Container onPress={onPress} >
      <Text>{text}</Text>
    </Container>
  );
}

