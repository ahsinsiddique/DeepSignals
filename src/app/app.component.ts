import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: UsersService) {}

  get isAuthorized() {
    return this.authService.getToken();
  }

  get isAdmin() {
    return this.authService.hasRole(Role.Admin) ? Role.Admin : Role.User;
  }

  logout() {
    this.authService.logout();
  }
}
