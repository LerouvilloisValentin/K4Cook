import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { User } from '../user.model';
import { UserSettingService } from '../user-setting.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private userManagementService: UserManagementService,
    private userSettingService: UserSettingService,
  ) {}

  firstName: String = '';
  lastName: String = '';
  arrayOfUsers: User[] = [];

  ngOnInit() {
    this.userManagementService.getUser().subscribe((users) => {
      this.userSettingService.getUser().subscribe((currentUser) => {
        if (currentUser.role === 'COOK') {
          const arrayOfClient = users.filter((user) => user.role === 'COOK');
          this.arrayOfUsers = arrayOfClient;
        } else if (currentUser.role === 'CLIENT') {
          const arrayOfCook = users.filter((user) => user.role === 'CLIENT');
          this.arrayOfUsers = arrayOfCook;
        }
      });
    });
  }
}
