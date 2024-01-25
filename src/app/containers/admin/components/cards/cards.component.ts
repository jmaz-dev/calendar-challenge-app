import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventResponse } from 'src/app/shared/interfaces/event-response';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  constructor(public dialog: MatDialog) {}
  @Input() data!: EventResponse;

  openDialog() {
    this.dialog
      .open(EditEventComponent, {
        data: this.data,
      })
      .afterClosed()
      .subscribe(() => {
        window.location.reload();
      });
  }
}
