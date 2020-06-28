import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.5.5:8080/auth',
  realm: 'springDemo',
  clientId: 'meetme-app'
};

export const environment = {
  production: true,
  keycloakConfig
};
