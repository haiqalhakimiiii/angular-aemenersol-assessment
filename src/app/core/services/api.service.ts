import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { StorageService } from './storage.service';
import { DashboardApiResponse } from '../interfaces/dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<string>(`${this.apiUrl}/api/account/login`, { username, password })
      .pipe(
        tap((res) => {
          this.storageService.setAccessToken(res);
        }),
        map(() => { }),
      );
  }

  getDashboardData(): Observable<DashboardApiResponse> {
    return this.http.get<DashboardApiResponse>(`${this.apiUrl}/api/dashboard`);
  }
}
