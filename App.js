import 'react-native-reanimated';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './src/navigation'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthProvider } from './src/context/auth';
import { BottomModalProvider } from './src/context/bottomModal';
import colors from './src/theme/colors';

const webClientId = '275692289201-qpqerdnc2v25i0ga3cq9psq4t135e4un.apps.googleusercontent.com'

export default function App() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId
    });
  }, [])

  return (
    <AuthProvider>
      <BottomModalProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <Navigation />
      </BottomModalProvider>
    </AuthProvider>
  );
}
