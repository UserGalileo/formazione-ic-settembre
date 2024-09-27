import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {ForbiddenValidatorDirective} from "./validators/forbidden.validator";
import {forbiddenCredentials} from "./validators/forbidden-credentials.validator";
import {CounterComponent} from "./components/counter.component";
import {AddressFormComponent} from "./components/address-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <input formControlName="firstName" placeholder="First name">
      <input formControlName="lastName" placeholder="Last name">

      <app-address-form formControlName="address" />

      <div formArrayName="phones">
        <h5>Phones</h5>
        <button type="button" (click)="addPhone()">+ Add phone</button>
        @for (phone of profileForm.controls['phones'].controls; let i = $index; track phone) {
          <div>
            <input type="text" [formControlName]="i">
            <button type="button" (click)="removePhone(i)">- Remove phone</button>
          </div>
        }
      </div>

      <app-counter formControlName="counter" />
    </form>

    <hr>

    {{ profileForm.value | json }}

    <hr>
    <input type="radio" [formControl]="food" value="beef"> Beef
    <input type="radio" [formControl]="food" value="lamb"> Lamb
    <input type="radio" [formControl]="food" value="fish"> Fish

    <br>
    {{ food.value }}
  `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    ForbiddenValidatorDirective,
    NgForOf,
    CounterComponent,
    AddressFormComponent,
  ],
})
export class AppComponent {

  private fb = inject(NonNullableFormBuilder);

  food = this.fb.control<'beef' | 'lamb' | 'fish'>('beef');

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: {
      city: '',
      street: '',
    },
    phones: this.fb.array<FormControl<string>>([]),
    counter: 0
  }, {
    validators: forbiddenCredentials('Michele', 'Stieven')
  });

  onSubmit() {
    console.log(this.profileForm.getRawValue());
    console.log(this.profileForm.valid);
  }

  addPhone() {
    const phones = this.profileForm.controls['phones'];
    phones.push(this.fb.control(''));
  }

  removePhone(i: number) {
    console.log(i);
    this.profileForm.controls['phones'].removeAt(i);
  }
}



