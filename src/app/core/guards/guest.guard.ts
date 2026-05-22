import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { CanActivateFn, Router } from "@angular/router";

function hasToken(): boolean {
  const storageService = inject(StorageService);
  return !!storageService.getAccessToken();
}

export const guestGuard: CanActivateFn = () => {
  return hasToken() ? inject(Router).navigate(['/dashboard']) : true;
}
