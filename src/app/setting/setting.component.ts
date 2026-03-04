import { Component } from '@angular/core';
import { UserSettingService } from '../user-setting.service';
import { ModalComponent } from '../shared/components/modal/modal.components';
import { ButtonComponent } from '../shared/components/button/button.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  isModalOpen = false;
  constructor(
    private userSettingService: UserSettingService,
    private authService: AuthService,
    private router: Router,
  ) {}

  onRemoveAccount() {
    this.userSettingService.deleteOwnAccount().subscribe(() => {
      this.isModalOpen = false;
      this.authService.setAuthToken('');
      this.router.navigate(['/login']);
    });
  }

  openDeleteModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
