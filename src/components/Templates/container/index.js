import React from 'react';
import { MainContainer } from './styles';
import { Loading } from '../../Atoms/Loading';

export const Container = ({ children, isLoading, color, center = false }) => {

  return (
    <MainContainer color={color} center={center}>
      {isLoading ? <Loading active={isLoading} /> : children}
    </MainContainer>
  )
}

