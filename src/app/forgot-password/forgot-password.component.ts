import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  submit() {
    this.authService.forgotPassword(this.email).subscribe(() => {
      this.message = 'Si un compte existe, un email a été envoyé.';
      this.router.navigate(['/reset-password']);
    });
  }
}
