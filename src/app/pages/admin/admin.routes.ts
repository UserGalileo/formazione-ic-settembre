import {Route} from "@angular/router";
import {AdminHomeComponent} from "./admin-home.component";
import {AdminUsersComponent} from "./admin-users.component";
import {canLeaveGuard} from "../../guards/can-leave.guard";

const adminRoutes: Route[] = [
  {
    path: '',
    component: AdminHomeComponent,
    canDeactivate: [canLeaveGuard]
  },
  {
    path: 'users',
    component: AdminUsersComponent
  },
];

export default adminRoutes;
