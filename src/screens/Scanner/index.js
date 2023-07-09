import 'react-native-reanimated';
import React, { useEffect, useState } from "react";
import { Container } from '../../components/Templates/container';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { Camera, useCameraDevices, useFrameProcessor } from "react-native-vision-camera";
import colors from "../../theme/colors";
import { Button } from "../../components/Atoms/Button";
import { BarcodeFormat, scanBarcodes } from "vision-camera-code-scanner";
import { runOnJS } from "react-native-reanimated";
import { useAuth } from '../../context/auth';
import firebase from '../../services/firebase';
import Lottie from 'lottie-react-native';

export const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const devices = useCameraDevices()
  const device = devices.back

  const { user } = useAuth()

  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus()
      setHasPermission(status === 'authorized')
      if (status != 'authorized') {
        const newPermission = await Camera.requestCameraPermission()
        setHasPermission(newPermission === 'authorized')
      }
    })()
  }, [])

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });

    runOnJS(setCodes)(detectedBarcodes);
  }, [])


  useEffect(() => {
    if (codes.length > 0) {
      const listId = codes[0].displayValue
      joinInList(listId)
    }
  }, [codes])

  const joinInList = async (listId) => {
    setLoading(true)

    const res = await firebase.joinList({
      listId: listId,
      userId: user.id
    })

    if (!res) {
      setInterval(() => {
        setLoading(false)
      }, 2000)
      ToastAndroid.show('Lista não encontrada', ToastAndroid.SHORT);
      return;
    }

    navigation.navigate('ListItems', { listId: listId })
  }


  return (
    device != null &&
    hasPermission && (
      <Container>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loading}>
              <Lottie
                source={require('../../assets/animation/loading-spinner.json')}
                autoPlay
                loop
                style={[styles.camera, {
                  backgroundColor: '#00000080'
                }]}
              />
            </View>
          ) : (
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.camera}
                device={device}
                isActive={!loading}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              />
            </View>
          )}
          <Button
            type={'icon'}
            text="Cancelar"
            color={colors.red}
            textColor={colors.white}
            icon={<></>}
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
      </Container>)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: "center",
  },
  cameraContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.primary,
    marginTop: 20,
    marginBottom: 50,
  },
  loading: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.primary,
    marginTop: 20,
    marginBottom: 50,
  },
  camera: {
    width: 300,
    height: 300,
  }
})
