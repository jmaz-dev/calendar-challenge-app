import { Component, Inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { ValidaFormService } from 'src/app/shared/utils/valida-form.service';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventResponse } from 'src/app/shared/interfaces/event-response';
import { EventRequest } from 'src/app/shared/interfaces/event-request';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventResponse,
    private adminSrv: AdminService,
    public formUtils: ValidaFormService,
    private formBuilder: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      startDate: [this.data.startDate, [Validators.required]],
      endDate: [this.data.endDate, [Validators.required]],
      description: [
        this.data.description,
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
    const id: string = this.data._id;

    this.adminSrv.edit(req, id).subscribe({
      next: (res) => {
        if (!res.error) {
          this.toastr.success('Evento atualizado', 'Sucesso!');
          setTimeout(() => {
            this.closeDialog();
          }, 400);
        }
      },
    });
  }
  onDelete() {
    const id: string = this.data._id;

    this.adminSrv.delete(id).subscribe({
      next: (res) => {
        if (res == null) {
          this.toastr.success('Evento excluído', 'Sucesso!');
          setTimeout(() => {
            this.closeDialog();
          }, 400);
        }
      },
    });
  }
}
