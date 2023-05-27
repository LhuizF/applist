import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import colors from "../../../theme/colors";
import { formattedDate } from '../../../utils'
import firebase from "../../../services/firebase";

export const TableItems = ({ listKey }) => {
  const [itemsState, setItemsState] = React.useState([])
  firebase.findItensByListId(listKey, setItemsState)


  function onPressItem(item) {
    console.log(itemsState)
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => onPressItem(item)} key={index}
      >
        <Text style={{ ...styles.title, textDecorationLine: item.checked ? 'line-through' : 'none' }} >
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row' }} >
          <Text style={styles.dateText} >Criado em {formattedDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.container} >

      {itemsState.length === 0 ?
        <View style={{ paddingVertical: 20, backgroundColor: colors.white, borderRadius: 10 }} >
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }} >
            Nenhum item salvo
          </Text>
        </View>
        : (
          <>
            {itemsState.map((item, index) => renderItem({ item, index }))}
          </>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    borderRadius: 15,
    marginTop: -40,
    flex: 1,
    backgroundColor: colors.gray,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    backgroundColor: colors.gray,
    padding: 5,
    borderRadius: 5,
    fontWeight: '400',
    marginTop: 10,
  },
})
