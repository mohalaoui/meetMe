# MeetMe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Fonctionnality

demo for Resume with angular and firebase back end

## Template

Template origine : https://onepagelove.com/meetme-lite

## Security
"keycloak-angular": "^7.3.1", "keycloak-js": "^10.0.2"
- keycloak is used for managing the security of the app 
- keycloak-angular is used for integration 
- all the page of the site in this demo are public, only update CV page is protected and user must have admin role.

<pre><code>
{
    path: 'update',
    component: CurriculumFormComponent,
    canActivate: [authService],
    data: { roles: ['admin'] }
}
</code>
</pre>

### keycloak-angular configuration

<pre><code>
// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.5.5:8080/auth',
  realm: 'springDemo',
  clientId: 'meetme-app'
};



export const environment = {
  production: false,
  keycloakConfig
};
</code></pre>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
