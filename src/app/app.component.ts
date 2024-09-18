import {afterNextRender, Component, ElementRef, inject, Renderer2} from '@angular/core';
import { ProfilePhotoComponent } from "./components/profile-photo.component";
import { ThemeableButtonComponent } from "./components/themeable-button.component";
import {CounterComponent} from "./components/counter.component";
import {SumComponent} from "./components/sum.component";
import {SliderComponent} from "./components/slider.component";
import {BmiComponent} from "./components/bmi.component";
import {ActiveUserComponent} from "./components/active-user.component";
import {CardComponent} from "./components/card.component";

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

    <input type="text">
  `,
  imports: [
    // ActiveUserComponent,
    // ProfilePhotoComponent,
    // ThemeableButtonComponent,
    // CounterComponent,
    SumComponent,
    // SliderComponent,
    // BmiComponent,
    CardComponent
  ]
})
export class AppComponent {

  // Dipendenze
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  // Stato
  count = 2;
  isCardVisible = false;

  ngAfterViewInit() {
    this.el.nativeElement.querySelector('input')?.focus();
  }

  onCountChange(count: number) {
    this.count = count;
  }

}
