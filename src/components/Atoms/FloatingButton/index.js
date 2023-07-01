import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../../theme/colors";

export const FloatingButton = ({ onPress, position, icon }) => {

  const stylePosition = {
    left: position === 'left' ? 10 : null,
    right: position === 'right' ? 10 : null,
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...stylePosition }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <AntDesign name={icon} size={24} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    bottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 100,
  }
})

