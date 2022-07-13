import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

interface NavLink {
  path: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private navLinksAuth: NavLink[] = [
    { path: '/', label: 'HOME', icon: 'home', exact: true },
    { path: '/billings', label: 'BILLINGS', icon: 'receipt' },
    { path: '/templates', label: 'TEMPLATES', icon: 'file_copy' },
    { path: '/items', label: 'ITEMS', icon: 'feed' },
  ];
  private navLinksUnauth: NavLink[] = [
    { path: '/login', label: 'LOGIN', icon: 'login' },
    { path: '/register', label: 'REGISTER', icon: 'how_to_reg' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private MediaObserver: MediaObserver,
  ) {}

  get mobile(): boolean {
    return this.MediaObserver.isActive('xs');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navLinks() {
    return this.authService.isLoggedIn()
      ? this.navLinksAuth
      : this.navLinksUnauth;
  }
}
