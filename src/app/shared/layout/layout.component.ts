import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {});
  }
  matchRoute(rotaDesejada: string): boolean {
    rotaDesejada = rotaDesejada.replace(/[/\\-]/g, '');
    const rota =
      this.activatedRoute.firstChild?.snapshot.routeConfig?.path ?? '';
    const rotaFilha = rota.replace(/[/\\-]/g, '');

    if (rotaFilha === rotaDesejada) {
      return true;
    } else {
      return false;
    }
  }
}
