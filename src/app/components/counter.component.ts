import {Component, effect, inject, Injector, model, signal} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, NgControl,
  ReactiveFormsModule, ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {JsonPipe} from "@angular/common";

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
      {{ count() }}
    </span>

    <button type="button" (click)="inc()">+</button>
    <button type="button" (click)="dec()">-</button>
  `,
  styles: `
    .danger {
      color: red;
      font-weight: bold;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CounterComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CounterComponent,
      multi: true
    }
  ],
  imports: [
    JsonPipe
  ],
  host: {
    '[style.opacity]': `isDisabled() ? 0.5 : 1`,
  }
})
export class CounterComponent implements ControlValueAccessor, Validator {

  injector = inject(Injector);
  ngControl: NgControl | null = null;

  // Stati
  count = model(0);
  isDisabled = model(false);

  onChange = (value: number) => {}
  onTouched = () => {}

  countChangeEffect = effect(() => {
    this.onChange(this.count());
  });

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  inc() {
    if (!this.isDisabled()) {
      this.count.update(n => n + 1);
      this.onTouched();
    }
  }

  dec() {
    if (!this.isDisabled()) {
      this.count.update(n => n - 1);
      this.onTouched();
    }
  }

  // Chiamato ogni volta che il FormControl cambia valore
  writeValue(value: number) {
    this.count.set(value);
  }

  // Chiamata una volta sola all'inizio
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
  }

  validate(control: AbstractControl) {
    if (control.value < 3) {
       return { notEnough: true }
    }
    return null;
  }
}
