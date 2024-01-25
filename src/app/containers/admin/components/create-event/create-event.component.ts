import { EventRequest } from './../../../../shared/interfaces/event-request';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidaFormService } from 'src/app/shared/utils/valida-form.service';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  form: FormGroup;

  constructor(
    private adminSrv: AdminService,
    public formUtils: ValidaFormService,
    private formBuilder: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.invalid) {
      return this.formUtils.validateAllFormField(this.form);
    }
    const req: EventRequest = this.form.value;

    this.adminSrv.create(req).subscribe({
      next: (res) => {
        console.log(res);
        if (!res.error) {
          this.toastr.success('Novo evento criado', 'Sucesso!');
          this.closeDialog();
        }
      },
    });
  }
}
