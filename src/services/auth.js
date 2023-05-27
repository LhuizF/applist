import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class AuthService {
  async signIn(isEmulator = false) {
    if (isEmulator) {
      return {
        isSusses: false,
        user: {
          id: '1',
          name: 'Luiz Henrique',
          email: 'luiz@email.com',
          photo: '',
          isNewUser: false
        }
      }
    }

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential)
      .then((userCredential) => userCredential)
      .catch((error) => {
        console.log(error)
        return null;
      })

    if (!userCredential) {
      return {
        isSusses: false,
        user: null
      }
    }

    return {
      isSusses: true,
      user: {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photo: userCredential.user.photoURL,
        isNewUser: userCredential.additionalUserInfo.isNewUser,
      }
    };
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthService();
