import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://localhost:5000';
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVuY3Rpb25hbGl0aWVzIjpbIkRFTEVURSBERVBBUlRNRU5UUyIsIk1PRElGWSBERVBBUlRNRU5UUyIsIkFERCBERVBBUlRNRU5UUyIsIkdFVCBERVBBUlRNRU5UUyIsIkRFTEVURSBBUkVBUyIsIk1PRElGWSBBUkVBUyIsIkFERCBBUkVBUyIsIkdFVCBBUkVBUyIsIkRFTEVURSBVU0VSUyIsIk1PRElGWSBVU0VSUyIsIkFERCBVU0VSUyIsIkdFVCBVU0VSUyIsIkRFTEVURSBHUk9VUFMiLCJNT0RJRlkgR1JPVVBTIiwiQUREIEdST1VQUyIsIkdFVCBHUk9VUFMiLCJERUxFVEUgUFJPRklMRVMiLCJNT0RJRlkgUFJPRklMRVMiLCJBREQgUFJPRklMRVMiLCJHRVQgUFJPRklMRVMiLCJERUxFVEUgQ09NUEFOSUVTIiwiTU9ESUZZIENPTVBBTklFUyIsIkFERCBDT01QQU5JRVMiLCJHRVQgQ09NUEFOSUVTIl0sImdyb3VwcyI6W10sImNvbXBhbmllcyI6WzFdLCJpYXQiOjE1NzM5MzQxMjYsImV4cCI6MTU3MzkzNzcyNn0.0-Syo31mWtiS9joVgruakz-ZQloE2pBtqZgNAqqH18U';

  constructor(private http: HttpClient) {
  }

  fetchPosts(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/companies/${id}`,
      {
        headers: {
          xtoken: this.authToken
        }
      })
      .pipe(
        catchError(
          err => of([]))
      );
  }
}
