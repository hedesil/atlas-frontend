import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

  private apiUrl = 'https://localhost:5000/auth/login';


  login(credentials): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, credentials);
  }
}
