import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.auth.user;
        const pw = this.auth.password;
        if (currentUser && pw) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${window.btoa(currentUser + ':' + pw)}`
                }
            });
        }

        return next.handle(request);
    }
}