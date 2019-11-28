import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private readonly _baseUrl: string;


  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  getProfile(profile: Profile): Observable<Profile> {
    return this.http.get<Profile>(`${this._baseUrl}/profiles/${profile.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }
      });
  }

  deleteProfile(profile: Profile): Observable<Profile> {
    return this.http.delete<Profile>(`${this._baseUrl}/profiles/${profile.id}`,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  getProfiles(filters,offset): Observable<Profile[] | number> {
    return this.http.post<Profile[] | number>(`${this._baseUrl}/profiles/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  addProfile(newProfile): Observable<Profile> {
    return this.http.post<Profile>(`${this._baseUrl}/profiles`, newProfile,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  modifyProfile(modProfile): Observable<Profile> {
    let id = modProfile.id;
    delete modProfile.id;
    return this.http.patch<User>(`${this._baseUrl}/profiles/${id}`, modProfile,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

}
