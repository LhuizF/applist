import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import colors from '../../../theme/colors';

export const OptionCard = ({ title, icon, onPress }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.white,
    marginLeft: 20

  }
})
