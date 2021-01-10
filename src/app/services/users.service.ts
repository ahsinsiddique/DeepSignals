import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/model/model';
import { apiUrl } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string | null;

  constructor(private httpClient: HttpClient) { }

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
  }

  getToken(): string {
    return this.token || sessionStorage.getItem('token');
  }

  getNecessaryTokenUrl(url) {
    url = url.replace(apiUrl, '');
    const authenticatedUrls: string[] = [
      'userassessments',
      'userassessments/graph'
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
}
