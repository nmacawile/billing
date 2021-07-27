import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { UnauthGuard } from './core/unauth.guard';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: MainComponent },
  {
    path: 'login',
    canActivate: [UnauthGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [UnauthGuard],
    component: RegisterComponent,
  },
  {
    path: 'templates',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./templates/templates.module').then((m) => m.TemplatesModule),
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: 'billings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./billings/billings.module').then((m) => m.BillingsModule),
  },
  {
    path: 'items',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./items/items.module').then((m) => m.ItemsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
