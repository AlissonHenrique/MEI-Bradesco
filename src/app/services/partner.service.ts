import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { USER_AGREEMENT_APIURL, PARTNER_SERVICES_CATEGORIES_API_URL, PARTNER_SERVICES_ACTIVES_CATEGORIES_API_URL } from '../constants/path-constants';
import { PartnerUserAgreementDTO } from '../dto/partner-user-agreement-dto';
import { CategoryViewDTO } from '../dto/category-view-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import { WEBVIEW_ROUTE, LOGIN_PARAMS_URL } from '../utils/constants.enum';
import { ConecteSeComponentData } from '../dto/conecte-se-component-data';
import { PartnerDTO } from '../dto/partner-dto';
import { HttpParams } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private urlPartnerNavigate = new BehaviorSubject(null);
  private conecteSeData = new BehaviorSubject(null);

  constructor(private restService: RestService,
              private sanitizer: DomSanitizer,
              private customerService: CustomerService,
              private router: Router
    ) { }

    getConecteSeData(): Observable<ConecteSeComponentData> {
      return this.conecteSeData;
    }

    setConecteSeData(value: ConecteSeComponentData) {
      this.conecteSeData.next(value);
      setTimeout(() => {
        // só manda pra rota de conecte-se, se houver dados
        if (value) { this.router.navigateByUrl('/conecte-se'); }
      }, 500);
    }

  // configura a url para navegar no webview
  setUrllPartnerNavigate(agreementId: any, partnerId: any, partnerServiceId: any) {
    if (!agreementId) {
      this.urlPartnerNavigate.next(null);
      return;
    }
    this.customerService.userAgreementToken(agreementId, partnerId, partnerServiceId).subscribe(
      (dto) => {
        let urlToNavigate = null;
        const termsAccepted: boolean = dto.agreement && dto.sharing;
        if (termsAccepted) {
          // caso os termos estejam validos/aceitos
          // gera os parametros da url com o token gerado
          const urlParams = dto.token ? LOGIN_PARAMS_URL + dto.token : '';
          // se vier a url do serviço, navega para a url do serviço, caso contrário, a url do parceiro da area logada
          urlToNavigate = (dto.serviceUrl ? dto.serviceUrl : dto.partnerUrlMenu) + urlParams;
        } else {
          urlToNavigate = dto.partnerUrl;
        }
        this.urlPartnerNavigate.next(urlToNavigate);
        setTimeout(() => {
          this.router.navigate([WEBVIEW_ROUTE]);
        }, 500);
      }
    );
      
    
    
  }

  // obtém a url para navegar no webview
  getUrllPartnerNavigate(): Observable<string> {
    return this.urlPartnerNavigate;
  }

  createPartnerUserAgreement(partnerUserAgreementDTO: PartnerUserAgreementDTO): Observable<PartnerUserAgreementDTO> {
    return this.restService.postRequest<PartnerUserAgreementDTO>(USER_AGREEMENT_APIURL, partnerUserAgreementDTO);
  }

  findServicesByCategory(categoriId: number): Observable<CategoryViewDTO> {
    return this.restService.getRequest<CategoryViewDTO>(PARTNER_SERVICES_CATEGORIES_API_URL + '/' + categoriId);
  }

  findActivePartnerServicesByCategory(categories: Array<number>): Observable<Array<PartnerDTO>> {
    let params = new HttpParams();
    categories.forEach(item => {
      params = params.append('categories', item.toString());
    });
    return this.restService.getRequest<Array<PartnerDTO>>(PARTNER_SERVICES_ACTIVES_CATEGORIES_API_URL, params);
  }

  sanitizePartnerLogo(urlData: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlData);
  }

}
