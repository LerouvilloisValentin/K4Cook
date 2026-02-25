import { Component } from '@angular/core';
import {
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends SubscribeManagementComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });
  loginError: string | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    super();
  }

  isFormNameInvalid(name: string) {
    const formName = this.loginForm.get(name);
    return formName?.invalid && (formName?.dirty || formName?.touched);
  }

  hasNameError(name: string, error: string) {
    const formName = this.loginForm.get(name);
    return formName?.hasError(error);
  }

  submit() {
    const loginBody = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    const subscription = this.authService.login(loginBody).subscribe({
      next: () => {
        this.loginError = null;
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        if (error.status === 401 || 403) {
          this.loginError = 'Email ou mot de passe incorrect.';
        } else {
          this.loginError =
            'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
      },
    });
    this.addSubscription(subscription);
  }
}
