import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ValidaFormService } from 'src/app/shared/utils/valida-form.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent {
  form: FormGroup;
  imageUrl: string | null = null;
  file!: File;
  constructor(
    public formUtils: ValidaFormService,
    private formBuilder: NonNullableFormBuilder
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
  onSubmit() {}
  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    console.log(this.file);
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
