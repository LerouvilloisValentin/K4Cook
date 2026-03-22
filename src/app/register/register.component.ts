import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  registerForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(24)],
    ],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    postalCode: ['', Validators.required],
    role: ['', Validators.required],
  });
  emailAlreadyUsed = false;
  selectedRole: 'client' | 'cook' | null = null;
  private destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    const mail = this.userManagementService.getAllMail().subscribe((value) => {
      console.log(value);
    });
  }

  isFormNameInvalid(name: string) {
    const formName = this.registerForm.get(name);
    return formName?.invalid && (formName?.dirty || formName?.touched);
  }

  hasNameError(name: string, error: string) {
    const formName = this.registerForm.get(name);
    return formName?.hasError(error);
  }

  submit() {
    const registerBody = {
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      lastName: this.registerForm.value.lastName || '',
      firstName: this.registerForm.value.firstName || '',
      postalCode: this.registerForm.value.postalCode || '',
      role: this.registerForm.value.role || '',
    };

    this.userManagementService
      .getAllMail()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((emails) => {
        if (emails.includes(registerBody.email)) {
          this.emailAlreadyUsed = true;
          throw new Error('EMAIL_EXISTS');
        } else {
          this.emailAlreadyUsed = false;
          this.authService
            .register(registerBody)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.router.navigateByUrl('/');
            });
        }
      });
  }
  resetEmailAlreadyUsed() {
    this.emailAlreadyUsed = false;
  }

  clientChoice() {
    this.selectedRole = 'client';
    this.registerForm.patchValue({ role: 'client' });
  }

  cookChoice() {
    this.selectedRole = 'cook';
    this.registerForm.patchValue({ role: 'cook' });
  }
}
