import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";

function isLoggedIn(): boolean {
  const storageService = inject(StorageService);
  return !!storageService.getAccessToken();
}

function redirectToLogin(): any {
  return inject(Router).navigate(['/login']);
}

export const authCanMatchGuard: CanMatchFn = () => {
  return isLoggedIn() ? true : redirectToLogin();
}

export const authCanActivateGuard: CanActivateFn = () => {
  return isLoggedIn() ? true : redirectToLogin();
}
