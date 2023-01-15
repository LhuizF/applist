import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginWithGoogle from "../../services/login";
import UserModel from "../../services/firebase/user";
//import Realm from "../../services/realm";


export const Login = () => {

  const signInWithGoogle = async () => {
    try {
      const userWithToken = await LoginWithGoogle.signIn();

      const user = await UserModel.loginUser(userWithToken);
      //await Realm.saveUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  const getUser = async () => {
    const id = '113924874318898274908'
    const docs = await UserModel.verifyUser({ id });
    console.log(docs)
  }

  return (
    <SafeAreaView>
      <View >
        <Text>Login</Text>
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
        <Text>Login</Text>
        <Button title="get user" onPress={getUser} />
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
}
