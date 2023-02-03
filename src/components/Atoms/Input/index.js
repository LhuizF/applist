import React from 'react';
import { Container, CustomInput, Button } from './styles';
import { AntDesign } from '@expo/vector-icons';

export const Input = ({
  placeholder = '',
  cleanInput,
  ...props
}) => {
  return (
    <Container>
      <CustomInput placeholder={placeholder} {...props} />
      <Button onPress={cleanInput}>
        <AntDesign name="closecircleo" size={20} color="black" />
      </Button>
    </Container>
  );
}

