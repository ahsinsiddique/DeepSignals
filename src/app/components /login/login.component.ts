import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { untilDestroyed } from 'ngx-take-until-destroy';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  Role = Role;

  constructor(private usersService: UsersService,
              private router: Router) { }


  ngOnInit(): void {

  }


  getLogin(role: string) {
    let payload = null;
    if (role == Role.User) {
      payload = { "email": 'user@deepersignals.com', "password": 'password' };

    } else if (role === Role.Admin) {
      payload = { "email": 'admin@deepersignals.com', "password": 'password' };
    }
    this.usersService.signIn(payload).pipe(untilDestroyed(this)).subscribe((rsp) => {
      console.log(rsp);
      this.router.navigateByUrl('/dashboard');

    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy() {}
}
