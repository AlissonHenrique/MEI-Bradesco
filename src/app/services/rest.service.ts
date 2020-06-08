import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEI_BUSINESSEXCEPTION, MEI_VALIDATIONEXCEPTION, DEFAULT_ERROR_MESSAGE } from '../utils/constants.enum';
import { POSTAL_CODE_API_URL } from '../constants/path-constants';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(
    private httpClient: HttpClient
  ) { }

  /** header default */
  private static HEADERS_DEFAULT = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept-Language': 'pt-BR'
    })
  };

  private buildURL(path: string): string {
    if (path.startsWith(environment.apiUrl)) { return path; }
    if (environment.apiUrl.endsWith('/') && path.startsWith('/')) {
      path = path.substr(1);
    } else if (!environment.apiUrl.endsWith('/') && !path.startsWith('/')) { path = '/' + path; }

    return environment.apiUrl + path;
  }

  public getRequest<T>(url: string, params?: HttpParams, showMessage?: boolean): Observable<T> {
    url = this.buildURL(url);
    const options = { ...RestService.HEADERS_DEFAULT, params: params };
    return this.httpClient.get<T>(url, options)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processError(err.error, showMessage))
      );
  }

  public postRequest<T>(url: string, request, showMessage?: boolean): Observable<T> {
    url = this.buildURL(url);
    return this.httpClient.post<T>(url, request, RestService.HEADERS_DEFAULT)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processError(err.error, showMessage))
      );
  }

  public patchRequest<T>(url: string, request: any | null): Observable<T> {
    url = this.buildURL(url);
    return this.httpClient.patch<T>(url, request, RestService.HEADERS_DEFAULT)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processError(err.error))
      );
  }

  public putRequest<T>(url: string, request, showMessage?: boolean): Observable<T> {
    url = this.buildURL(url);
    return this.httpClient.put<T>(url, request, RestService.HEADERS_DEFAULT)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processError(err.error, showMessage))
      );
  }

  private processError(error: any, showMessage?: boolean): Observable<never> {
    // TODO: Verificar o tratamento de erros das chamadas de api´s
    if (
      error &&
      error.type &&
      (error.type === MEI_BUSINESSEXCEPTION ||
        error.type === MEI_VALIDATIONEXCEPTION)
    ) {
      if (showMessage && (error.type === MEI_BUSINESSEXCEPTION || error.type === MEI_VALIDATIONEXCEPTION)) {
        return throwError(error);
      }

      const actualModal = $("#backendErrorMessage");
      actualModal.find("p").html(error.message);
      actualModal.modal("show");
    } else {

      setTimeout(() => {

        if (!$('#userDisconected').is(':visible')) {
          // não exibe menssagem quando o serviço de Cepo estiver fora.
          if (error.target.__zone_symbol__xhrURL.search(POSTAL_CODE_API_URL) > 0) {
            return;
          }
          //só exibe a mensagem padrão, se o modal de sessão encerrada não estiver ativo
          $('#defaultErrorMessage').modal('show');
        }

      }, 500);


      console.log(error);
    }

    return throwError(error);
  }


}
