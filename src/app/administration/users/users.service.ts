import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly _baseUrl: string;


  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/users/${user.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }
      });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this._baseUrl}/users/${user.id}`,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  getUsers(filters,offset): Observable<User[] | number> {
    return this.http.post<User[] | number>(`${this._baseUrl}/users/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  addUser(newUser): Observable<User> {
    return this.http.post<User>(`${this._baseUrl}/users`, newUser,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  modifyUser(modUser): Observable<User> {
    let id = modUser.id;
    delete modUser.id;
    return this.http.patch<User>(`${this._baseUrl}/users/${id}`, modUser,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

}
