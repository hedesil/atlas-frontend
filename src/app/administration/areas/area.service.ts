import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Area} from '../../shared/models/area';
import {AppConstants} from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})

export class AreaService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  getArea(area: Area): Observable<Area> {
    return this.http.get<Area>(`${this._baseUrl}/areas/${area.id}`,
      {
        headers: {
          XToken: sessionStorage.getItem('token')
        }
      });
  }

  deleteArea(area: Area): Observable<Area> {
    return this.http.delete<Area>(`${this._baseUrl}/areas/${area.id}`,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  getAreas(filters,offset): Observable<Area[] | number> {
    return this.http.post<Area[] | number>(`${this._baseUrl}/areas/search`, filters,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  addArea(newArea): Observable<Area> {
    return this.http.post<Area>(`${this._baseUrl}/areas`, newArea,
      {headers: {XToken: sessionStorage.getItem('token')}});
  }

  modifyArea(modArea): Observable<Area> {
    let id = modArea.id;
    delete modArea.id;
    return this.http.patch<Area>(`${this._baseUrl}/areas/${id}`, modArea,
      {
        headers: {
          XToken: sessionStorage.getItem('token'),
        }
      });
  }

}
