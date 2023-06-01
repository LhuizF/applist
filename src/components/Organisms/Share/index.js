import React, { useEffect, useState } from "react";
import { ModalOptions } from '../../Molecules/Modal'
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, Text, View, ToastAndroid } from "react-native";
import colors from "../../../theme/colors";
import { Button } from "../../Atoms/Button";
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';

export const Share = ({ listId }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  const copyToClipboard = () => {
    Clipboard.setString(listId)
    ToastAndroid.show('Copiado para área de transferência', ToastAndroid.SHORT);
  }


  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Entypo name="share" size={24} color={colors.white} />
      </TouchableOpacity>
      <ModalOptions active={modalVisible} closeModal={closeModal} >
        <View style={styles.container} >
          <View style={styles.content} >
            <Text style={styles.title}>Compartilhar Lista</Text>
            <View style={styles.body} >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={copyToClipboard}
              >
                <Text style={styles.code}>{listId}</Text>
              </TouchableOpacity>
              <View style={styles.qrCodeContainer} >
                <View style={styles.qrCode} >
                  <QRCode
                    value={listId}
                    size={200}
                  />
                </View>
              </View>
              <Button
                type={'icon'}
                text="Fechar"
                color={colors.primary}
                textColor={colors.white}
                icon={<></>}
                onPress={closeModal}
              />
            </View>
          </View>
        </View>
      </ModalOptions>
    </View>
  )
}

const styles = {
  button: {
    marginRight: 10
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 20
  },
  content: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 10,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  code: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: colors.gray,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  qrCodeContainer: {
    height: 200,
    width: '100%',
    marginBottom: 45,
    marginTop: 20,
    alignItems: 'center'
  },
  qrCode: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.primary,
  }
}
