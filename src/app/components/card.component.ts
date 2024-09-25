import {afterNextRender, afterRender, Component, contentChild, ElementRef} from "@angular/core";
import {CounterComponent} from "./counter.component";

@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="card-shadow">
      <ng-content select=".card-title" />
      <hr>
      <ng-content select=".card-body" />
      <hr>
      <ng-content />
    </div>
  `,
  styles: `
    .card-shadow {
      border: 1px solid black;
      border-radius: 5px;
      padding: 4px;
    }
  `
})
export class CardComponent {

  foo = contentChild(CounterComponent);

  constructor() {
    afterNextRender(() => {
      console.log('Pagina TUTTA renderizzata');
    });
  }

  ngAfterContentInit() {
    console.log(this.foo());
  }
}
