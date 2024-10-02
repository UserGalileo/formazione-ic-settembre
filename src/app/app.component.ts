import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AddressFormComponent} from "./components/address-form.component";

// Deferrable Views
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddressFormComponent
  ],
  template: `
    @defer (on interaction; prefetch on hover) {
      <app-address-form />
    } @placeholder () {
      <p>Placeholder...</p>
    }
  `
})
export class AppComponent {}
