import axios from 'axios';
import { Button, Text, View } from 'react-native';
import { authorize } from 'react-native-app-auth';

function App() {

  const googleLogin = async () => {
    const GOOGLE_OAUTH_APP_GUID = '245989026495-mk374knehmq7ktu6h3st0g18u1rcbd7s';
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
      redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
      scopes: ['openid', 'profile', 'email'],
    };
    try {
      // Log in to get an authentication token
      const authState = await authorize(config);
      console.log(authState); // Got token, now use it
      axios({
        method: 'get',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
      }).then((response) => {
        console.log(response.data); // Got user info
      }).catch((error) => {
        console.log(error);
      })
    } catch (e) {
      console.log(e);
    }

  }

  const MSLogin = async () => {
    const config = {
      issuer: 'https://login.microsoftonline.com/common',
      clientId: 'f6e906f5-82ba-46f2-b3f0-73c4ad692718',
      redirectUrl: 'msauth://com.zelomeetings/lPZSqV6dsYwY8YGcZxHGS5grkQM%3D',
      scopes: ['openid', 'profile', 'email'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        revocationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
      },
      useNonce: true,
      usePKCE: true, //For iOS, we have added the useNonce and usePKCE parameters, which are recommended for security reasons.
      additionalParameters: {
        prompt: 'consent',
      },
    };
    try {
      const result = await authorize(config);
      console.log(result); // Got token, now use it
      axios({
        method: 'get',
        url: 'https://graph.microsoft.com//oidc/userinfo',
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      }).then((response) => {
        console.log(response.data); // Got user info
      }).catch((error) => {
        console.log(error);
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Demo</Text>
      <Button onPress={googleLogin} title='Login G' />
      <Button onPress={MSLogin} title='Login MS' />
    </View>
  )
}

export default App