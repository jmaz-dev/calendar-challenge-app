import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'register',
})
export class RegisterPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'signup':
        return 'Crie sua conta';
      case 'signin':
        return 'Entrar';
      case 'possui':
        return 'Já possui uma conta?';
      case 'npossui':
        return 'Não possui uma conta?';
      case 'entrar':
        return 'Entrar';
      case 'criar':
        return 'Criar';
    }
    return 'code';
  }
}
