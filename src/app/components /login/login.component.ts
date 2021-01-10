import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    this.usersService.signIn(payload).subscribe((rsp) => {
      console.log(rsp);
      this.router.navigateByUrl('/dashboard');

    }, error => {
      console.log(error);
    })
  }


}
