import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PartnerTermType } from 'src/app/enums/partner-term-type';
import { TermViewType } from 'src/app/enums/term-view-type';
import { WindowRef } from 'src/app/services/windowRef';
import { CustomerSendEmailTermsDTO } from 'src/app/dto/customer-send-email-terms-dto';
import { DEFAULT_TERM_FILE_NAME, FILE_SEND_SUCESS_MESSAGE } from 'src/app/utils/constants.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { CustomerAgreementTermDTO } from 'src/app/dto/customer-agreement-term-dto';
import { PartnerUserAgreementDTO } from 'src/app/dto/partner-user-agreement-dto';
import { PartnerService } from 'src/app/services/partner.service';
import { FormControl, FormGroup } from '@angular/forms';
declare let $: any;

@Component({
  selector: "app-nossos-parceiros-termo",
  templateUrl: "./nossos-parceiros-termo.component.html",
  styleUrls: ["./nossos-parceiros-termo.component.scss"]
})
export class NossosParceirosTermoComponent implements OnInit {
  pagina: string;
  modalConf = "modalConf";

  downloadUrl = '';
  viewTermUrl = null;
  customerAgreementTermDTO: CustomerAgreementTermDTO = new CustomerAgreementTermDTO();
  partnerForms: FormGroup;
  sucessTwo: boolean;
  errorSendEmail: boolean;
  scrollingElement = document.scrollingElement || $("html");
  showMessage: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private customerService: CustomerService,
    private utilsService: UtilsService,
    private winRef: WindowRef,
    private notificationService: NotificationService,
    private partnerService: PartnerService) { }

  checkUseTermControl: FormControl;

  ngOnInit() {
    const subscriber = this.customerService.getCustomerAgreementTerm().subscribe(
      (partnerTerm) => {
        if (subscriber) { subscriber.unsubscribe(); }
        if (partnerTerm) {
          this.customerAgreementTermDTO = partnerTerm;
          this.pagina = partnerTerm.partnerName;
          this.downloadUrl = this.utilsService.getUrlTermsPartner(
            partnerTerm.partnerId, PartnerTermType.TERM_OF_USE, TermViewType.DOWNLOAD
          );
          this.viewTermUrl = {
            url: this.utilsService.getUrlTermsPartner(
              partnerTerm.partnerId, PartnerTermType.TERM_OF_USE, TermViewType.VIEW
            ),
            withCredentials: true
          };
        } else {
          this.goBack();
        }
      }
    );
    this.createForm();
  }

  onChecked(event: any) {
    this.partnerForms.controls.checkUseTerm.setValue(event.target.checked);
    sessionStorage.setItem('useTerm', event.target.checked);
  }

  // post params
  handleSubmit() {
    let sharingTerm = sessionStorage.getItem('sharingTerm') === 'true';
    let useTerm = this.partnerForms.controls.checkUseTerm.value;
    if (sharingTerm  && useTerm) {
      this.createPartnerUserAgreement();
    } else if (!sharingTerm  || !useTerm) {
      //console.log('dois false');
      $('#modalConf').modal('toggle');
    } else {
      // não terá essa situação
      $("#modalTermo").modal("toggle");
    }
  }

  term() {
    let sharingTerm = sessionStorage.getItem('sharingTerm') === 'true';
    if (!sharingTerm) {
      this.goBack();
      $("#modalTermo").modal("toggle");
    } else {
      $("#modalTermo").modal("toggle");
    }
  }

  goPage() {
    $('#modalConf').modal('toggle');
    this.createPartnerUserAgreement();
  }

  goBack() {
    const partnerIdentifier = sessionStorage.getItem('partnerId');
    const serviceIdentifier = sessionStorage.getItem('serviceId');
    const params = { partnerId: partnerIdentifier };
    if (serviceIdentifier && serviceIdentifier !== 'null') {
      Object.assign(params, { serviceId: serviceIdentifier });
    }
    this.router.navigate(['/nossos-parceiros-form'], {
      queryParams: params
    });
    //this.location.back();
  }

  printTerms() {
    const win = this.winRef.nativeWindow.open(this.viewTermUrl.url, '_blank');
    setTimeout(() => {
      win.print();
    }, 3000);
  }

  sendTerm() {
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
  animaScroll() {
    $(this.scrollingElement).animate(
      {
        scrollTop: 0,
      },
      500
    );
  }

  createPartnerUserAgreement() {
    const agreement = new PartnerUserAgreementDTO();
    agreement.partnerId = this.customerAgreementTermDTO.partnerId;
    agreement.userEnvironmentData = this.utilsService.captureClientInformation();
    agreement.agreementAccepted = this.partnerForms.controls.checkUseTerm.value;
    agreement.sharingAgreementAccepted = sessionStorage.getItem('sharingTerm') === 'true';
    agreement.customAccess = sessionStorage.getItem('customAccessValue') != 'null' ? sessionStorage.getItem('customAccessValue') : '';
    let serviceId = sessionStorage.getItem('serviceId');
    if (serviceId && serviceId === 'null') { serviceId = null; }
    this.partnerService.createPartnerUserAgreement(agreement).subscribe(
      (userAgreement) => {
        this.clearPartnerSessionStorage();
        this.partnerService.setUrllPartnerNavigate(userAgreement.id , userAgreement.partnerId, serviceId);
      }
    );
  }

  createForm() {
    let useTerm = false;
    if (sessionStorage.getItem('useTerm')) {
      useTerm = sessionStorage.getItem('useTerm') === 'true' ? true : false;
    } else {
      useTerm = this.customerAgreementTermDTO.agreement;
    }

    // formgroup pra controlar as validacoes dos campos
    this.partnerForms = new FormGroup({
      checkUseTerm: new FormControl(useTerm, { updateOn: 'blur' })
    });
    
  }

  clearPartnerSessionStorage() {
    sessionStorage.removeItem('customAccessValue');
    sessionStorage.removeItem('sharingTerm');
    sessionStorage.removeItem('useTerm');
    sessionStorage.removeItem('partnerId');
    sessionStorage.removeItem('serviceId');
  }

}
