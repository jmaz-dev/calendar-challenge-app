import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ValidaFormService } from 'src/app/shared/utils/valida-form.service';
import { LoginService } from './service/login.service';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/classes/auth-response';
import { session } from 'src/app/classes/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  entrar: boolean = true;
  hide: boolean = true;
  link: string = 'entrar';
  help: string = 'possui';
  title: string = 'signup';
  form: FormGroup;

  constructor(
    public formUtils: ValidaFormService,
    private formBuilder: NonNullableFormBuilder,
    private loginSrv: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.formUtils.validateAllFormField(this.form);
    }
    this.loginSrv.authenticate(this.form.value, this.title).subscribe({
      next: (res: AuthResponse) => {
        if (!res.error) {
          session.setItem('token', res.token);
          session.setItem('userId', res.userId);
          session.setItem('needsProfile', String(res.needsProfile));

          setTimeout(() => {
            window.location.href = '/admin';
          }, 200);
        }
      },
    });
  }
  loginScreen() {
    if (this.link !== 'criar') {
      this.link = 'criar';
      this.help = 'npossui';
      this.title = 'signin';
    } else {
      this.link = 'entrar';
      this.help = 'possui';
      this.title = 'signup';
    }
  }
}
