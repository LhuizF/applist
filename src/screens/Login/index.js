import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/user";
import LocalStorage from "../../storage";

export const Login = () => {

  const signInWithGoogle = async () => {
    const userWithToken = await LoginWithGoogle.signIn();
    const data = await UserModel.loginUser(userWithToken);
    if (data.status === 'success') {
      await LocalStorage.setItem('user', data.user);
    }
  }

  const getUser = async () => {
    const user = await LocalStorage.getItem('user');
    console.log(user);
  }

  const deleteUser = async () => {
    await LocalStorage.removeItem('user');
    console.log('deleteUser');
  }

  return (
    <SafeAreaView>
      <View >
        <Text>Login</Text>
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
        <Text>get user</Text>
        <Button title="get user" onPress={getUser} />
        <Text>delete user</Text>
        <Button title="delete user" onPress={deleteUser} />
      </View>
    </SafeAreaView>
  );
}
