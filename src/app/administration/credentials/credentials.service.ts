import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../shared/constants/constants';
import { Observable } from 'rxjs';
import { Credential } from '../../shared/models/credential';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private readonly _baseUrl : string;



  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
   }


   getCredential(credential : Credential) : Observable<Credential>{
    return this.http.get<Credential>(`${this._baseUrl}/credentials/${credential.id}`,
    {
      headers: {
        XToken: sessionStorage.getItem('token')
      }
    });
   }

   deleteCredential(credential: Credential): Observable<Credential> {
    return this.http.delete<Credential>(`${this._baseUrl}/credentials/${credential.id}`,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  getCredentials(filters,offset) : Observable<Credential[] | number>{
    return this.http.post<Credential[] | number>(`${this._baseUrl}/credential/search`, filters,
    {headers: {XToken: sessionStorage.getItem('token')}});
}

addCredential(newCredential): Observable<Credential> {
  return this.http.post<Credential>(`${this._baseUrl}/credentials`, newCredential,
    {headers: {XToken: sessionStorage.getItem('token')}});
}

modifyCredential(modCredential): Observable<Credential> {
  let id = modCredential.id;
  delete modCredential.id;
  return this.http.patch<Credential>(`${this._baseUrl}/credentials/${id}`, modCredential,
    {
      headers: {
        XToken: sessionStorage.getItem('token'),
      }
    });
}
}
