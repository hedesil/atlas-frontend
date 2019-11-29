import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { Vulnerability } from '../shared/models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilitiesService {

  private readonly _baseUrl: string;


  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }
  getVulnerability(vulnerability: Vulnerability): Observable<Vulnerability> {
    return this.http.get<Vulnerability>(`${this._baseUrl}/vulnerabilities/${vulnerability.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }
      });
  }

  deleteVulnerability(vulnerability: Vulnerability): Observable<Vulnerability> {
    return this.http.delete<Vulnerability>(`${this._baseUrl}/vulnerabilities/${vulnerability.id}`,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  getVulnerabilities(filters,offset): Observable<Vulnerability[] | number> {
    return this.http.post<Vulnerability[] | number>(`${this._baseUrl}/vulnerabilities/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }
  addVulnerability(newVulnerability): Observable<Vulnerability> {
    return this.http.post<Vulnerability>(`${this._baseUrl}/vulnerabilities`, newVulnerability,
      {headers: {XToken: sessionStorage.getItem('token')}});

  }

  modifyVulnerability(modVulnerability): Observable<Vulnerability> {
    let id = modVulnerability.id;
    delete modVulnerability.id;
    return this.http.patch<Vulnerability>(`${this._baseUrl}/vulnerabilities/${id}`, modVulnerability,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }
}
