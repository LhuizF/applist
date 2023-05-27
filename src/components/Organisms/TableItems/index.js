import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import colors from "../../../theme/colors";
import { formattedDate } from '../../../utils'

const itemsFake = [
  {
    id: 1,
    name: 'Item 1',
    createdAt: new Date().toISOString(),
    checked: false,
  },
  {
    id: 2,
    name: 'Item 2',
    createdAt: new Date().toISOString(),
    checked: true,
  }
]



export const TableItems = ({ items = [] }) => {
  const [itemsState, setItemsState] = React.useState(itemsFake)

  function onPressItem(item) {
    const newItens = itemsState.map(i => {
      if (i.id === item.id) {
        return { ...i, checked: !i.checked }
      }
      return i
    })

    setItemsState(newItens)
  }

  console.log('itemsState', items)

  return (
    <View style={styles.container} >

      {items.length === 0 ?
        <View style={{ paddingVertical: 20, backgroundColor: colors.white, borderRadius: 10 }} >
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }} >
            Nenhum item salvo
          </Text>
        </View>
        : (
          <FlatList
            data={itemsState}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => onPressItem(item)} >
                <Text style={{ ...styles.title, textDecorationLine: item.checked ? 'line-through' : 'none' }} >
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={styles.dateText} >Criado em {formattedDate(item.createdAt)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    borderRadius: 15,
    marginTop: -40,
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
