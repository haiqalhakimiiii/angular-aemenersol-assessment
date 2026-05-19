import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly KEY_ACCESS_TOKEN = 'access_token';

  constructor() { }
  
  setAccessToken(token: string): void {
    localStorage.setItem(this.KEY_ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.KEY_ACCESS_TOKEN);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.KEY_ACCESS_TOKEN);
  }
}
