import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './src/navigation'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthProvider } from './src/context/auth';
import { BottomModalProvider } from './src/context/bottomModal';
import { google } from './config.json';
import colors from './src/theme/colors';

const webClientId = google.client_Id;

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
