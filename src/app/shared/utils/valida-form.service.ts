import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ValidaFormService {
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(`${fieldName}`) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return '* Campo obrigatório!';
    }
    if (field?.hasError('maxlength')) {
      const maxLength: number = field?.errors
        ? // retorna o valor estipulado no validator
          field.errors['maxlength']['requiredLength']
        : 100;

      return `* Máximo ${maxLength} caracteres.`;
    }
    if (field?.hasError('minlength')) {
      const minLength: number = field?.errors
        ? // retorna o valor estipulado no validator
          field.errors['minlength']['requiredLength']
        : 5;

      return `* Mínimo ${minLength} caracteres.`;
    }
    if (field?.hasError('email')) {
      return '* Digite um e-mail válido!';
    }
    return 'Campo Inválido';
  }

  validateAllFormField(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormField(control);
      }
    });
  }
}
