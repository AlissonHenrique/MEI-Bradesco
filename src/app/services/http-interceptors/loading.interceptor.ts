import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, timer } from "rxjs";
import { tap } from "rxjs/operators";
declare var $: any;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(
        //private spinner: NgxSpinnerService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const waitingModal = $('#modalLoad');
        // aciona a barra de progresso
        timer(100).subscribe(() => waitingModal.modal('show'));

        // withCredential para enviar o cookia em requisições CORS
        const dupReq = req.clone({
            withCredentials: true
        });
        return next.handle(dupReq).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // desliga a barra de progresso
                timer(500).subscribe(() => waitingModal.modal('hide'));
            }
        },
            (err: any) => {
                // desliga a barra de progresso
                timer(500).subscribe(() => waitingModal.modal('hide'));
            },
            () => {
                timer(600).subscribe(
                    () => {
                        if ($(".modal-backdrop:visible").length > 0 && $('#modalLoad:visible').length > 0) {
                            $('#modalLoad:visible').toggle();
                            $(".modal-backdrop:visible").toggle();
                        }
                    }
                );
            }));
    }
}
