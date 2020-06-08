import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerAgreementTermDTO } from 'src/app/dto/customer-agreement-term-dto';
import { PartnerTermType } from 'src/app/enums/partner-term-type';
import { WindowRef } from 'src/app/services/windowRef';
import { UtilsService } from 'src/app/services/utils.service';
import { TermViewType } from 'src/app/enums/term-view-type';
import { PartnerUserAgreementDTO } from 'src/app/dto/partner-user-agreement-dto';
import { PartnerService } from 'src/app/services/partner.service';
import { CustomerSendEmailTermsDTO } from 'src/app/dto/customer-send-email-terms-dto';
import { DEFAULT_TERM_FILE_NAME, FILE_SEND_SUCESS_MESSAGE, DEFAULT_SHARING_TERM_FILE_NAME, PDF_TYPE_BASE64 } from 'src/app/utils/constants.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: "app-nossos-parceiros-form",
  templateUrl: "./nossos-parceiros-form.component.html",
  styleUrls: ["./nossos-parceiros-form.component.scss"]
})
export class NossosParceirosFormComponent implements OnInit {
  partnerId: number;
  modalConf = "modalConf";
  showErrorMessagePartner = "showErrorMessagePartner";
  partnerForms: FormGroup;
  serviceId: number = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private winRef: WindowRef,
    private utilsService: UtilsService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private partnerService: PartnerService,
    public sanitizer: DomSanitizer
  ) { }

  texto = 'Alterar dados >';
  customerAgreementTermDTO: CustomerAgreementTermDTO = new CustomerAgreementTermDTO();
  downloadUrl = '';
  public viewTermUrl = null;
  sucessOne: boolean;
  showMessage: boolean;
  errorSendEmail: boolean;
  scrollingElement = document.scrollingElement || $("html");

  //#region LifeCycle methods
  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    this.route.queryParams.subscribe((queryParams: any) => {
      this.partnerId = queryParams.partnerId;
      this.serviceId = queryParams.serviceId ? queryParams.serviceId : null;
      this.showMessage = true;
      this.customerService.getPartnerAgreement(null, this.partnerId, this.showMessage).subscribe(
        (response) => {
          this.customerService.setCustomerAgreementTerm(response);
          this.customerAgreementTermDTO = response;
          this.customerAgreementTermDTO.partnerId, PartnerTermType.SHARING_TERM, TermViewType.DOWNLOAD

          this.downloadUrl = this.utilsService.getUrlTermsPartner(
            this.customerAgreementTermDTO.partnerId, PartnerTermType.SHARING_TERM, TermViewType.DOWNLOAD
          );


          this.createForm();
          this.fillTerm(false);
        }, () => {
          $('#showErrorMessagePartner').modal('toggle');
          $('#showErrorMessagePartner').modal(
            {
              show: false,
              keyboard: false,
              backdrop: 'static'
            }
          );
          $('#showErrorMessagePartner').find('.close').click(() => {
            this.router.navigate(['/nossos-parceiros']);
          });
        },
        () => {
          if ($(".modal-backdrop:visible").length > 0) {
            $(".modal-backdrop:visible").toggle();
          }
        }
      );
    });
  }

  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 767;
    if (w > breakpoint) {
      if (document.getElementById("Grupo_6640")) { document.getElementById("Grupo_6640").style.visibility = 'visible'; }
      if (document.getElementById("Grupo_6639")) { document.getElementById("Grupo_6639").style.paddingBottom = '0px'; }
      return true;
    } else {
      if (document.getElementById("Grupo_6640")) { document.getElementById("Grupo_6640").style.visibility = 'hidden'; }
      if (document.getElementById("Grupo_6639")) { document.getElementById("Grupo_6639").style.paddingBottom = '15px'; }
      return false;
    }
  }

  fillTerm(showModal: boolean) {
    this.sucessOne = false;
    this.errorSendEmail = false;

    this.viewTermUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.utilsService.getUrlTermsPartner(
      this.customerAgreementTermDTO.partnerId, PartnerTermType.SHARING_TERM, TermViewType.VIEW
    ))

    // this.viewTermUrl =
    //   this.utilsService.getUrlTermsPartner(
    //     this.customerAgreementTermDTO.partnerId, PartnerTermType.SHARING_TERM, TermViewType.VIEW
    //   )

    // this.viewTermUrl = {
    //   url: this.utilsService.getUrlTermsPartner(
    //     this.customerAgreementTermDTO.partnerId, PartnerTermType.SHARING_TERM, TermViewType.VIEW
    //   ),
    //   withCredentials: true
    // };

    if (showModal) {
      $('#termoComp').modal('show');
    }
  }

  printTerms() {
    const win = this.winRef.nativeWindow.open(this.viewTermUrl, '_blank');
    setTimeout(() => {
      win.print();
    }, 3000);
  }

  sendTerm() {
    this.sucessOne = false;
    this.errorSendEmail = false;
    const customerSendEmailTermsDTO = new CustomerSendEmailTermsDTO();
    customerSendEmailTermsDTO.file = this.customerAgreementTermDTO.sharingTerm.replace(PDF_TYPE_BASE64, '');
    customerSendEmailTermsDTO.fileName = DEFAULT_SHARING_TERM_FILE_NAME;
    this.showMessage = true;
    this.customerService.sendTermsToCustomer(customerSendEmailTermsDTO, this.showMessage).subscribe(
      () => {
        this.sucessOne = true;
        this.animaScroll();
      },
      () => {
        this.errorSendEmail = true;
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

  goBack() {
    const paginaConexao = sessionStorage.getItem('paginaConexao');
    if (paginaConexao) {
      switch (paginaConexao) {
        case 'parceiro':
          this.router.navigate(['/nossos-parceiros']);
          break;
        case 'notificacoes':
          this.router.navigate(['/notificacoes']);
          break;
        case 'gestaoNegocio':
          this.router.navigate(['/servicos/gestao-do-negocio']);
          break;
        case 'assessoriaContabil':
          this.router.navigate(['/servicos/assessoria-contabil']);
          break;
        case 'formalizacao':
          this.router.navigate(['/servicos/formalizacao']);
          break;
      }
      sessionStorage.removeItem('paginaConexao');
    } else {
      this.location.back();
    }
  }

  scroll(id: string) {
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

  //radio button
  contaComParceiro = "";
  onItemChange(event: any) {
    this.contaComParceiro = event.target.value;
  }

  onChecked(event: any) {
    this.totalForms.controls.checkTerm.setValue(event.target.checked);
  }

  editclicked($event: any) {
    //Variavel de sessão para a tela de edição de dados.
    this.setPartnerSessionStorage();
    const params = { partnerId: this.partnerId };
    if (this.serviceId) {
      Object.assign(params, { serviceId: this.serviceId });
    }
    this.router.navigate(['perfil'], { queryParams: params });
  }

  onFormSubmit(): void {
    if (this.totalForms.controls.checkTerm.value == false) {
      $('#modalConf').modal('toggle');
    } else {
      this.setPartnerSessionStorage();
      this.router.navigate(["/nossos-parceiros-termo"]);
    }

  }

  createPartnerUserAgreement() {
    const agreement = new PartnerUserAgreementDTO();
    agreement.partnerId = this.customerAgreementTermDTO.partnerId;
    agreement.userEnvironmentData = this.utilsService.captureClientInformation();
    agreement.agreementAccepted = this.partnerForms.controls.checkSharingTerm.value;
    this.setPartnerSessionStorage();
    agreement.sharingAgreementAccepted = sessionStorage.getItem('sharingTerm') === 'true';
    agreement.customAccess = sessionStorage.getItem('customAccessValue') != 'null' ? sessionStorage.getItem('customAccessValue') : '';
    this.partnerService.createPartnerUserAgreement(agreement).subscribe(
      (userAgreement) => {
        this.partnerService.setUrllPartnerNavigate(userAgreement.id, userAgreement.partnerId, null);
      }
    );
  }

  goPage() {
    $('#modalConf').modal('toggle');
    this.createPartnerUserAgreement();
  }

  abrirTermo() {
    $("#termoComp").modal("toggle");
  }

  closeModal() {
    $("#termoComp").modal("toggle");
  }

  totalForms: FormGroup;
  createForm() {
    let sharingTerm = false;
    if (sessionStorage.getItem('sharingTerm')) {
      sharingTerm = sessionStorage.getItem('sharingTerm') === 'true';
    } else {
      sharingTerm = this.customerAgreementTermDTO.sharing;
    }

    let customAccessValue = null;
    if (sessionStorage.getItem('customAccessValue')) {
      customAccessValue = sessionStorage.getItem('customAccessValue');
    } else {
      if (this.customerAgreementTermDTO.customAccess) {
        customAccessValue = this.customerAgreementTermDTO.customAccess.value;
      }
    }

    // formgroup pra controlar as validacoes dos campos
    this.totalForms = new FormGroup({
      customAccess: new FormControl(customAccessValue, { updateOn: 'blur' }),
      checkTerm: new FormControl(sharingTerm, { updateOn: 'blur' })
    });
    this.setPartnerForm();

    // formgroup pra controlar as validacoes dos campos
    this.partnerForms = new FormGroup({
      checkSharingTerm: new FormControl(sharingTerm, { updateOn: 'blur' })
    });
  }

  setPartnerSessionStorage() {
    sessionStorage.setItem('customAccessValue', this.totalForms.controls.customAccess.value);
    sessionStorage.setItem('sharingTerm', this.totalForms.controls.checkTerm.value);
    sessionStorage.setItem('partnerId', this.customerAgreementTermDTO.partnerId.toString());
    sessionStorage.setItem('serviceId', this.serviceId ? this.serviceId.toString() : null);
  }

  setPartnerForm() {
    setTimeout(() => {
      this.modifyService([this.customerAgreementTermDTO.customAccess ? '1' : '0'].toString());
    }, 500);
  }

  modifyService(servicePartner: string) {
    switch (servicePartner) {
      case '1':
        $('#serviceYes').addClass('btn-active');
        $('#serviceNo').removeClass('btn-active');
        $('#id-digite').show();
        break;
      default:
        this.totalForms.controls.customAccess.setValue('');
        $('#serviceYes').removeClass('btn-active');
        $('#serviceNo').addClass('btn-active');
        $('#id-digite').hide();
    }
  }

}
