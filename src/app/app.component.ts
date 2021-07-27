import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

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
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private navLinksAuth: NavLink[] = [
    { path: '/', label: 'HOME', icon: 'home', exact: true },
    { path: '/billings', label: 'BILLINGS', icon: 'receipt' },
    { path: '/clients', label: 'CLIENTS', icon: 'people' },
    { path: '/templates', label: 'TEMPLATES', icon: 'file_copy' },
    { path: '/items', label: 'ITEMS', icon: 'feed' },
  ];
  private navLinksUnauth: NavLink[] = [
    { path: '/login', label: 'LOGIN', icon: 'login' },
    { path: '/register', label: 'REGISTER', icon: 'how_to_reg' },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private authService: AuthService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
