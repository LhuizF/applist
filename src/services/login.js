import * as AuthSession from "expo-auth-session";

class LoginWithGoogle {
  constructor(AuthSession) {
    this.clientId = '';
    this.redirectUri = '';
    this.AuthSession = AuthSession;
  }

  async signIn() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=openid%20email%20profile`;

    const { type, params } = await this.AuthSession.startAsync({ authUrl });

    if (type === 'success') {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);

      return await response.json();
    }

    return null;
  }
}

export default new LoginWithGoogle(AuthSession);
