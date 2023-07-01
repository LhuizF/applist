import React from 'react';
import { Container } from './styles';
import Lottie from 'lottie-react-native';

export const Logo = () => {
  return (
    <Container >
      <Lottie
        source={require('../../../assets/animation/login.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </Container>
  );
}
