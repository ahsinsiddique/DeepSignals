import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService,
              private router: Router) { }

  payload = { "email": 'admin@deepersignals.com', "password": 'password' };

  ngOnInit(): void {

    this.getLogin();

  }

  getLogin() { // TODO comment for testing
    // this.usersService.signIn(this.payload).subscribe((rsp) => {
    //   console.log(rsp);
    //   this.router.navigateByUrl('/dashboard');
    //
    //  // this.getAssessment(rsp.token);
    // }, error => {
    //   console.log(error);
    // })
  }




}
