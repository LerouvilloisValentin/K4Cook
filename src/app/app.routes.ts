import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { adminAuthGuard } from './admin-auth.guard';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'setting', component: SettingComponent },
  {
    path: 'userManagement',
    component: UserManagementComponent,
    canActivate: [adminAuthGuard],
  },
];
