import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, filter, map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/constants/constants';

export interface Test {
  id: number;
  name: string;
  description: string;
  company: number;
}

@Injectable({
  providedIn: 'root'
})

export class TestsService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  deleteTest(test: Test): Observable<Test> {
    return this.http.delete<Test>(`${this._baseUrl}/tests/${test.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

  getTests(filters, offset): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/tests/search`, filters,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }
      });
  }

  addTest(newTest): Observable<Test> {
    return this.http.post<Test>(`${this._baseUrl}/tests`, newTest,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

  modifyTest(modTest): Observable<Test> {
    let id = modTest.id;
    delete modTest.id;
    return this.http.patch<Test>(`${this._baseUrl}/tests/${id}`, modTest,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

}
