import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet'
import colors from '../../../theme/colors';
import { View } from 'react-native';
import { Container } from './styles'

export const BottomModal = ({ children, isOpen, close, max = '40%' }) => {

  const bottomSheetRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.collapse();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen &&
        <Container onPress={close} >
          {children}
        </Container>
      }
      {/* <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, max]}
        backgroundStyle={{ backgroundColor: colors.primary }}
        handleIndicatorStyle={{ backgroundColor: colors.white }}
        onChange={index => {
          if (index === 0) {
            close();
          }
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: '100%',
            height: '100%',
          }}
        > */}

      {/* </View>
      </BottomSheet > */}
    </>
  );
}
