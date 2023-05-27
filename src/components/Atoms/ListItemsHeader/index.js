import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export const ListItemsHeader = ({ title }) => {
  return (
    <View style={styles.container} >
      <Text style={styles.title} >{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    color: colors.white,
    textAlign: 'center'
  }
})
