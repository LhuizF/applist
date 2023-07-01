import React from 'react';
import { Container, CustomInput, Button } from './styles';
import { AntDesign } from '@expo/vector-icons';

export const Input = ({
  placeholder = '',
  cleanInput,
  value,
  ...props
}) => {
  return (
    <Container>
      <CustomInput placeholder={placeholder} value={value} {...props} />
      {value && (
        <Button onPress={cleanInput} activeOpacity={0.8} >
          <AntDesign name="closecircleo" size={20} color="black" />
        </Button>
      )}
    </Container>
  );
}

