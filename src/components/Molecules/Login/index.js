import React from "react";
import { Button } from "../../Atoms/Button";
import { Logo } from "../../Atoms/Logo";
import { Container, Content } from "./styles";
const GOOGLE_LOGO_PATH = '../../../assets/images/google-logo.png'

export const LoginContainer = ({ onPress }) => {
  return (
    <Container>
      <Content>
        <Logo />
        <Button icon={require(GOOGLE_LOGO_PATH)} text='Login' onPress={onPress} />
      </Content>
    </Container>
  )
}
