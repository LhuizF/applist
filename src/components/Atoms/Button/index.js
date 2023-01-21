import React from 'react';
import { ButtonContainer, Image, Text } from './styles';

export const Button = ({ text = '', onPress, icon = '' }) => {
  return (
    <ButtonContainer onPress={onPress}>
      {!!icon ? <Image source={icon} /> : null}
      <Text>{text}</Text>
    </ButtonContainer>
  )
}
