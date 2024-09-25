import {Component, computed, effect, input, Input, signal} from "@angular/core";

// Stateful
@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <span
      [style]="{
        background: count() < 0 ? 'black' : 'inherit',
        color: count() < 0 ? 'red' : 'inherit',
        fontSize: '18px'
      }"
      [class.danger]="count() < 0"
    >
      {{ multipliedCount() }}
    </span>

    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
  styles: `
    .danger {
      color: red;
      font-weight: bold;
    }
  `,
})
export class CounterComponent {

  multiplier = input(1);

  // Stati
  count = signal(0);
  multipliedCount = computed(() => this.count() * this.multiplier());

  constructor() {
    effect((onCleanup) => {
      const count = this.count();

      const timer = setTimeout(() => {

        console.log(`5 secondi fa, count è diventato ${count}`);
      }, 5000);

      onCleanup(() => {
        clearTimeout(timer);
      })
    })
  }

  inc() {
    this.count.update(n => n + 1);
  }

  dec() {
    this.count.update(n => n - 1);
  }
}
