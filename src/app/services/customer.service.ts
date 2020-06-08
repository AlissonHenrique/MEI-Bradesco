import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CustomerDTO } from '../dto/customer-dto';
import {
  LOGOUT_API_URL, NOTIFICATION_API_URL, FAQ_API_URL, MEI_CHECK_CUSTOMER_TERM_API_URL,
  CUSTOMER_INFORMATION_API_URL, USER_API_URL, USER_ADDITIONAL_INFORMATION_API_URL,
  PARTNER_ACTIVES_API_URL, USER_AGREEMENT_APIURL, SEND_TERMS_CUSTOMER_API_URL, USER_ACCESS_FILL_VALUE_API_URL,
  HTTP_REQUEST_TIMEOUT, HTTP_STATUS_OK, PARTNER_CANCEL_SHARING_API_URL, USER_AGREEMENT_TOKEN_API_URL, CUSTOMER_REASONS_EXCLUSION_API_URL, CUSTOMER_EXCLUDE_ACCOUNT_API_URL, PARTNER_BY_ID_API_URL
} from '../constants/path-constants';
import { PageDTO } from '../dto/page-dto';
import { NotificationsDTO } from '../dto/notifications-dto';
import { HttpParams } from '@angular/common/http';
import { FaqCategoryDTO } from '../dto/faq-category-dto';
import { tap } from 'rxjs/operators';
import { CustomerPlataformTermDTO } from '../dto/customer-plataform-term-dto';
import { CustomerAgreementPlataformTermsDTO } from '../dto/customer-agreement-plataform-terms-dto';
import { environment } from 'src/environments/environment';
import { CustomerAdditionalDataDTO } from '../dto/customer-additional-data-dto';
import { PartnerDTO } from '../dto/partner-dto';
import { STATUS_TEMP_PASSWORD } from '../utils/constants.enum';
import { CustomerAgreementTermDTO } from '../dto/customer-agreement-term-dto';
import { CustomerSendEmailTermsDTO } from '../dto/customer-send-email-terms-dto';
import { CustomerPartnerAccessDataDTO } from '../dto/customer-partner-access-data-dto';
import { ComboboxDTO } from '../dto/combobox-dto';
import { CustomerRequestExclusionDTO } from '../dto/customer-request-exclusion-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerName = new BehaviorSubject('');
  private companyTradeName = new BehaviorSubject('');
  private customerDTO = new BehaviorSubject(null);
  private customerStatus = new BehaviorSubject(false);
  private initialNotifications = new BehaviorSubject(null);
  private pendingCustomerTerms = new BehaviorSubject(null);
  private customerAgreementTerm = new BehaviorSubject(null);
  public page = 0;
  public pageSize = 3;

  constructor(private restService: RestService) { }

  fillCustomerInformation(): Observable<CustomerDTO> {
    return this.restService.getRequest<CustomerDTO>(CUSTOMER_INFORMATION_API_URL);
  }

  loadCustomerInformation(): Observable<CustomerDTO> {

    return this.fillCustomerInformation().pipe(
      tap(customer => {
        customer.additionalData = customer.additionalData ? customer.additionalData : new CustomerAdditionalDataDTO();
        this.setCustomerDTO(customer); // preenche os dados do Cliente
        this.setCustomerName(customer.name); // preenche o observable do nome
        this.setCustomerStatus(customer.status === STATUS_TEMP_PASSWORD); // preencher status do cliente
        this.setCompanyTradeName(customer.additionalData ? customer.additionalData.companyTradeName : ''); // preenche o observable da companhia
        // preenche o observable das notificações iniciais do cabeçalho.
        this.getNotifications(this.page, this.pageSize).subscribe(
          (response) => {
            this.setInitialNotifications(response);
          }
        );

        // preenche o observable dos termos pendentes da plataforma que o usuário tem que aceitar
        this.checkCustomerPlataformTerm().subscribe(
          (pendingTerms) => {
            if (pendingTerms && pendingTerms.length > 0) {
              this.setPendingCustomerTerms(pendingTerms);
            }
          }
        );

        return customer;
      })
    );
  }

  setCustomerStatus(value: boolean) {
    this.customerStatus.next(value);
  }

  getCustomerStatus(): Observable<boolean> {
    return this.customerStatus;
  }

  setInitialNotifications(value: PageDTO<NotificationsDTO>) {
    this.initialNotifications.next(value);
  }

  getInitialNotifications(): Observable<PageDTO<NotificationsDTO>> {
    return this.initialNotifications;
  }

  setCustomerName(value: string) {
    this.customerName.next(value);
  }

  getCustomerName(): Observable<string> {
    return this.customerName;
  }

  private setCustomerDTO(value: CustomerDTO) {
    this.customerDTO.next(value);
  }

  getCustomerDTO(): Observable<CustomerDTO> {
    return this.customerDTO;
  }

  setCompanyTradeName(value: string) {
    this.companyTradeName.next(value);
  }

  getCompanyTradeName(): Observable<string> {
    return this.companyTradeName;
  }

  private setPendingCustomerTerms(value: Array<CustomerPlataformTermDTO>) {
    this.pendingCustomerTerms.next(value);
  }

  getPendingCustomerTerms(): Observable<Array<CustomerPlataformTermDTO>> {
    return this.pendingCustomerTerms;
  }

  logout(): Observable<never> {
    return this.restService.putRequest(LOGOUT_API_URL, null);
  }

  getNotifications(page, pageSize): Observable<PageDTO<NotificationsDTO>> {
    const parametros = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.restService.getRequest<PageDTO<NotificationsDTO>>(NOTIFICATION_API_URL, parametros);
  }

  setNotificationsRead(id: any) {
    return this.restService.putRequest(NOTIFICATION_API_URL + '/' + id, null);
  }

  fillFaq(question: string, faqId: string): Observable<Array<FaqCategoryDTO>> {
    const parametros = new HttpParams()
      .set('question', question || '')
      .set('faqId', faqId || '');
    return this.restService.getRequest<Array<FaqCategoryDTO>>(FAQ_API_URL, parametros);
  }

  changePassword(request: any, showMessage?: boolean): Observable<never> {
    return this.restService.putRequest('/login/changePassword', request, showMessage);
  }

  private checkCustomerPlataformTerm(): Observable<Array<CustomerPlataformTermDTO>> {
    return this.restService.getRequest<Array<CustomerPlataformTermDTO>>(MEI_CHECK_CUSTOMER_TERM_API_URL);
  }

  acceptCustomerPlataformTerm(id: number): Observable<CustomerAgreementPlataformTermsDTO> {
    const agreement: CustomerAgreementPlataformTermsDTO = new CustomerAgreementPlataformTermsDTO();
    agreement.plataformTermId = id; // define o id do aceite.

    return this.restService.postRequest<CustomerAgreementPlataformTermsDTO>(MEI_CHECK_CUSTOMER_TERM_API_URL, agreement);
  }

  fillComboAdditionalInformation(): Observable<any> {
    return this.restService.getRequest(USER_ADDITIONAL_INFORMATION_API_URL);
  }

  customerUpdate(userMeiDTO: CustomerDTO, showMessage?: boolean): any {
    return this.restService.putRequest<any>(USER_API_URL, userMeiDTO, showMessage);
  }

  getPartners(): Observable<Array<PartnerDTO>> {
    return this.restService.getRequest<Array<PartnerDTO>>(PARTNER_ACTIVES_API_URL);
  }

  getPartner(id: any): Observable<PartnerDTO> {
    return this.restService.getRequest<PartnerDTO>(PARTNER_BY_ID_API_URL + id);
  }

  cancelUserAgreement(agreementId: number): Observable<never> {
    return this.restService.putRequest(PARTNER_CANCEL_SHARING_API_URL + agreementId, null);
  }

  userAgreementToken(agreementId: any, partnerId: any, partnerServiceId: any): Observable<CustomerAgreementTermDTO> {
    let parametros = new HttpParams();
    parametros = parametros.append('agreementId', agreementId);
    parametros = parametros.append('partnerId', partnerId);
    if (partnerServiceId) { parametros = parametros.append('partnerServiceId', partnerServiceId); }
    return this.restService.getRequest<CustomerAgreementTermDTO>(USER_AGREEMENT_TOKEN_API_URL, parametros);
  }

  accessPartnerStatusUrl(url: string): Observable<any> {
    let returnStatus: any;
    returnStatus = new Observable<any>(observer => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = HTTP_REQUEST_TIMEOUT;
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {

          if (xhr.status !== HTTP_STATUS_OK) {
            observer.error(xhr.response);
          } else {
            observer.next(xhr.status);
          }
          observer.complete();
        }
      });
      xhr.addEventListener('error', function (e) {
        observer.error(e);
        console.log(e);
        observer.complete();
      });
      xhr.open('GET', url);
      xhr.send(null);
    });

    return returnStatus;
  }

  getPartnerAgreement(partnerServiceId: any, partnerId: any, showMessage?: boolean): Observable<CustomerAgreementTermDTO> {
    let parameters = new HttpParams();
    if (partnerServiceId) { parameters = parameters.append('partnerServiceId', partnerServiceId); }
    if (partnerId) { parameters = parameters.append('partnerId', partnerId); }
    return this.restService.getRequest<CustomerAgreementTermDTO>(USER_AGREEMENT_APIURL, parameters, showMessage);
  }

  setCustomerAgreementTerm(value: CustomerAgreementTermDTO) {
    this.customerAgreementTerm.next(value);
  }

  getCustomerAgreementTerm(): Observable<CustomerAgreementTermDTO> {
    return this.customerAgreementTerm;
  }

  sendTermsToCustomer(customerSendEmailTermsDTO: CustomerSendEmailTermsDTO, showMessage?: boolean): Observable<never> {
    return this.restService.postRequest(SEND_TERMS_CUSTOMER_API_URL, customerSendEmailTermsDTO, showMessage);
  }

  saveUserAccessFillValues(item: CustomerPartnerAccessDataDTO): Observable<CustomerPartnerAccessDataDTO> {
    return this.restService.postRequest<CustomerPartnerAccessDataDTO>(USER_ACCESS_FILL_VALUE_API_URL, item);
  }

  getCustomerReasonsExclusion(): Observable<Array<ComboboxDTO>> {
    return this.restService.getRequest<Array<ComboboxDTO>>(CUSTOMER_REASONS_EXCLUSION_API_URL, null);
  }

  sendExcludeAccount(item: CustomerRequestExclusionDTO, showMessage?: boolean): Observable<CustomerRequestExclusionDTO> {
    return this.restService.putRequest<CustomerRequestExclusionDTO>(CUSTOMER_EXCLUDE_ACCOUNT_API_URL, item, showMessage);
  }

  exitApplication() {
    this.logout().subscribe(
      () => {
        //do nothing
      },
      () => {
        //do nothing
      },
      () => {
        window.location.href = environment.appUrl;
      }
    );
  }

}
