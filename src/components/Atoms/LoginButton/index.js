import React from 'react';
import { Container, Content, Button, Image, Text, Logo } from './styles';
const GOOGLE_LOGO_PATH = '../../../assets/images/google-logo.png'

export const LoginButton = ({ onPress }) => {

  return (
    <Container>
      <Content>
        <Logo />
        <Button onPress={onPress}>
          <Image source={require(GOOGLE_LOGO_PATH)} />
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
  )
}
