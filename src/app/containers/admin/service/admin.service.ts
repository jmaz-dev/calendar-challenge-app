import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, of } from 'rxjs';
import { session } from 'src/app/classes/session';
import { Urls } from 'src/app/classes/urls';
import { EventRequest } from 'src/app/shared/interfaces/event-request';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url: Urls = new Urls();
  private readonly API = this.url.url_base_api;
  private readonly userId = session.getItem('userId');
  private readonly token = session.getItem('token') ?? '';
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  public complete(req: FormData) {
    let endpoint = `${this.API}complete-profile/${this.userId}`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.put<any>(endpoint, req, options).pipe(
      first(),
      catchError((err) => {
        if (err.status === 404 || err.status === 500) {
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

  public userById() {
    let endpoint = `${this.API}users/${this.userId}`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.get<any>(endpoint, options).pipe(
      first(),
      catchError((err) => {
        if (err.status === 404 || err.status === 500) {
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

  public eventsByUser() {
    let endpoint = `${this.API}events-user`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.get<any>(endpoint, options).pipe(
      first(),
      catchError((err) => {
        if (err.status === 404 || err.status === 500) {
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

  public create(req: EventRequest) {
    let endpoint = `${this.API}events`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.post<any>(endpoint, req, options).pipe(
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

  public edit(req: EventRequest, id: string) {
    let endpoint = `${this.API}events/${id}`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.put<any>(endpoint, req, options).pipe(
      first(),
      catchError((err) => {
        if (err.status === 400 || err.status === 500 || err.status === 404) {
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

  public delete(id: string) {
    let endpoint = `${this.API}events/${id}`;
    let headers = new HttpHeaders().append('Authorization', this.token);
    let options = { headers: headers };
    return this.httpClient.delete<any>(endpoint, options).pipe(
      first(),
      catchError((err) => {
        if (err.status === 404 || err.status === 500) {
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
}
