import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Home, ListItems, JoinList, Scanner, About } from "../screens";
import colors from "../theme/colors";
import { MenuOptions } from '../components/Organisms/MenuOptions'
import { useAuth } from "../context/auth";
import { Share } from '../components/Organisms/Share'
import { HeaderBackButton } from "@react-navigation/elements";

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
        <Stack.Screen name="ListItems" component={ListItems} options={({ route, navigation }) => {
          const key = route.params.listId;

          return {
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary,
              elevation: 0,
              shadowOpacity: 0
            },
            headerRight: () => <Share listId={key} />,
            title: null,
            headerLeft: () => (
              <HeaderBackButton
                tintColor="#fff"
                onPress={() => {
                  navigation.navigate('Home')
                }}
              />)
            ,
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
        <Stack.Screen name="About" component={About}
          options={{
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary
            },
            title: 'Sobre'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
