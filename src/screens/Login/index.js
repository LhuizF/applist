import React, { useEffect } from "react";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/user";
import LocalStorage from "../../storage";
import { Container } from '../../components/Templates/container';
import { LoginButton } from '../../components/Atoms/LoginButton';

export const Login = ({ navigation }) => {

  useEffect(() => {
    const checkUser = async () => {
      const user = await LocalStorage.getItem('user');
      if (user) {
        navigation.navigate('Home');
      }
    }
    checkUser();
  }, [])

  const signInWithGoogle = async () => {
    const userWithToken = await LoginWithGoogle.signIn();
    const data = await UserModel.loginUser(userWithToken);
    if (data.status === 'success') {
      await LocalStorage.setItem('user', data.user);
      navigation.navigate('Home');
    }
  }

  return (
    <Container>
      <LoginButton onPress={signInWithGoogle} />
    </Container>
  );
}
