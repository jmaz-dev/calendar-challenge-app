import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { AdminComponent } from './admin.component';
import { CardsComponent } from './components/cards/cards.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';

@NgModule({
  declarations: [
    ViewEventsComponent,
    CreateEventComponent,
    CompleteProfileComponent,
    AdminComponent,
    CardsComponent,
    EditEventComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
