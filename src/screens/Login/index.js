import React, { useEffect, useState } from "react";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/User";
import LocalStorage from "../../storage";
import { Container } from '../../components/Templates/container';
import { LoginContainer } from '../../components/Molecules/Login';
import colors from "../../theme/colors";

export const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyLogin()
  }, [])

  const verifyLogin = async () => {
    const user = await LocalStorage.getItem('user');
    if (user) {
      console.log('Usuário logado')
      navigation.navigate('Home');
    }
    setIsLoading(false);
  }

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const userWithToken = await LoginWithGoogle.signIn({ isEmulator: true });
    const data = await UserModel.loginUser(userWithToken);
    if (data.status === 'success') {
      await LocalStorage.setItem('user', data.user);
      navigation.navigate('Home');
    }
    setIsLoading(false);
  }

  return (
    <Container isLoading={isLoading} color={colors.primary} >
      <LoginContainer onPress={signInWithGoogle} />
    </Container>
  );
}
