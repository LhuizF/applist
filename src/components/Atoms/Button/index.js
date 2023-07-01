import React from 'react';
import { ButtonContainer, Image, Text } from './styles';
import { Loading } from '../Loading';
import colors from '../../../theme/colors';


export const Button = ({ type, ...props }) => {
  if (!type) return null

  return buttonsTypes[type](props);
}

const ButtonIcon = ({ text = '', onPress, icon, color, textColor, isLoading = false }) => {
  return (
    <ButtonContainer
      onPress={onPress}
      color={color}
      activeOpacity={0.8}
    >
      {icon}
      <Text textColor={textColor}>
        {isLoading ? <Loading color={colors.white} active /> : text}
      </Text>
    </ButtonContainer>
  )
}

const ButtonImage = ({ text = '', onPress, imagePath = '', color, textColor }) => {
  return (
    <ButtonContainer
      onPress={onPress} color={color}
      activeOpacity={0.8}
    >
      {!!imagePath ? <Image source={imagePath} /> : null}
      <Text textColor={textColor}>{text}</Text>
    </ButtonContainer>
  )
}

const buttonsTypes = {
  icon: (p) => ButtonIcon(p),
  image: (p) => ButtonImage(p),
}
