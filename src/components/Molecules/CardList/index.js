import React from 'react';
import { Container, Title, Description } from './styles';
import { Text, View } from 'react-native';
import { formattedDate } from '../../../utils';


export const CardList = ({ list }) => {

  return (
    <Container>
      <View>
        <Title>{list.name}</Title>
        <Description>{list.description}</Description>
        <Text style={{ color: '#fff' }}>
          {formattedDate(list.createdAt)}
        </Text>
      </View>
    </Container>
  )
}

