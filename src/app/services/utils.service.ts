import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TermViewType } from '../enums/term-view-type';
import { PartnerTermType } from '../enums/partner-term-type';
import { VIEW_TERMS_PARTNER_API_URL, DOWNLAOD_TERMS_PARTNER_API_URL, DOWNLOAD_TERMS_PLATAFORM_API_URL } from '../constants/path-constants';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PlataformTermType } from '../enums/plataform-term-type';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public datepipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) { }

  onlyNumbers(value: any) {
    if (value != null) {
      return value.toString().replace(/\D/g, '');
    } else {
      return null;
    }
  }

  tranformDate(value: any): Date {
    if (value) {
      const dateSplit = value.split('/');
      return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
    } else {
      return value;
    }

  }

  getUrlTermsPartner(partnerId: number, partnerTermType: PartnerTermType, termViewType: TermViewType): string {
    const termUrlOption = termViewType === TermViewType.VIEW ?
      VIEW_TERMS_PARTNER_API_URL : DOWNLAOD_TERMS_PARTNER_API_URL;
    return environment.apiUrl + termUrlOption + partnerId + '/' + partnerTermType + '?uniquehash=' + new Date().getTime();
  }

  getUrlTermsPlataform(termType: PlataformTermType): string {
    return environment.apiUrl + DOWNLOAD_TERMS_PLATAFORM_API_URL + termType;
  }

  captureClientInformation() {
    const info = this.deviceService.getDeviceInfo();
    return {
      browser: info.browser,
      browserVersion: info.browser_version,
      os: info.os,
      osVersion: info.os_version
    };
  }

  formatString(value: string, replacements: any[]) {
    return value.replace(/{(\d+)}/g, function(match, index) {
      return typeof replacements[index] !== 'undefined'
        ? replacements[index]
        : match
      ;
    });
  }

}
