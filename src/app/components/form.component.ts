import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-form",
  standalone: true,
  template: `
    <input type="text" ngModel>
  `,
  imports: [FormsModule]
})
export class FormComponent {

}
