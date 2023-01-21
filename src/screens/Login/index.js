import React, { useEffect, useState } from "react";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/user";
import LocalStorage from "../../storage";
import { Container } from '../../components/Templates/container';
import { LoginContainer } from '../../components/Molecules/Login';

export const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = await LocalStorage.getItem('user');
      if (user) {
        console.log('Usuário logado')
        navigation.navigate('Home');
      }
      setIsLoading(false);
    }
    checkUser();
  }, [])

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const userWithToken = await LoginWithGoogle.signIn();
    const data = await UserModel.loginUser(userWithToken);
    if (data.status === 'success') {
      await LocalStorage.setItem('user', data.user);
      navigation.navigate('Home');
    }
    setIsLoading(false);
  }

  return (
    <Container isLoading={isLoading} >
      <LoginContainer onPress={signInWithGoogle} />
    </Container>
  );
}
