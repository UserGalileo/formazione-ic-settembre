import {Component} from "@angular/core";

@Component({
  selector: 'themeable-button',
  standalone: true,
  template: `
    <button>Themeable button</button>
  `,
  styles: `
    :host-context(.red-theme) button {
      background: red;
    }

    :host-context(.blue-theme) button {
      background: blue;
    }
  `
})
export class ThemeableButtonComponent {

}
