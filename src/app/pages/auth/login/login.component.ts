import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../infraestructure/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService,MessageService, Router],
})
export class LoginComponent {
  form: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

 async onSubmit() {
  if (this.form.invalid) return;

  try {
  await lastValueFrom(this.authService.login(this.form.value));
     this.router.navigate(['/']);
  } catch (err: unknown) {
     const error = err as HttpErrorResponse;
      const msg = error.error?.message || 'Error al iniciar sesión';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: msg,
      });
  }
}
}
