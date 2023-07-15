import React from 'react';
import { Container, Title } from './styles';
import { CardList } from '../../Molecules/CardList';
import Animation, { FadeIn, FadeOut, Layout, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { View } from 'react-native';

export const ListTable = ({ lists = [] }) => {



  return (
    <Container>
      <Title>Minhas Listas</Title>
      {lists.map((list, index) => (
        <CardList key={index} list={list} />
      ))}
    </Container>
  )
}

