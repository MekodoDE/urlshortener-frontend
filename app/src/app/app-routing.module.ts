import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { UrlsListComponent } from './components/urls/urls-list/urls-list.component';
import { UrlCreateComponent } from './components/urls/url-create/url-create.component';
import { UrlEditComponent } from './components/urls/url-edit/url-edit.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:urlKey', component: UserEditComponent },
  { path: 'user', component: UserListComponent },
  { path: 'url/create', component: UrlCreateComponent },
  { path: 'url/:urlKey/edit', component: UrlEditComponent },
  { path: 'url', component: UrlsListComponent },
  { path: '**', component: RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
