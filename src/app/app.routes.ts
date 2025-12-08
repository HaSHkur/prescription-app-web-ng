import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PrescriptionsListComponent } from './modules/prescriptions/list/prescriptions-list.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { PrescriptionsFormComponent } from './modules/prescriptions/form/prescriptions-form.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent,
        data: { hideSidebar: true }
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        data: { hideSidebar: true }
    },
    {
    path: 'prescriptions',
    canActivate: [AuthGuard], 
    children: [
      { 
        path: 'list', 
        component: PrescriptionsListComponent 
      },
      {
        path: "create",
        component: PrescriptionsFormComponent
      },
      {
        path: "edit/:id",
        component: PrescriptionsFormComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
];
