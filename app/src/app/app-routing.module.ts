import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { UrlsListComponent } from './components/urls/urls-list/urls-list.component';
import { UrlCreateComponent } from './components/urls/url-create/url-create.component';
import { UrlEditComponent } from './components/urls/url-edit/url-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
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
