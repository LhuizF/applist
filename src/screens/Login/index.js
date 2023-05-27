import React, { useEffect, useState } from "react";
import { Container } from '../../components/Templates/container';
import { LoginContainer } from '../../components/Molecules/Login';
import colors from "../../theme/colors";
import { useAuth } from "../../context/auth";

export const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { signIn, user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        await navigation.navigate('Home')
        return;
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
