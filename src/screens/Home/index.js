import React, { useState } from "react";
import { Text, View } from "react-native";
import { Container } from '../../components/Templates/container';
import { Button } from '../../components/Atoms/Button';
import colors from "../../theme/colors";
import { AntDesign } from '@expo/vector-icons';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { BottomModal } from '../../components/Molecules/BottomModal';
import { ListForm } from '../../components/Organisms/Form/ListForm'


export const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  }

  return (
    <Container>
      {!list.length > 0 ? (
        <>
          <Button
            type={'icon'}
            text="adicionar"
            color={colors.primary}
            textColor={colors.white}
            icon={<AntDesign name="plus" size={24} color={colors.white} />}
            onPress={() => { setModal(true) }}
          />
          <BottomModal isOpen={modal} close={closeModal} max="36" >
            <ListForm closeModal={closeModal} />
          </BottomModal>
        </>
      ) : (
        <Text>Listar</Text>
      )}
    </Container>
  );
}

// export const Home = gestureHandlerRootHOC(HomeScreen);
