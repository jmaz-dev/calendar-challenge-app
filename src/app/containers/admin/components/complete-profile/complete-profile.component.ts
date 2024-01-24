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
      photo: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.form);
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readImage(file);
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
