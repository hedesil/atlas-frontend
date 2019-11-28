import { Injectable } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Asset } from '../shared/models/asset';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = AppConstants.baseURL;
  }

  getAsset(asset: Asset): Observable<Asset> {
    return this.http.get<Asset>(`${this._baseUrl}/assets/${asset.id}`,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     })
   }

 deleteAsset(asset: Asset): Observable<Asset> {
   return this.http.delete<Asset>(`${this._baseUrl}/assets/${asset.id}`,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 getAssets(filters, offset): Observable<any> {
   return this.http.post<any>(`${this._baseUrl}/assets/search?offset=${offset}`, filters,
     {
       headers: {
         XToken: sessionStorage.getItem('token')
       }});
 }


 addAsset(newAsset): Observable<Asset> {
   return this.http.post<Asset>(`${this._baseUrl}/assets`, newAsset,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 modifyAsset(modAsset): Observable<Asset> {
   var id = modAsset.id;
   delete modAsset.id;
   return this.http.patch<Asset>(`${this._baseUrl}/assets/${id}`, modAsset,
     {
       headers: {
         XToken: sessionStorage.getItem('token'),
       }
     });
 }

 

}
