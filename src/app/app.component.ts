import {Component, inject} from '@angular/core';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import {ForbiddenValidatorDirective} from "./validators/forbidden.validator";
import {forbiddenCredentials} from "./validators/forbidden-credentials.validator";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <input formControlName="firstName">
      <input formControlName="lastName">

      <div formGroupName="address">
        <h5>Address</h5>
        <input formControlName="city">
        <input formControlName="street">
      </div>

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
    </form>
    <hr>
    {{ profileForm.getRawValue() | json }}

    <hr>
    <input type="radio" [formControl]="food" value="beef"> Beef
    <input type="radio" [formControl]="food" value="lamb"> Lamb
    <input type="radio" [formControl]="food" value="fish"> Fish

    <br>
    {{ food.value }}
  `,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    ForbiddenValidatorDirective,
    NgForOf,
  ],
})
export class AppComponent {

  private fb = inject(NonNullableFormBuilder);

  food = this.fb.control<'beef' | 'lamb' | 'fish'>('beef');

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      city: '',
      street: '',
    }),
    phones: this.fb.array<FormControl<string>>([])
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



