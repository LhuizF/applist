import React, { useEffect, useState } from "react";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/User";
import LocalStorage from "../../storage";
import { Container } from '../../components/Templates/container';
import { LoginContainer } from '../../components/Molecules/Login';
import colors from "../../theme/colors";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from "../../context/auth";
import { Button } from "../../components/Atoms/Button";
import { set } from "react-native-reanimated";



export const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { signIn, signOut, user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        await navigation.navigate('Home')
      }
      setIsLoading(false)
    })()
  }, [user])

  const handleSignIn = async () => {
    setIsLoading(true)
    const isLogged = await signIn()
    if (isLogged) {
      await navigation.navigate('Home')
      return;
    }
    setIsLoading(false)
  }

  return (
    <Container isLoading={isLoading} color={colors.primary} >
      <LoginContainer onPress={handleSignIn} />

    </Container>
  );
}
