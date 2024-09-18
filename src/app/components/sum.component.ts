import {Component, Input} from "@angular/core";

// Stateless
@Component({
  selector: 'app-sum',
  standalone: true,
  template: `
    {{ a + b }}
  `,
})
export class SumComponent {

  @Input({ required: true }) a!: number;
  @Input({ required: true }) b!: number;
}



