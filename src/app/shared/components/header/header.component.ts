import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { session } from 'src/app/classes/session';
import { UserResponse } from 'src/app/classes/user-response';
import { AdminService } from 'src/app/containers/admin/service/admin.service';
import { ImageService } from '../../utils/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  open: boolean = false;
  imageUrl!: string;
  user: UserResponse | null = null;
  constructor(
    private adminSrv: AdminService,
    private imgSrv: ImageService,
    public router: Router
  ) {}
  ngOnInit(): void {}
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
}
