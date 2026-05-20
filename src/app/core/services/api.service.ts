import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { StorageService } from './storage.service';
import { DashboardApiResponse } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<string>('http://test-demo.aemenersol.com/api/account/login', { username, password })
      .pipe(
        tap((res) => {
          this.storageService.setAccessToken(res);
        }),
        map(() => { }),
      );
  }

  getDashboardData(): Observable<DashboardApiResponse> {
    return this.http.get<DashboardApiResponse>('http://test-demo.aemenersol.com/api/dashboard');
  }
}
