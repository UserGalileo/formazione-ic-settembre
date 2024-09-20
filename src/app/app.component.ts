import {Component, ElementRef, inject, Renderer2} from '@angular/core';
import {SumComponent} from "./components/sum.component";
import {CardComponent} from "./components/card.component";
import {HighlightDirective} from "./directives/highlight.directive";
import {UnlessDirective} from "./directives/unless.directive";
import {BoldifyDirective, HighlightAndBoldify} from "./directives/boldify.directive";
import {CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe} from "@angular/common";
import {ExponentialPipe} from "./pipes/exponential.pipe";
import {LoggerService} from "./services/logger.service";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<!--    <h1>Hello world!</h1>-->
<!--    <h3>Prova</h3>-->

<!--    <app-profile-photo></app-profile-photo>-->
<!--    <app-profile-photo></app-profile-photo>-->
<!--    <app-profile-photo></app-profile-photo>-->

<!--    <div class="red-theme">-->
<!--      <themeable-button></themeable-button>-->
<!--    </div>-->

<!--    <app-counter-->
<!--      [(count)]="count"-->
<!--    />-->
<!--    <app-counter-->
<!--      [count]="count"-->
<!--      (countChange)="onCountChange($event)"-->
<!--    />-->
<!--    <app-counter-->
<!--      [count]="count"-->
<!--      (countChange)="onCountChange($event)"-->
<!--    />-->

<!--    <app-counter />-->

<!--    <hr>-->

    <app-sum [a]="2" [b]="3" />

<!--    <hr>-->

<!--    <app-slider [(value)]="count" />-->
<!--    <app-slider [value]="30" />-->
<!--    <app-slider [value]="40" />-->

<!--    <app-bmi />-->

<!--    <app-active-user />-->

    @if (isCardVisible) {
      <app-card>
        <div class="card-title">This is the title.</div>
        <div class="card-body">This is the body.</div>
        This is the footer!
      </app-card>
    }
    <button (click)="isCardVisible = !isCardVisible">toggle card</button>

    <hr>

<!--    <div>-->
<!--      <input type="radio" name="colors" (click)="color = 'lightgreen'"> Green-->
<!--      <input type="radio" name="colors" (click)="color = 'yellow'"> Yellow-->
<!--      <input type="radio" name="colors" (click)="color = 'cyan'"> Cyan-->
<!--    </div>-->

<!--    <p [appHighlight]="color">Hello World</p>-->

<!--    <div *unless="false">Hello World</div>-->

<!--    <p appHighlightBoldify>Hello!</p>-->

    {{ today | date }}<br>
    {{ money | currency }}<br>
  `,
  imports: [
    // ActiveUserComponent,
    // ProfilePhotoComponent,
    // ThemeableButtonComponent,
    // CounterComponent,
    SumComponent,
    // SliderComponent,
    // BmiComponent,
    CardComponent,
    HighlightDirective,
    UnlessDirective,
    BoldifyDirective,
    HighlightAndBoldify,
    DatePipe,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    JsonPipe,
    ExponentialPipe
  ],
})
export class AppComponent {

  // Dipendenze
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  // Stato
  count = 2;
  isCardVisible = true;
  color = 'lightgreen';

  today: number = Date.now();
  money = 30.2;
  obj = {
    name: 'Michele',
    surname: 'Stieven'
  }

  ngAfterViewInit() {
    this.el.nativeElement.querySelector('input')?.focus();
  }

  onCountChange(count: number) {
    this.count = count;
  }

  ngOnInit() {

  }

}

