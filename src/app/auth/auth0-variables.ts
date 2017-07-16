interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'Q9fmCS4NZAHC1dqV0lVFGaVQRBhWta4a',
  domain: 'dani-23.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
