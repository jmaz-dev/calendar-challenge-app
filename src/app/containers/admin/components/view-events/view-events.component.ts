import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { EventResponse } from 'src/app/shared/interfaces/event-response';
import { CreateEventComponent } from '../create-event/create-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss'],
})
export class ViewEventsComponent {
  events: EventResponse[] = [];
  constructor(private adminSrv: AdminService, public dialog: MatDialog) {
    this.getUserEvents();
  }
  getUserEvents() {
    this.adminSrv.eventsByUser().subscribe({
      next: (res) => {
        if (!res.error) {
          this.events = res;
        }
      },
    });
  }
  openDialog() {
    this.dialog
      .open(CreateEventComponent)
      .afterClosed()
      .subscribe(() => {
        window.location.reload();
      });
  }
}
