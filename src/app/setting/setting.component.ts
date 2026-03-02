import { Component } from '@angular/core';
import { UserSettingService } from '../user-setting.service';
import { ModalComponent } from '../shared/components/modal.components';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  // users: any;
  isModalOpen = false;
  constructor(private userSettingService: UserSettingService) {}

  onRemoveAccount() {
    const sub = this.userSettingService
      .deleteOwnAccount()
      .subscribe((value: any[]) => {
        // this.users = value;
        // console.log('user', this.users);
        this.isModalOpen = false;
      });
    console.log('sub', sub);
  }

  openDeleteModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
