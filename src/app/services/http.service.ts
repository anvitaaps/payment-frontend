import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url): Observable<any> {
    return this.http.get(url,   {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), 
    })
    .pipe(map(
      (data) => data
    ));
  }

  post(url, data): Observable<any> {
    return this.http.post(url, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), 
    })
    .pipe(map(
      (data) => data
    ));
  }
}
