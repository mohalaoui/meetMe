import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgwWowModule } from 'ngx-wow';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

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

const appRoutes: Routes = [
  { path: 'home',       component: HeaderComponent },
  { path: 'about',      component: AboutComponent },
  { path: 'services',   component: SkillsComponent },
  { path: 'resume',     component: ResumeComponent },
  { path: 'work',       component: PortfolioComponent },
  { path: 'contact',    component: ContactComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',         component: PageNotFoundComponent }
];

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
    NavigationComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    NgwWowModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
