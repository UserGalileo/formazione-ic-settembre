import {AbstractControl} from "@angular/forms";

// Cross-field validation
export function forbiddenCredentials(
  firstName: string,
  lastName: string,
) {
  return (control: AbstractControl) => {
    if (
      control.get('firstName')?.value === firstName
      && control.get('lastName')?.value === lastName
    ) {
      return {
        forbiddenCredentials: `${firstName} ${lastName}`,
      }
    }
    return null;
  }
}
