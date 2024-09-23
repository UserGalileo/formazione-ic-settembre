import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormComponent} from "./components/form.component";
import {DumbComponent} from "./components/dumb.component";
import {CounterComponent} from "./components/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button routerLink="/admin">Admin dashboard</button>

    <router-outlet />

    <app-counter />
  `,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormComponent,
    DumbComponent,
    CounterComponent
  ],
  styles: `
    .active {
      font-weight: bold;
    }
  `
})
export class AppComponent {
  router = inject(Router);
}
