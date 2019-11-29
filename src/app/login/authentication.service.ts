import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../shared/constants/constants';

interface Company {
  id: number;
  name: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = AppConstants.baseURL;


  login(credentials): Observable<Company> {
    return this.http.post<Company>(this.apiUrl+"/auth/login", credentials);
  }
}
