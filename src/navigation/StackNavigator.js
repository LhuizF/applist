import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Home } from "../screens";
import colors from "../theme/colors";
import { MenuOptions } from '../components/Organisms/MenuOptions'
import { useAuth } from "../context/auth";

const Stack = createStackNavigator();

export const Navigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerRight: MenuOptions,
          headerLeft: null,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
