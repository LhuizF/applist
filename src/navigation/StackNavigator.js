import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Home } from "../screens";
import colors from "../theme/colors";
import { MenuOptions } from '../components/Organisms/MenuOptions'


const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerRight: MenuOptions
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
