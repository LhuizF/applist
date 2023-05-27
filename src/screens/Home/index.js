import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Container } from '../../components/Templates/container';
import { Button } from '../../components/Atoms/Button';
import colors from "../../theme/colors";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from "../../context/auth";
import firebase from "../../services/firebase";
import { useBottomModal } from '../../context/bottomModal'

export const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const { user } = useAuth();
  const { openModal } = useBottomModal();

  useEffect(() => {
    if (user) {
      firebase.getListsByUserId(user.id).then((res) => {
        setList(res);
      }).catch((err) => {
        console.log(err);
      })
    }

  }, [])

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
            onPress={() => openModal()}
          />

        </>
      ) : (
        <>
          <Text>Lista</Text>
          {list.map((item) => <Text>{item.name}</Text>)}
        </>
      )
      }
    </Container>
  );
}
