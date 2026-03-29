import { CommonModule } from '@angular/common';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserSettingService } from '../user-setting.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  firstName: string = '';
  lastName: string = '';
  initials = '';
  private destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private userSettingService: UserSettingService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    const sub = this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.checkLoginStatus();
        this.checkRole();
      });
    this.userSettingService.user$.subscribe((user) => {
      if (user) {
        this.initials =
          (user.firstName?.charAt(0).toLocaleUpperCase() || '') +
          (user.lastName?.charAt(0).toLocaleUpperCase() || '');
      }
    });
  }

  checkRole() {
    const role = this.authService.getAuthRole();
    if (role.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  checkLoginStatus() {
    const token = this.authService.getAuthToken();
    if (token !== null && token !== '') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.authService.setAuthToken('');
    this.authService.setAuthRole([]); // Réinitialiser les rôles à un tableau vide
    this.isLoggedIn = false;
    this.checkRole(); // Re-vérifier les rôles après déconnexion
    this.router.navigate(['/login']);
  }
}
