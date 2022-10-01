import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublicComponent } from './components/public/public.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardIndexComponent } from './components/dashboard/dashboard-index/dashboard-index.component';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { NoAuthGuard } from 'src/guards/auth/no-auth.guard';
import { UserResolver } from './resolver/user/user.resolver';
import { RolesComponent } from './components/roles/roles.component';
import { RoleResolver } from './resolver/role/role.resolver';
import { UsersComponent } from './components/users/users.component';
import { UsersResolver } from './resolver/user/users.resolver';
import { SignupComponent } from './components/signup/signup.component';
import { RoleGuard } from '../guards/role/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    component: PublicComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignupComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        resolve: {
          response: UserResolver
        },
        component: DashboardIndexComponent
      },
      {
        path: 'users',
        resolve: {
          response: UsersResolver
        },
        component: UsersComponent
      },
      {
        data: {
          roles: ['Admin']
        },
        canActivate: [RoleGuard],
        path: 'roles',
        resolve: {
          response: RoleResolver
        },
        component: RolesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }