import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidationFunction(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const invalid = regex.test(control.value);
    return invalid ? { notValid: true } : null;
  };
}
