import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet'
import colors from '../../../theme/colors';

export const BottomModal = ({ children, isOpen, close }) => {

  const bottomSheetRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.collapse();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1, '40%']}
      backgroundStyle={{ backgroundColor: colors.primary }}
      handleIndicatorStyle={{ backgroundColor: colors.white }}
      onChange={index => {
        if (index === 0) {
          close();
        }
      }}
    >
      {children}
    </BottomSheet >
  );
}
