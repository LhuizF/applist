import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Home, ListItems, JoinList, Scanner } from "../screens";
import colors from "../theme/colors";
import { MenuOptions } from '../components/Organisms/MenuOptions'
import { useAuth } from "../context/auth";
import { Share } from '../components/Organisms/Share'

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
        <Stack.Screen name="ListItems" component={ListItems} options={({ route }) => {
          const name = route.params.list.name;
          const key = route.params.list.key;

          return {
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 0,
              shadowOpacity: 0
            },
            headerRight: () => <Share listId={key} />,
            title: null,

          }
        }} />
        <Stack.Screen name="JoinList" component={JoinList} options={{
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          },
          title: 'Entrar em uma lista'
        }} />

        <Stack.Screen name="Scanner" component={Scanner}
          options={{
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary
            },
            title: 'Scanner QRCode'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
