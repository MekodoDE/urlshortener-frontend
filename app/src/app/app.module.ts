import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UrlsListComponent } from './components/urls/urls-list/urls-list.component';
import { UrlCreateComponent } from './components/urls/url-create/url-create.component';
import { UrlEditComponent } from './components/urls/url-edit/url-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    NavbarComponent,
    UrlsListComponent,
    UrlCreateComponent,
    UrlEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
