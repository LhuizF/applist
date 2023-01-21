import * as AuthSession from "expo-auth-session";
import config from "../../config.json";

class LoginWithGoogle {
  constructor(AuthSession) {
    this.clientId = config.google.client_Id;
    this.redirectUri = config.google.redirect_uri;
    this.AuthSession = AuthSession;
  }

  async signIn({ isEmulator = false }) {
    try {
      if (isEmulator) {
        return { id: "113924874318898274908" }
      }
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=openid%20email%20profile`;

      const { type, params } = await this.AuthSession.startAsync({ authUrl });

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);

        return await response.json();
      }

      return null;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LoginWithGoogle(AuthSession);

