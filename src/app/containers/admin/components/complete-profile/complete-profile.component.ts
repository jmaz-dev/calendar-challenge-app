import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/classes/user-request';
import { ValidaFormService } from 'src/app/shared/utils/valida-form.service';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { session } from 'src/app/classes/session';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent {
  form: FormGroup;
  imageUrl!: string;
  file!: File;
  constructor(
    public formUtils: ValidaFormService,
    private formBuilder: NonNullableFormBuilder,
    private adminSrv: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('lastName', this.form.value.lastName);
    formData.append('photo', this.file);

    if (this.form.invalid) {
      return this.formUtils.validateAllFormField(this.form);
    }
    this.adminSrv.complete(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (!res.error) {
          this.toastr.success('Sucesso!');
          session.setItem('needsProfile', 'false');
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 200);
        }
      },
    });
  }
  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (this.file) {
      this.readImage(this.file);
    }
  }

  readImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageUrl = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}
