import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './common/guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/dashboard/dashboard-module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'system',
    loadChildren: () => import('./pages/system/system-module').then(m => m.SystemModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category-module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expense',
    loadChildren: () => import('./pages/expense/expense-module').then(m => m.ExpenseModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/access-denied/access-denied-module').then(m => m.AccessDeniedModule)
  },
];
