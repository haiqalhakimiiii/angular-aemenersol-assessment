import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
