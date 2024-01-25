import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginRegisterComponent } from './containers/login-register/login-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, LoginRegisterComponent],
  imports: [
    JsonPipe,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(_adapter: DateAdapter<any>) {
    _adapter.setLocale('pt');
  }
}
