
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Tutorialcontrol } from "src/app/highlight/tutorialcontrol";
import { OnboardStateService } from "src/app/services/onboard-state.service";
import { SvgControl } from "src/app/components/highlight-svg/control/svg-control";
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { CustomerService } from 'src/app/services/customer.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  DISORDERLY_LIST_SELECTOR,
  LIST_ITEM_SELECTOR,
  ORDERED_LIST_SELECTOR,
  PARAGRAPH_SELECTOR,
  DISORDERLY_LIST_REPLACE,
  ORDERED_LIST_REPLACE,
  LIST_ITEM_REPLACE,
  PARAGRAPH_REPLACE
} from 'src/app/utils/constants.enum';
import { HTTP_STATUS_OK } from 'src/app/constants/path-constants';
import { PartnerService } from 'src/app/services/partner.service';
import { BoundElementProperty } from '@angular/compiler';

declare var $: any;

@Component({
  selector: "app-nossos-parceiros",
  templateUrl: "./nossos-parceiros.component.html",
  styleUrls: ["./nossos-parceiros.component.scss"]
})
export class NossosParceirosComponent implements OnInit {
  //#region VARIÁVEIS
  // Variável de classe para o card
  card = "card-nossos-parceiros";
  partnerEdit: Array<any> = [];
  modalDelete = "modalDelete";
  modalSuspend = "modalSuspend";
  modalConnect = "modalConnect";
  suspendType: String;
  succSusp = "succSusp";
  succExcl = "succExcl";
  partnerId: number;
  partnerName: string;
  tControl: Tutorialcontrol;
  svgControl: SvgControl;
  parceiros: PartnerDTO[] = [];
  parceiro: PartnerDTO;
  urlStatus: string;
  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private onboard: OnboardStateService,
    private customerService: CustomerService,
    private sanitizer: DomSanitizer,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
    //Limpa as variáveis de mapeamento de navegacao do aceite.
    this.clearPartnerSessionStorage();
    this.customerService.getPartners().subscribe(
      (items) => {
        items.forEach(item => {
          item.description = this.sanitizePartnerDescription(item.description);
        });
        this.parceiros = items;
      }
    );

  }
  handleNoScroll(): void {
    const body = document.querySelector("body")
    body.removeAttribute("style")
  }
  sanitizePartnerLogo(urlData: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlData);
  }

  sanitizePartnerDescription(description: string) {
    while (description &&
      (description.indexOf(DISORDERLY_LIST_SELECTOR) >= 0 ||
        description.indexOf(LIST_ITEM_SELECTOR) >= 0 ||
        description.indexOf(ORDERED_LIST_SELECTOR) >= 0 ||
        description.indexOf(PARAGRAPH_SELECTOR) >= 0)) {
      description = description.replace(DISORDERLY_LIST_SELECTOR, DISORDERLY_LIST_REPLACE);
      description = description.replace(ORDERED_LIST_SELECTOR, ORDERED_LIST_REPLACE);
      description = description.replace(LIST_ITEM_SELECTOR, LIST_ITEM_REPLACE);
      description = description.replace(PARAGRAPH_SELECTOR, PARAGRAPH_REPLACE);
    }

    return description ? description : '';
  }

  //#region TOOLTIPS
  tVoltar = () => {
    this.onboard.isOnboardMode2 = false;
    window.location.href = "#/servicos/formalizacao?tipo=onboard";
  };

  tProximo = () => {
    this.onboard.isOnboardMode2 = true;
    //this.tControl.hl.highlightOut();
    this.svgControl.highlightOut();
    this.svgControl.exitTooltip();
  };
  //#endregion

  handleSubmit(partner: PartnerDTO) {
    this.partnerService.setUrllPartnerNavigate(partner.agreementId, partner.id, null);
  }

  //#region LOGIC DROP / CONNECT
  link(event, valor) {
    sessionStorage.setItem('paginaConexao', 'parceiro');
    this.router.navigate(["/nossos-parceiros-form"], {
      queryParams: { partnerId: valor.id }
    });
    // $("#modalConnect").modal("hide");
  }

  mDelete(parceiro: PartnerDTO) {
    this.parceiro = parceiro;
    $("#modalDelete").modal("toggle");
  }

  mDisconect() {
    $("#modalDelete").modal("hide");
    setTimeout(() => {
      this.customerService.userAgreementToken(this.parceiro.agreementId, this.parceiro.id, null).subscribe(
        (userAgreementTermDTO) => {
          this.nSendPartnerUpdate(userAgreementTermDTO.partnerUrlStatusNotification, userAgreementTermDTO.token);
        }, () => {
          this.mShowModal("#serverErr");
        });
    }, 300);
  }

  nSendPartnerUpdate(partnerUrl: string, token: string) {
    setTimeout(() => {
      const url = partnerUrl + '?op=status&token=' + token;
      this.customerService.accessPartnerStatusUrl(url).subscribe(
        (httpReturnPartner) => {
          if (httpReturnPartner === HTTP_STATUS_OK) {
            this.mCancelUserAgreement();
          } else {
            this.mShowModal("#deleteErr");
          }
        }, () => {
          this.mShowModal("#deleteErr");
        });
    }, 300);
  }

  mCancelUserAgreement() {
    setTimeout(() => {
      this.customerService.cancelUserAgreement(this.parceiro.agreementId).subscribe(
        () => {
          this.parceiro.connected = false;
          this.parceiro.agreementId = null;
          this.mShowModal("#succExcl");
        }, () => {
          this.mShowModal("#serverErr");
        });
    }, 300);
  }

  mShowModal(modal: string) {
    $(modal).modal("show");
  }

  mSuspend(idParceiro: number, type: string) {
    this.suspendType = type;
    $("#modalSuspend").modal("toggle");
    this.partnerId = idParceiro;
    console.log(this.partnerId);
  }

  // mConnect(idParceiro, nameParceiro) {
  //   $("#modalConnect").modal("toggle");
  //   this.partnerId = idParceiro;
  //   this.partnerName = nameParceiro;
  // }

  editPartner(type: string) {
    let count = 0;
    this.parceiros.forEach(parceiro => {
      if (parceiro.id == this.partnerId) {
        if (type == "delete") {
          this.parceiros[count].status = 1;
          $("#modalDelete").modal("hide");
          setTimeout(() => {
            $("#succExcl").modal("show");
          }, 400);
        } else if (type == "suspend") {
          this.parceiros[count].status = 2;
          $("#modalSuspend").modal("hide");
          setTimeout(() => {
            $("#succSusp").modal("show");
          }, 400);
        } else {
          this.parceiros[count].status = 0;
          $("#modalConnect").modal("hide");
        }
      }
      count++;
    });
  }

  openModal(type: string) {
    if (type == "delete") {
      $("#deleteErr").modal("show");
    } else if (type == "suspend") {
      $("#suspendErr").modal("show");
    } else if ("serverErr") {
      $("#serverErr").modal("show");
    }
  }
  //#endregion

  clearPartnerSessionStorage() {
    sessionStorage.removeItem('customAccessValue');
    sessionStorage.removeItem('sharingTerm');
    sessionStorage.removeItem('useTerm');
    sessionStorage.removeItem('partnerId');
  }
}
