import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, delay, filter, map, tap} from 'rxjs/operators';
import {Company} from '../../shared/models/company';
import {AppConstants} from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  getCompany(company: Company): Observable<Company> {
     return this.http.get<Company>(`${this._baseUrl}/companies/${company.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      })
    }

  deleteCompany(company: Company): Observable<Company> {
    return this.http.delete<Company>(`${this._baseUrl}/companies/${company.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

  getCompanies(filters, offset): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/companies/search?offset=${offset}`, filters,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }});
  }


  addCompany(newCompany): Observable<Company> {
    return this.http.post<Company>(`${this._baseUrl}/companies`, newCompany,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

  modifyCompany(modCompany): Observable<Company> {
    var id = modCompany.id;
    delete modCompany.id;
    return this.http.patch<Company>(`${this._baseUrl}/companies/${id}`, modCompany,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

}
