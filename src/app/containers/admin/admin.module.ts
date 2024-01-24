import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';

@NgModule({
  declarations: [ViewEventsComponent, CreateEventComponent, CompleteProfileComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
