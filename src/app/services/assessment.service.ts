import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from 'src/app/shared/config';
import { Observable } from 'rxjs';
import { Assessment } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  token: string | null;
  baseUrl = `${apiUrl}api/`;

  constructor(private httpClient: HttpClient) { }

  getUserAssessments(): Observable<Array<Assessment>> {
    const url = `${this.baseUrl}userassessments`;
    return this.httpClient.get(url).pipe(map(assessment => assessment as Assessment[]));
  }
// api/userassessments/graph
  getUserAssessmentsGraph(id: number) {

    const params = new HttpParams()
      .set('id', id.toString());

    const url = `${this.baseUrl}userassessments/graph`;
    return this.httpClient.get(url, {
      params: params,
    }).pipe(map(user => user));
  }
}
