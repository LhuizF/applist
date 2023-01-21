import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import colors from '../../../theme/colors';
import { Container } from './styles'

export const OptionsButton = ({ onPress, color }) => {

  return (
    <Container onPress={onPress} >
      <SimpleLineIcons name="options-vertical" size={24} color={color || colors.white} />
    </Container>
  )
}
