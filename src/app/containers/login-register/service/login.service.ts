import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';
import { first, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Urls } from 'src/app/classes/urls';
import { AuthResponse } from 'src/app/classes/auth-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: Urls = new Urls();
  private readonly API = this.url.url_base_api;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  private create(req: Partial<User>) {
    return this.httpClient.post<AuthResponse>(`${this.API}users`, req).pipe(
      first(),
      catchError((err) => {
        if (err.status === 400 || err.status === 500) {
          this.toastr.error(err.error.error, 'Erro!');
        } else {
          this.toastr.error(
            'Ocorreu um erro inesperado, tente novamente mais tarde!',
            'Erro!'
          );
        }
        return of(err);
      })
    );
  }

  private login(req: Partial<User>) {
    return this.httpClient.post<AuthResponse>(`${this.API}login`, req).pipe(
      first(),
      catchError((err) => {
        if (err.status === 401 || err.status === 500) {
          this.toastr.error(err.error.error, 'Erro!');
        } else {
          this.toastr.error(
            'Ocorreu um erro inesperado, tente novamente mais tarde!',
            'Erro!'
          );
        }
        console.error(err.message);
        return of(err);
      })
    );
  }

  public authenticate(req: Partial<User>, method: string) {
    if (method === 'signin') {
      return this.login(req);
    } else {
      return this.create(req);
    }
  }
}
