import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/shared/models/models';
import { Methodology } from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class MethodologiesService {

private readonly _baseUrl: string;
   
  constructor(private http: HttpClient) {
     this._baseUrl = AppConstants.baseURL;
   }

  addMethodology(newMethodology): Observable<Methodology> {
    return this.http.post<Methodology>(`${this._baseUrl}/methodologies`, newMethodology,
      {headers: {XToken: sessionStorage.getItem('token')}});

  }

  
  getMethodologies(filters,offset): Observable<Methodology[] | number> {
    return this.http.post<Methodology[] | number>(`${this._baseUrl}/methodologies/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});

  }





}
