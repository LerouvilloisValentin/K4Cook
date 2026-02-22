import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeForumComponent } from './home-forum/home-forum.component';
import { WeatherComponent } from './weather/weather.component';
import { DetailsSubjectComponent } from './details-subject/details-subject.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { QualitairComponent } from './qualitair/qualitair.component';
import { userAuthGuard } from './auth/user-auth.guard';
import { adminAuthGuard } from './admin-auth.guard';
import { SettingComponent } from './setting/setting.component';

export const routes: Routes = [
  { path: '', redirectTo: 'forum', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: HomeForumComponent },
  { path: 'subject/:id', component: DetailsSubjectComponent },
  { path: 'setting', component: SettingComponent },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'userManagement',
    component: UserManagementComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'airQuality',
    component: QualitairComponent,
    canActivate: [userAuthGuard],
  },
];
