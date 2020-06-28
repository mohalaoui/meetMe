import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';

import { AuthguardserviceService as authService } from './services/authguardservice.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: SkillsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'update',
    component: CurriculumFormComponent,
    canActivate: [authService],
    data: { roles: ['admin'] }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [authService]
})
export class RoutingModule { }
