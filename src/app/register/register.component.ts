import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';

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
  });
  emailAlreadyUsed = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private router: Router
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
    };

    const subscription = this.userManagementService
      .getAllMail()
      .subscribe((emails) => {
        if (emails.includes(registerBody.email)) {
          console.log('email existe déjà');
          this.emailAlreadyUsed = true;
          console.log('this.emailAlreadyUsed', this.emailAlreadyUsed);
        } else {
          this.emailAlreadyUsed = false;

          const registerSub = this.authService
            .register(registerBody)
            .subscribe(() => {
              this.router.navigateByUrl('/');
            });
          this.addSubscription(registerSub);
        }
      });
    this.addSubscription(subscription);
  }
  resetEmailAlreadyUsed() {
    this.emailAlreadyUsed = false;
  }
}
