import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ValiadtionFunction (regex:RegExp) : ValidatorFn{
  return (control:AbstractControl) : null | {[key:string] :boolean} => {
    if(control.value.match(regex)){
      return { notValid : true};
    }else return null;
  }
}
