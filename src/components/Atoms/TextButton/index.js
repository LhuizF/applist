import React from 'react';
import { Container, Text } from './styles';

export const TextButton = ({ text = '', onPress }) => {
  return (
    <Container
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text>{text}</Text>
    </Container>
  );
}

