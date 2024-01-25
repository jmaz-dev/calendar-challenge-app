import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { UserResponse } from 'src/app/shared/interfaces/user-response';
import { AdminService } from 'src/app/containers/admin/service/admin.service';
import { ImageService } from '../../utils/image.service';
import { CreateEventComponent } from 'src/app/containers/admin/components/create-event/create-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isAdmin: boolean = false;
  open: boolean = false;
  imageUrl!: string;
  user: UserResponse | null = null;
  constructor(
    private adminSrv: AdminService,
    private imgSrv: ImageService,
    public router: Router,
    public dialog: MatDialog
  ) {}
  getUser() {
    this.adminSrv.userById().subscribe({
      next: (res) => {
        if (!res.error) {
          this.user = res;
          const buffer = this.user?.photo.data.data;
          if (buffer) {
            const base64Image = this.imgSrv.arrayBufferToBase64(buffer);
            this.imageUrl = `data:image/png;base64,${base64Image}`;
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onExit() {
    this.open = !this.open;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  openDialog() {
    this.open = !this.open;

    this.dialog.open(CreateEventComponent);
  }
}
