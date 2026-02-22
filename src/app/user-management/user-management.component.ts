import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSuspendComponent } from '../user-suspend/user-suspend.component';
import { User } from '../user.model';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSuspendComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  users: User[] = [];
  search: string = '';

  constructor(private userManagementService: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const sub = this.userManagementService
      .getUser()
      .subscribe((value: any[]) => {
        this.users = value;
      });

    this.addSubscription(sub);
  }

  searchUsers() {
    if (this.search && this.search.length > 3) {
      const sub = this.userManagementService
        .searchUsersByEmail(this.search)
        .subscribe((value: any[]) => {
          this.users = value;
        });

      this.addSubscription(sub);
    } else if (this.search.length === 0) {
      this.loadUsers();
    }
  }

  suspendUser({ id, days }: { id: number; days: number }) {
    if (days === undefined || days === null) {
      console.error("Le nombre de jours de suspension n'est pas défini");
      return;
    }

    const sub = this.userManagementService
      .suspendUser(id, days)
      .subscribe((value: any) => {
        this.loadUsers();
      });

    this.addSubscription(sub);
  }

  reintegrateUser(id: number) {
    const sub = this.userManagementService
      .reintegrateUser(id)
      .subscribe((value: any) => {
        this.loadUsers();
      });

    this.addSubscription(sub);
  }
}
