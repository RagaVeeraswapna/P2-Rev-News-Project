import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn) {
      return true; // User is logged in, allow access
    } else {
      return false; // Prevent access to the protected route
    }
  }

  setLoggedInStatus(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }
}
