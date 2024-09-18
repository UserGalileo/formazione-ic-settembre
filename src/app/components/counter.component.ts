import {Component, Input, output} from "@angular/core";

// Stateful
@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <span
      [style]="{
        background: count < 0 ? 'black' : 'inherit',
        color: count < 0 ? 'red' : 'inherit',
        fontSize: '18px'
      }"
      [class.danger]="count < 0"
    >
      {{ count }}
    </span>

    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
  styles: `
    .danger {
      color: red;
      font-weight: bold;
    }
  `
})
export class CounterComponent {

  @Input() count = 0;

  // Output
  countChange = output<number>();

  inc() {
    this.count++;
    this.countChange.emit(this.count);
  }

  dec() {
    this.count--;
    this.countChange.emit(this.count);
  }
}
