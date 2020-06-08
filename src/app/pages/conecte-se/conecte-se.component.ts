import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Tutorialcontrol } from "src/app/highlight/tutorialcontrol";
import { OnboardStateService } from "src/app/services/onboard-state.service";
import { Location } from '@angular/common';
import { SvgControl } from 'src/app/components/highlight-svg/control/svg-control';
import { map, tap } from 'rxjs/operators';
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { PartnerService } from 'src/app/services/partner.service';
import { DISORDERLY_LIST_SELECTOR, LIST_ITEM_SELECTOR, ORDERED_LIST_SELECTOR, PARAGRAPH_SELECTOR, ORDERED_LIST_REPLACE, PARAGRAPH_REPLACE, DISORDERLY_LIST_REPLACE, LIST_ITEM_REPLACE_CONNECT_PAGE } from 'src/app/utils/constants.enum';
import { ConecteSeComponentData } from 'src/app/dto/conecte-se-component-data';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: "app-conecte-se",
  templateUrl: "./conecte-se.component.html",
  styleUrls: ["./conecte-se.component.scss"]
})

export class ConecteSeComponent implements OnInit, OnDestroy {

  //#region VARIÁVEIS
  // Variável de classe para o card
  card = "card-nossos-parceiros";
  valor: String;
  valor2: String;
  tControl: Tutorialcontrol;
  svgControl: SvgControl;
  partnerId: number;
  partnerName: string;

  modalDelete = "modalDelete";
  modalSuspend = "modalSuspend";
  modalConnect = "modalConnect";
  succSusp = "succSusp";
  succExcl = "succExcl";

  routeType;
  newObj = [];

  parceiros: Array<PartnerDTO> = [];
  serviceDescription: string = undefined;
  serviceId: number;
  categoryId = 0;
  subscription: Subscription;

  //#endregion

  constructor(
    @Inject("GESTAOSERVICOS") public gestaoServicos: any[],
    @Inject("ASSESSORIASERVICOS") public assessoriaServicos: any[],
    @Inject("FORMALIZACAOSERVICOS") public formalizacaoServicos: any[],
    private router: Router,
    private route: ActivatedRoute,
    private onboard: OnboardStateService,
    private location: Location,
    private partnerService: PartnerService
  ) { }

  //#region LIFECYCLES METHODS
  ngOnInit() {
    this.subscription = this.partnerService.getConecteSeData().subscribe(
      (data) => {
        if (!data) {
          this.router.navigate(['/nossos-parceiros']);
          return;
         }
        this.categoryId = data.categoryId;
        this.parceiros = data.partners ? data.partners : [];
        this.serviceDescription = data.serviceDescription;
        this.serviceId = data.serviceId ? data.serviceId : null;

        this.parceiros.forEach(item => {
          item.descriptionAux = this.sanitizePartnerDescription(item.description);
          if (this.serviceDescription) {
            item.servicesDescription = this.serviceDescription;
          } else {
            item.servicesDescription = item.services
            .filter(filtered => filtered.categoryId === this.categoryId)
            .map(value => ' ' + value.name).toString().trim();
          }
        });

      }
    );

    // this.route.queryParams.subscribe((queryParams: any) => {
    //   this.valor = queryParams["pagina"];
    //   this.valor2 = queryParams["pagina2"];

    //   this.routeType = queryParams;
    // });
    //this.filter();

    // if (this.routeType.tipo == 'gestao') {
    //   this.newObj = this.gestaoServicos.filter((gestaoObj) => {
    //     return gestaoObj.servicos.name == this.routeType.servico;
    //   });
    // } else if (this.routeType.tipo == 'assessoria') {
    //   this.newObj = this.assessoriaServicos.filter((assessoriaObj) => {
    //     return assessoriaObj.servicos.name == this.routeType.servico;
    //   });
    // } else {
    //   this.newObj = this.formalizacaoServicos.filter((formalizacaoObj) => {
    //     return formalizacaoObj.servicos.name == this.routeType.servico;
    //   });
    // }

  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngAfterViewInit() {
    //Comentado o onboarding dessa pagina
    /*
    let tipo = "";
    this.route.queryParams.subscribe(params => {
      tipo = params["tipo"];
    });

    if (tipo == "onboard" || this.onboard.isOnboardMode) {
      this.svgControl = new SvgControl();
      this.onboard.isOnboardMode = true;
      var escopo = this;
      setTimeout(function () {
        
       var arrayTest = [
        {
          element: "btn-container",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
          scaleX: 1.2,
          scaleY: 1.4,
          curve: 10,
          tipPosition:'right'
        }
      ];
       escopo.svgControl.start(arrayTest);
        

      }, 700);
      //tira o botao voltar do tooltip
    }
    */
  }
  //#endregion

  //#region TOOLTIP
  toolProximo = () => {
    this.onboard.isOnboardMode2 = true;
    //this.tControl.hl.highlightOut();
    this.svgControl.highlightOut();
    this.svgControl.exitTooltip();
  };

  toolVoltar = () => {
    window.location.href = "#/servicos/assessoria-contabil";
    this.onboard.isOnboardMode2 = false;
  };
  //#endregion

  goBack() {
    this.location.back();
  }

  filter() {
    var param = this.valor;
    var param2 = this.valor2;
    this.parceiros = this.parceiros.filter(function (item) {
      return item.name === param || item.name === param2;
    });
  }

  handleSubmit(link: string) {
    this.router.navigate(["/webview"], {
      queryParams: { pagina: link }
    });
  }

  //#region LOGIC DROP / CONNECT
  link(partner: PartnerDTO) {
    if (!partner.connected) {
      const params = { partnerId: partner.id };
      if (this.serviceId) {
        Object.assign(params, { serviceId: this.serviceId });
      }
      this.router.navigate(['/nossos-parceiros-form'], {
        queryParams: params
      });
    } else {
      this.partnerService.setUrllPartnerNavigate(partner.agreementId, partner.id, this.serviceId);
    }
  }

  mDelete(idParceiro) {
    $("#modalDelete").modal("show");
    this.partnerId = idParceiro;
  }

  mSuspend(idParceiro) {
    $("#modalSuspend").modal("toggle");
    this.partnerId = idParceiro;
  }

  mConnect(idParceiro, nameParceiro) {
    $("#modalConnect").modal("toggle");
    this.partnerId = idParceiro;
    this.partnerName = nameParceiro;
  }

  editPartner(type: string) {
    let count = 0;
    this.parceiros.forEach(parceiro => {
      if (parceiro.id == this.partnerId) {

        if (type == "delete") {
          this.parceiros[count].status = 1;
          this.newObj[0].active = 1;

          $("#modalDelete").modal("hide");
          setTimeout(() => {
            $("#succExcl").modal("show");
          }, 400);
        } else if (type == "suspend") {
          this.parceiros[count].status = 2;
          this.newObj[0].active = 2;

          $("#modalSuspend").modal("hide");
          setTimeout(() => {
            $("#succSusp").modal("show");
          }, 400);
        } else {
          this.parceiros[count].status = 0;
          this.newObj[0].active = 0;

          $("#modalConnect").modal("hide");
        }

      }
      count++;
    });
  }
  //#endregion

  sanitizePartnerLogo(urlData: any) {
    return this.partnerService.sanitizePartnerLogo(urlData);
  }

  sanitizePartnerDescription(description: string) {
    while (description &&
      (description.indexOf(DISORDERLY_LIST_SELECTOR) >= 0 ||
        description.indexOf(LIST_ITEM_SELECTOR) >= 0 ||
        description.indexOf(ORDERED_LIST_SELECTOR) >= 0 ||
        description.indexOf(PARAGRAPH_SELECTOR) >= 0)) {
      description = description.replace(DISORDERLY_LIST_SELECTOR, DISORDERLY_LIST_REPLACE);
      description = description.replace(ORDERED_LIST_SELECTOR, ORDERED_LIST_REPLACE);
      description = description.replace(LIST_ITEM_SELECTOR, LIST_ITEM_REPLACE_CONNECT_PAGE);
      description = description.replace(PARAGRAPH_SELECTOR, PARAGRAPH_REPLACE);
    }

    return description ? description : '';
  }

}
