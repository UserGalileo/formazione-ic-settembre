import {afterNextRender, afterRender, Component} from "@angular/core";

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

  constructor() {
    afterNextRender(() => {
      console.log('Pagina TUTTA renderizzata');
    });
  }

  ngOnInit() {
    console.log('Card creata');
  }

  ngAfterViewInit() {
    console.log('Card renderizzata')
  }

  ngOnDestroy() {
    console.log('Card distrutta');
  }
}
