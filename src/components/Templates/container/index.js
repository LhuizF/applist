import React from 'react';
import { MainContainer } from './styles';
import { Loading } from '../../Atoms/Loading';

export const Container = ({ children, isLoading }) => {

  return (
    <MainContainer>
      {isLoading ? <Loading active={isLoading} /> : children}
    </MainContainer>
  )
}

