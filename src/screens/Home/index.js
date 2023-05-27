import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Container } from '../../components/Templates/container';
import { Button } from '../../components/Atoms/Button';
import colors from "../../theme/colors";
import { AntDesign } from '@expo/vector-icons';
import { BottomModal } from '../../components/Molecules/BottomModal';
import { ListForm } from '../../components/Organisms/Form/ListForm'
import storage from "../../storage";
import { useAuth } from "../../context/auth";
import firebase from "../../services/firebase";

export const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);
  const { user } = useAuth();

  const closeModal = () => {
    setModal(false);
  }

  useEffect(() => {
    const getDate = async () => {
      const user = await storage.getItem('user');
      if (!user) {
        return;
      }

      //TODO: get list from api

    }

    getDate()
  }, []);

  useEffect(() => {
    async function get() {
      if (user) {
        await firebase.getListsByUserId(user.id)
      }
    }
    get() 
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
            onPress={() => { setModal(true) }}
          />
          <BottomModal isOpen={modal} close={closeModal} max="36" >
            <ListForm closeModal={closeModal} />
          </BottomModal>
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
