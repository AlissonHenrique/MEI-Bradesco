import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerAgreementTermDTO } from 'src/app/dto/customer-agreement-term-dto';
import { CustomerSendEmailTermsDTO } from 'src/app/dto/customer-send-email-terms-dto';
import { DEFAULT_TERM_FILE_NAME, REGISTER_SUCCESS, FILE_SEND_SUCESS_MESSAGE } from 'src/app/utils/constants.enum';
import { CustomerPartnerAccessDataDTO } from 'src/app/dto/customer-partner-access-data-dto';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { DOWNLAOD_TERMS_PARTNER_API_URL, VIEW_TERMS_PARTNER_API_URL } from 'src/app/constants/path-constants';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WindowRef } from 'src/app/services/windowRef';
import { UtilsService } from 'src/app/services/utils.service';
import { PartnerTermType } from 'src/app/enums/partner-term-type';
import { TermViewType } from 'src/app/enums/term-view-type';

declare var $: any;
@Component({
  selector: "app-termos-e-dados",
  templateUrl: "./termos-e-dados.component.html",
  styleUrls: ["./termos-e-dados.component.scss"]
})
export class TermoseDadosComponent implements OnInit {
  showMessage: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    private winRef: WindowRef,
    private utilsService: UtilsService) { }
  pagina: string;
  i = 0;
  customerAgreementTermDTO: CustomerAgreementTermDTO = new CustomerAgreementTermDTO();
  downloadUrl = '';
  viewTermUrl = null;
  sucessOne: boolean;
  sucessTwo:boolean;
  errorSendEmail: boolean;
  scrollingElement = document.scrollingElement || $("html");

  
  tabs = [
    { id: "termo", name: "Termo de uso" },
    { id: "dados", name: "Dados compartilhados" },
    { id: "url", name: "URL" }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.pagina = queryParams.pagina;
      const partnerId = queryParams.partnerId;
      this.customerService.getPartnerAgreement(null, partnerId).subscribe(
        (response) => {
          this.customerAgreementTermDTO = response;
          if (this.customerAgreementTermDTO.customAccess === undefined) {
            this.tabs.pop();
          }
          this.downloadUrl = this.utilsService.getUrlTermsPartner(
            this.customerAgreementTermDTO.partnerId, PartnerTermType.TERM_OF_USE, TermViewType.DOWNLOAD
            );
          this.viewTermUrl = {
            url: this.utilsService.getUrlTermsPartner(
              this.customerAgreementTermDTO.partnerId, PartnerTermType.TERM_OF_USE, TermViewType.VIEW
              ),
            withCredentials: true
          };
        }
      );

    });
  }
  value_tab = "termo";
  tabControl = new FormControl(this.value_tab, {});

  m_changed = function (event) {
    if (event == "termo") {
      $('.nav-tabs a[href="#termo"]').tab("show");
    } else if (event == "dados") {
      $('.nav-tabs a[href="#dados"]').tab("show");
    } else if (event == "url") {
      $('.nav-tabs a[href="#url"]').tab("show");
    }
  };

  goBack() {
    this.location.back();
  }

  addInput() {

    // var html = '<div class="radio">';
    // html += '<p>Digite o endereço exclusivo que você criou pra acessar a página desse parceiro:</p>';
    // html += `<input id="${this.i}" name="radio" type="radio">`;
    // html += `<label for="${this.i}" class="radio-label">`;
    // html += '<input type="text" placeholder="Novo endereço:">';
    // html += '  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.00004"><g><path d="m511.132812 79.929688c-.019531-21.390626-8.367187-41.488282-23.507812-56.59375-31.226562-31.15625-81.992188-31.113282-113.183594.117187l-322.207031 323.503906c-10.480469 10.472657-18.480469 23.4375-23.136719 37.496094l-.300781.914063-28.796875 126.632812 126.984375-28.429688.945313-.3125c14.0625-4.65625 27.035156-12.648437 37.542968-23.152343l322.25-323.542969c15.113282-15.132812 23.429688-35.246094 23.410156-56.632812zm-440.714843 375.34375-13.464844-13.472657 9.722656-42.765625 46.613281 46.640625zm389.003906-346.9375-312.847656 314.105468-56.652344-56.6875 214.300781-215.160156 32.632813 32.632812 28.261719-28.261718-32.691407-32.691406 30.402344-30.519532 32.75 32.75 28.261719-28.261718-32.808594-32.808594 11.707031-11.753906c15.605469-15.625 41.023438-15.648438 56.65625-.050782 7.578125 7.5625 11.757813 17.625 11.769531 28.332032.007813 10.710937-4.152343 20.777343-11.742187 28.375zm-249.164063 363.261718h300.875v39.96875h-340.707031zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#3B69FF" /></g></svg>';
    // html += '</label>';
    // html += '</div>';

    // this.i++;
    // $('#materialInst').append(html);
  }

  sendTerm() {
    this.sucessOne = false;
    this.sucessTwo = false;
    this.errorSendEmail = false;
    this.showMessage = true;
    const customerSendEmailTermsDTO = new CustomerSendEmailTermsDTO();
    customerSendEmailTermsDTO.file = this.customerAgreementTermDTO.term;
    customerSendEmailTermsDTO.fileName = DEFAULT_TERM_FILE_NAME;
    this.customerService.sendTermsToCustomer(customerSendEmailTermsDTO, this.showMessage).subscribe(
      () => {
        this.sucessTwo = true;
        this.animaScroll();
      },
      () => {
        this.errorSendEmail = true;
        this.animaScroll();
      }
    );
  }

  saveUserAccessFillValues() {
    this.sucessOne = false;
    this.sucessTwo = false;
    this.errorSendEmail = false;
    const customerPartnerAccessDataDTO = new CustomerPartnerAccessDataDTO();
    customerPartnerAccessDataDTO.partnerId = this.customerAgreementTermDTO.partnerId;
    customerPartnerAccessDataDTO.accessFillValue = this.customerAgreementTermDTO.customAccess.value;
    this.customerService.saveUserAccessFillValues(customerPartnerAccessDataDTO).subscribe(
      () => {
        this.sucessOne = true;
        this.animaScroll();
      }
      );
    }
    animaScroll() {
      $(this.scrollingElement).animate(
        {
          scrollTop: 0,
        },
        500
      );
    }

  printTerms() {
    const win = this.winRef.nativeWindow.open(this.viewTermUrl.url, '_blank');
    setTimeout(() => {
      win.print();
    }, 3000);
  }

}
