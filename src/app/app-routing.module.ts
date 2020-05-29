import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectsResolverService } from './projects/projects-resolver.service';
import { OrganizationEditComponent } from './organizations/organization-edit/organization-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: ProjectEditComponent },
      {
        path: ':id',
        component: ProjectEditComponent,
        resolve: [ProjectsResolverService]
      }
    ]
  },
  { path: 'organizations',
    component: OrganizationsComponent,
    children: [
      { path: 'new', component: OrganizationEditComponent },
      {
        path: ':id',
        component: OrganizationEditComponent
      }
    ] 
  },
  { path: 'about', component: AboutComponent }, 
   
  { path: 'auth', component: LoginComponent },
  { path: 'oauth/callback', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
