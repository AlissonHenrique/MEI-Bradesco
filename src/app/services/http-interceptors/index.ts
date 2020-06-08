//import { LoadingInterceptor } from "./loading.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from './loading.interceptor';
import { ErrorInterceptor } from './error.interceptor';
//import { LoggingInterceptor } from "./logging-interceptor";
//import { ErrorInterceptor } from "./error.interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];