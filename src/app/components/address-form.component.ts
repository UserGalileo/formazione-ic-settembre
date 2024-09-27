import {Component, inject} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: "app-address-form",
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="addressForm">
      <h5>Address</h5>
      <input formControlName="city" placeholder="City">
      <input formControlName="street" placeholder="Street">
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressFormComponent,
      multi: true
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor {

  private fb = inject(NonNullableFormBuilder);

  addressForm = this.fb.group({
    city: '',
    street: ''
  });

  sub: Subscription | null = null;

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  writeValue(obj: any) {
    this.addressForm.setValue(obj);
  }

  registerOnChange(fn: any) {
    this.sub = this.addressForm.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {}

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }
}
