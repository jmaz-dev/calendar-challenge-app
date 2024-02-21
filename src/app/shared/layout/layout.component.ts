import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  rota: any;
  constructor(route: Router) {
    route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.rota = event.url;
      });
  }
  matchRoute(rotaDesejada: string): boolean {
    const rotaFilha = this.rota;

    if (rotaFilha === rotaDesejada) {
      return true;
    } else {
      return false;
    }
  }
}
