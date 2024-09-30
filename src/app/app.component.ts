import {Component} from '@angular/core';
import {ActiveUserComponent} from "./components/active-user.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ActiveUserComponent,
    RouterOutlet
  ],
  template: `
    <router-outlet />
  `
})
export class AppComponent {


}
