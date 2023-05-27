import React from 'react';
import { Container, Title } from './styles';
import { CardList } from '../../Molecules/CardList';

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

