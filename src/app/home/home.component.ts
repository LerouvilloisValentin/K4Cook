import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private userManagementService: UserManagementService) {}

  firstName: String = '';
  lastName: String = '';
  arrayOfUsers: User[] = [];

  ngOnInit() {
    this.userManagementService.getUser().subscribe((user) => {
      this.arrayOfUsers = user;
    });
  }
}
