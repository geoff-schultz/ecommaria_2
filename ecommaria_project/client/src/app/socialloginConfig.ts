import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
  } from 'angularx-social-login';
  
  export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("532114875168-vuiqei9m4ev3mpcffshsji2nch80jtd6.apps.googleusercontent.com")
      }
    ]);
  
    return config;
  }