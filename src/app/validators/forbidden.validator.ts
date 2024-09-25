// ValidatorFn
// (control: AbstractControl) => ValidationErrors | null

import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from "@angular/forms";
import {Directive, input} from "@angular/core";
import {delay, of} from "rxjs";

// Factory (Higher-order function)
export function forbiddenValidator(name: string) {
  return (control: AbstractControl) => {
    return control.value === name ? {
      forbiddenName: control.value
    } : null;
  }
}

@Directive({
  selector: '[forbiddenName]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ]
})
export class ForbiddenValidatorDirective implements AsyncValidator {

  forbiddenName = input('');

  validate(control: AbstractControl) {
    return of(forbiddenValidator(this.forbiddenName())(control)).pipe(
      delay(2000)
    );
  }
}
