import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PrescriptionsListComponent } from './modules/prescriptions/list/prescriptions-list.component';
import { AuthGuard } from './modules/auth/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    {
    path: 'prescriptions',
    canActivate: [AuthGuard], 
    children: [
      { 
        path: 'list', 
        component: PrescriptionsListComponent  // other routes can be added here
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
];
