import { Component } from '@angular/core';
import { Global } from 'src/app/classes/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  global: Global = new Global();
}
