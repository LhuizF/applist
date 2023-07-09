import React from 'react';
import { Container, Title, Description } from './styles';
import { Text, View } from 'react-native';
import { formattedDate } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

export const CardList = ({ list }) => {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('ListItems', { listId: list.key })
  }

  return (
    <Container activeOpacity={0.8} onPress={onPress} >
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

