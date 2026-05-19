import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
	constructor(private storage: StorageService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.storage.getAccessToken();

		if (!token) {
			return next.handle(req);
		}

		if (req.headers.has('Authorization')) {
			return next.handle(req);
		}

		const authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});

		return next.handle(authReq);
	}
}

export const AccessTokenInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: AccessTokenInterceptor,
	multi: true,
};
