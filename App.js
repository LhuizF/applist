import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './src/navigation'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthProvider } from './src/context/auth';
import { BottomModalProvider } from './src/context/bottomModal';
import { google } from './config.json';
import colors from './src/theme/colors';
import Lottie from 'lottie-react-native';

const webClientId = '275692289201-r70l2a40gv8g1lb8uop02hn0ph5sm957.apps.googleusercontent.com'

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
