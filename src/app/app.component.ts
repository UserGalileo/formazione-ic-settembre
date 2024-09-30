import {Component} from '@angular/core';
import {ActiveUserComponent} from "./components/active-user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ActiveUserComponent
  ],
  template: `
    <app-active-user />
  `
})
export class AppComponent {


}
