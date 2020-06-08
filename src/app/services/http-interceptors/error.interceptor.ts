import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { HTTP401_REDIRECT_LOGIN_INFO_MESSAGE, HTTP_UNKNOWN_ERROR_MESSAGE } from 'src/app/utils/constants.enum';
// import { NotificationService } from '../notification.service';
import { environment } from 'src/environments/environment';
import { MEI_BUSINESSEXCEPTION, HTTP401_REDIRECT_LOGIN_INFO_MESSAGE } from 'src/app/utils/constants.enum';
declare let $: any;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        // private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap(
                    null,
                    (err: HttpErrorResponse) => {
                        // verificar se o erro http é 500, ou seja um erro interno no servidor
                        if (err.status === 500) {
                            if (err.error.status && err.error.status === 401) {
                                // exibir um mensagem de login expirado...
                                //this.notificationService.info(HTTP401_REDIRECT_LOGIN_INFO_MESSAGE);
                                // Bad Credentials, devemos redirecionar para o login, caso não esteja no login
                                //Object.assign(err.error, { type: MEI_BUSINESSEXCEPTION, message: HTTP401_REDIRECT_LOGIN_INFO_MESSAGE });
                                //window.location.href = environment.appUrl;
                                // modal que está no arquivo app.component.html
                                $('#userDisconected').modal('show');
                            }

                        } else if (err.status === 0 && err.statusText === 'Unknown Error') {
                            //Object.assign(err.error, { message: HTTP_UNKNOWN_ERROR_MESSAGE });
                        }
                    })
            );
    }
}
