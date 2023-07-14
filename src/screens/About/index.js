import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../theme/colors";
const imagePath = require('../../assets/images/logo.png');
import { version } from '../../../build.json';

export const About = ({ navigation }) => {

  function handleOption() {
    Linking.openURL('https://github.com/LhuizF/applist')
  }

  return (
    <View style={styles.container} >
      <View style={styles.imageContainer} >
        <Image
          source={imagePath}
          style={styles.logo}
        />
      </View>

      <Text style={styles.text} >Saiba mais sobre o app-list</Text>

      <View style={styles.socialIcons} >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOption()}
          style={styles.buttonClick}
        >
          <AntDesign name="github" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom} >
        <Text>Feito com ❤ por @LhuizF</Text>
        <Text >versão: {version}</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: colors.gray,
  },
  imageContainer: {
    width: 160,
    height: 160,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
  },
  buttonClick: {
    padding: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  }
})
