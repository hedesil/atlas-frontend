import {Injectable} from '@angular/core';
import {AppConstants} from 'src/app/shared/constants/constants';
import {User} from 'src/app/shared/models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Company, Profile} from 'src/app/shared/models/models';
import {Knowledge} from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

   private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  getKnowledge(filters, offset): Observable<Knowledge[] | number> {
    return this.http.post<Knowledge[] | number>(`${this._baseUrl}/knowledgeBases/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});

  }

   addKnowledge(newKnowledge): Observable<Knowledge> {
    return this.http.post<Knowledge>(`${this._baseUrl}/knowledgeBases`, newKnowledge,
      {headers: {XToken: sessionStorage.getItem('token')}});

  }

   deleteKnowledge(knowledge: Knowledge): Observable<Knowledge> {
    return this.http.delete<Knowledge>(`${this._baseUrl}/knowledgeBases/${knowledge.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }


}
