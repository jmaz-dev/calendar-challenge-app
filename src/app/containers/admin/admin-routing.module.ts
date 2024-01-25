import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { authGuard } from 'src/app/guard/auth.guard';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  {
    path: 'editar',
    component: CreateEventComponent,
    canActivate: [authGuard],
  },
  {
    path: 'complete-profile',
    component: CompleteProfileComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
