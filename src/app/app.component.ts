import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meetMe';

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
    const firebaseConfig = {
      apiKey: "AIzaSyB1eVazaXE_WrsCe8QKpShQLSqcuQdr2O4",
      authDomain: "angular-cv-de450.firebaseapp.com",
      databaseURL: "https://angular-cv-de450.firebaseio.com",
      projectId: "angular-cv-de450",
      storageBucket: "angular-cv-de450.appspot.com",
      messagingSenderId: "327129657931",
      appId: "1:327129657931:web:23f1f79ea798e0573853ce",
      measurementId: "G-ND2TC52KCT"
    };
    firebase.initializeApp(firebaseConfig);
  }

  
  
}
