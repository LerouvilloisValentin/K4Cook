import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSuspendComponent } from '../user-suspend/user-suspend.component';
import { User } from '../user.model';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  constructor(private userManagementService: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const sub = this.userManagementService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: any[]) => {
        this.users = value;
      });
  }

  searchUsers() {
    if (this.search && this.search.length > 3) {
      const sub = this.userManagementService
        .searchUsersByEmail(this.search)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value: any[]) => {
          this.users = value;
        });
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: any) => {
        this.loadUsers();
      });
  }

  reintegrateUser(id: number) {
    const sub = this.userManagementService
      .reintegrateUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: any) => {
        this.loadUsers();
      });
  }
}
