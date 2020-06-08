import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { POSTAL_CODE_COUNTRIES_API_URL, POSTAL_CODE_API_URL } from '../constants/path-constants';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {

  constructor(private restService: RestService) { }

  fillPostalCode(postalCode: string): Observable<any> {
    const parameters = new HttpParams()
      .set('postalCode', postalCode);
    return this.restService.getRequest<Object>(POSTAL_CODE_API_URL, parameters);
  }

  fillAllCountries(): Observable<any> {
    return this.restService.getRequest<object>(POSTAL_CODE_COUNTRIES_API_URL);
  }


   identifyTypeAddress(typeAddress: string) {
    if (!typeAddress) {
      return null;
    } else if (typeAddress.toUpperCase().startsWith('R')) {
      return 1;
    } else if (typeAddress.toUpperCase().startsWith('AV')) {
      return 2;
    } else if (typeAddress.toUpperCase().startsWith('P')) {
      return 3;
    } else if (typeAddress.toUpperCase().startsWith('AL')) {
      return 4;
    } else if (typeAddress.toUpperCase().startsWith('T')) {
      return 5;
    } else {
      return null;
    }

  }

}
