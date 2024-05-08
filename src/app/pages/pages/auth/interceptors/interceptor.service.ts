import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const loginToken = this.loginService.getToken();
    req = req.clone({
        setHeaders: {
            Authorization: "Bearer " + loginToken
        }
    });
    return next.handle(req);
}
}
