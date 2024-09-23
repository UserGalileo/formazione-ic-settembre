import {Routes} from '@angular/router';
import {UsersComponent} from "./pages/users.component";
import {authGuard} from "./guards/auth.guard";
import {AdminService} from "./services/admin.service";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id',
        loadComponent: () => import('./pages/user.component').then(m => m.UserComponent),
      },
    ]
  },
  {
    // /old-user-page?userId=123
    path: 'old-user-page',
    redirectTo: ({ queryParams }) => {
      const userIdParam = queryParams['userId'];
      if (userIdParam !== undefined) {
        return `users/${userIdParam}`;
      } else {
        console.error('Attenzione...');
        return '/not-found';
      }
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes'),
    canMatch: [authGuard],
    providers: [AdminService]
  },
  {
    path: '**',
    redirectTo: '/users',
  }
];
