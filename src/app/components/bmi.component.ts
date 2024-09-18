import {Component} from "@angular/core";

@Component({
  selector: "app-bmi",
  standalone: true,
  template: `
    <label>
      Altezza

      <input
        type="number"
        step="0.01"
        [value]="h"
        (input)="heightChange($event)"
      >
    </label><br>

    <label>
      Peso

      <input
        type="number"
        [value]="w"
        (input)="weightChange($event)"
      >
    </label><br>

    <hr>

    {{ bmi }}
    <br>
    {{ giudizio }}

  `
})
export class BmiComponent {

  // Stati
  w = 100;
  h = 1.80;

  // Stati derivati
  get bmi() {
    if (!this.h || !this.w) {
      return null;
    }
    return this.w / (this.h ** 2);
  }

  get giudizio() {
    if (!this.bmi) return '-';
    if (this.bmi < 18.5) return 'sottopeso';
    if (this.bmi < 25) return 'normopeso';
    return 'sovrappreso';
  }

  heightChange(e: Event) {
    this.h = +(e.target as HTMLInputElement).value || 0;
  }

  weightChange(e: Event) {
    this.w = +(e.target as HTMLInputElement).value || 0;
  }
}
