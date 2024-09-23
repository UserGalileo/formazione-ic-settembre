import {Component, inject} from "@angular/core";
import {RouterLink} from "@angular/router";
import {CanLeave} from "../../guards/can-leave.guard";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: "app-admin-home",
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <h3>Admin Home</h3>

    <hr>

    <button routerLink="/">Back</button>
  `,
})
export class AdminHomeComponent implements CanLeave {

  private adminService = inject(AdminService);

  canLeave() {
    return confirm('Sei sicuro?');
  }
}
