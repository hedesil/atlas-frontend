import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Audit } from '../shared/models/audit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  getAudit(audit: Audit): Observable<Audit> {
    return this.http.get<Audit>(`${this._baseUrl}/audits/${audit.id}`,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     })
   }

 deleteAudit(audit: Audit): Observable<Audit> {
   return this.http.delete<Audit>(`${this._baseUrl}/audits/${audit.id}`,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 getAudits(filters, offset): Observable<any> {
   return this.http.post<any>(`${this._baseUrl}/audits/search?offset=${offset}`, filters,
     {
       headers: {
         XToken: sessionStorage.getItem('token')
       }});
 }


 addAudit(newAudit): Observable<Audit> {
   return this.http.post<Audit>(`${this._baseUrl}/audits`, newAudit,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 modifyAudit(modAudit): Observable<Audit> {
   var id = modAudit.id;
   delete modAudit.id;
   return this.http.patch<Audit>(`${this._baseUrl}/audits/${id}`, modAudit,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 

}
