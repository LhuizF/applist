import React from "react";
import { Container } from '../../components/Templates/container';
import { Text, View } from "react-native";
import { OptionCard } from '../../components/Molecules/OptionCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ModalOptions } from "../../components/Molecules/Modal";
import { TextCodeForm } from '../../components/Organisms/TextCodeForm'

export const JoinList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const closeModal = () => {
    setModalVisible(false)
  }


  return (
    <Container>
      <View style={{
        flexDirection: 'column',
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 20,
      }}
      >
        <OptionCard
          title="Digitar Código"
          icon={<MaterialCommunityIcons name="cursor-text" size={20} color="#fff" />}
          onPress={() => setModalVisible(true)}
        />
        <OptionCard title="Escanear QRcode"
          icon={<FontAwesome name="qrcode" size={20} color="#fff" />}
          onPress={() => navigation.navigate('Scanner')} />
      </View>

      <ModalOptions active={modalVisible} closeModal={closeModal}>
        <TextCodeForm closeModal={closeModal} navigation={navigation} />
      </ModalOptions>
    </Container>
  );
};
