import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from './projects/project.service';
import { AboutComponent } from './about/about.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationListComponent } from './organizations/organization-list/organization-list.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { OrganizationEditComponent } from './organizations/organization-edit/organization-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    LoginComponent,
    ProjectListComponent,
    ProjectsComponent,
    AboutComponent,
    OrganizationsComponent,
    OrganizationListComponent,
    ProjectEditComponent,
    OrganizationEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
      ],
  bootstrap: [AppComponent]
})
export class AppModule {}
