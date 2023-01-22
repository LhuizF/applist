import React, { useState } from "react";
import { Text } from "react-native";
import { Container } from '../../components/Templates/container';
import { Button } from '../../components/Atoms/Button';
import colors from "../../theme/colors";
import { AntDesign } from '@expo/vector-icons';
import BottomSheetModal from 'react-native-reanimated'

export const Home = ({ navigation }) => {
  const [list, setList] = useState([]);

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
          />
          <BottomSheetModal />
        </>
      ) : (
        <Text>Listar</Text>
      )}
    </Container>
  );
}
