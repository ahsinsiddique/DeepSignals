import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AdminUser, User } from 'src/app/models/model';
import { apiUrl } from 'src/app/shared/config';
import { Role } from 'src/app/models/Role';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string | null;
  private user: User;


  constructor(private httpClient: HttpClient,
              private router: Router) { }

  signIn(body): Observable<any> {
    const requestData: any = { ...body };
    const url = `${apiUrl}api/login`;
    return this.httpClient.post<any>(url, requestData).pipe(
      tap(data => {
        if (data.token) {
          this.setLoginData(data, body);
        }
      })
    );
  }


  private setLoginData(tokenResponse: any, requestData) {
    this.token = tokenResponse['X-Token'];
    sessionStorage.setItem('token', tokenResponse.token);
    this.user = tokenResponse;
    sessionStorage.setItem('user', JSON.stringify(tokenResponse));
  }

  getToken(): string {
    return this.token || sessionStorage.getItem('token');
  }


  getNecessaryTokenUrl(url) {
    url = url.replace(apiUrl, '');
    const authenticatedUrls: string[] = [
      'userassessments',
      'userassessments/graph',
      'users'
    ];
    if (authenticatedUrls.indexOf(url) > -1) {
      return true;
    } else {
      let authenticated = false;
      authenticatedUrls.forEach(item => {
        if (url.indexOf(item) > -1) {
          authenticated = true;
        }
      });
      return authenticated;
    }
  }

  getLoggedInUser(): User {
    const user = this.user || JSON.parse(sessionStorage.getItem('user'))
    if (!user) {
      this.logout();
      return null;
    }
    return user;
  }


  hasRole(role: Role) {
    return this.getToken() && this.getLoggedInUser().role === role;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.user = null;
    this.token = null;
    this.router.navigateByUrl('/login');

  }

  getUsers(): Observable<AdminUser[]> {
    const url = `${apiUrl}api/users`;
    return this.httpClient.get<any>(url).pipe(
      map(users => users as AdminUser[])
    );
  }
}
