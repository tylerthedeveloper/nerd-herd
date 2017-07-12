interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'F7FjwcuRxnaGzvyKyf72mQRh0kIgxfyF',
  CLIENT_DOMAIN: 'ewf.auth0.com',
  AUDIENCE: 'ewf-api',
  REDIRECT: 'http://localhost:3000/callback',
  SCOPE: 'openid'
};
