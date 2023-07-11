import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Container } from '../../components/Templates/container';
import { Button } from '../../components/Atoms/Button';
import colors from "../../theme/colors";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from "../../context/auth";
import firebase from "../../services/firebase";
import { useBottomModal } from '../../context/bottomModal'
import { ListTable } from "../../components/Organisms/ListTable";
import Lottie from 'lottie-react-native';

export const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const { user } = useAuth();
  const { openModal } = useBottomModal();

  useEffect(() => {
    if (user) {
      firebase.getListsByUserId(user.id, setList)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInterval(() => {
            setIsLoading(false);
          }, 2000)
        });
    }

  }, [])

  if (isLoading) {
    return (
      <Container center={true}>
        <Lottie
          source={require('../../assets/animation/loading.json')}
          autoPlay
          loop
        />
      </Container>
    )
  }

  return (
    <Container isLoading={false} center={list.length === 0}>
      {list.length > 0 ? (
        <ListTable lists={list} />
      ) : (
        <View>
          <View style={{
            width: 200,
            height: 200,
          }}>
            <Lottie
              source={require('../../assets/animation/empty-list.json')}
              autoPlay
              loop={false}
            />
          </View>
          <Button
            type={'icon'}
            text="Adicionar"
            color={colors.primary}
            textColor={colors.white}
            icon={<AntDesign name="plus" size={24} color={colors.white} />}
            onPress={() => openModal()}
          />
        </View>
      )}

    </Container>
  );
}
