import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from "react-native";
import colors from "../../../theme/colors";
import { formattedDate } from '../../../utils'
import firebase from "../../../services/firebase";
import { DeleteItem } from "../DeleteItem";
import Animated, { FadeIn, ZoomOut, ZoomIn } from "react-native-reanimated";

export const TableItems = ({ listKey }) => {
  const [itemsState, setItemsState] = React.useState([])
  const [item, setItem] = React.useState(null)

  firebase.findItensByListId(listKey, setItemsState)

  function onPressItem(item) {
    firebase.checkItem({ listId: listKey, itemId: item.key, checked: !item.checked })
  }

  function onPressDeleteItem(item) {
    firebase.deleteItem({ listId: listKey, itemId: item.key })
  }

  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        key={index}
        entering={ZoomIn}
        exiting={ZoomOut}
      >
        <Pressable

          style={styles.card}
          activeOpacity={0.8}
          onPress={() => onPressItem(item)}
          onLongPress={() => setItem(item)}
        >
          <Text style={{ ...styles.title, textDecorationLine: item.checked ? 'line-through' : 'none' }} >
            {item.name}
          </Text>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }} >
            <View style={{ flexDirection: 'row', }} >
              <Text style={styles.dateText} >Criado em {formattedDate(item.createdAt)}</Text>
            </View>
            <View style={{ flexDirection: 'row', }} >
              {!!item.completeDate && <Text style={styles.dateText} >Concluído em {formattedDate(item.completeDate)}</Text>}
            </View>
          </View>
        </Pressable>
      </Animated.View>
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

      {!!item && (
        <DeleteItem
          active={!!item}
          closeModal={() => setItem(null)}
          item={item}
          deleteItem={onPressDeleteItem}
        />
      )}
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
