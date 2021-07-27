import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  processing = false;
  registerForm: FormGroup = new FormGroup({});
  errorMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'E-mail is required.',
      email: 'Not a valid e-mail format.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Must be at least six (6) characters long.',
    },
    passwordConfirmation: { mismatch: 'Passwords do not match.' },
  };

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: [''],
      },
      {
        validators: [this.passwordMatchValidator],
      },
    );
  }

  ngOnInit(): void {}

  register(): void {
    this.processing = true;
    const { email, password } = this.registerForm.getRawValue();
    this.authService.register(email, password).subscribe(
      (auth) => {
        this.processing = false;
      },
      (err) => {
        this.processing = false;
      },
    );
  }

  errors(fieldName: string): string[] {
    const errors = this.registerForm.get(fieldName)?.errors;
    return errors ? Object.keys(errors) : [];
  }

  private passwordMatchValidator(form: FormGroup): void {
    const pw = form.controls['password'];
    const pwc = form.controls['passwordConfirmation'];
    if (pw.value != pwc.value) {
      pwc.setErrors({ mismatch: true });
    } else {
      pwc.setErrors(null);
    }
    return;
  }
}
