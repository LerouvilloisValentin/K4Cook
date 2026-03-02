import { Component } from '@angular/core';
import { UserSettingService } from '../user-setting.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  users: any;
  constructor(private userSettingService: UserSettingService) {}

  onRemoveAccount() {
    const sub = this.userSettingService
      .deleteOwnAccount()
      .subscribe((value: any[]) => {
        this.users = value;
        console.log('user', this.users);
      });
    console.log('sub', sub);
  }
}
