import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private usersService: UsersService) {
  }

  canActivate(): boolean {
    if (!this.usersService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }


}
