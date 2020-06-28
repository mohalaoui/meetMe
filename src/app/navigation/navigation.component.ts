import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

const LOGIN = 'login';
const LOGOUT = 'logout';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userName: string;
  connexion: string;

  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
  }

  ngOnInit() {
    try {
      this.userName = this.keycloakAngular.getKeycloakInstance().tokenParsed["preferred_username"];
      this.connexion = LOGOUT;
    } catch (e) {
      console.log('Failed to load user details', e);
      this.connexion = LOGIN;
    }
  }

  logout() {
    this.keycloakAngular.logout().then(
      () => {
        this.connexion = LOGIN;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login() {
    this.keycloakAngular.login().then(
      () => {
        this.connexion = LOGOUT;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  connexionMethod() {
    if (this.connexion === LOGIN) {
      this.login();
    } else {
      this.logout();
    }
  }

}
