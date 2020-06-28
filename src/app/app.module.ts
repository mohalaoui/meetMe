import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwWowModule } from 'ngx-wow';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { initializer } from './utils/app-init';
import { RoutingModule } from './routing.module';
import { CurriculumService } from './services/curriculum.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    PortfolioComponent,
    StatisticsComponent,
    ContactComponent,
    FooterComponent,
    PageNotFoundComponent,
    NavigationComponent,
    CurriculumFormComponent
  ],
  imports: [
    NgwWowModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    RoutingModule
  ],
  providers: [
    CurriculumService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
