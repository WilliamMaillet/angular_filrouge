import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/add', component: CarFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'cars/:id', component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: 'cars/edit/:id', component: CarFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '/cars' }
];