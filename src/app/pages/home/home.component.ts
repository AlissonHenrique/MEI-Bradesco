import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { CustomValidators } from "../fields/custom-validators";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Highlight } from "src/app/highlight/highlight";
import { OnboardStateService } from "src/app/services/onboard-state.service";
import { Tutorialcontrol } from "src/app/highlight/tutorialcontrol";
import { SvgControl } from "src/app/components/highlight-svg/control/svg-control";
import { CustomerService } from "src/app/services/customer.service";
import { PartnerDTO } from "src/app/dto/partner-dto";
import {
  GESTAO_NEGOCIO_CATEGORY_ID,
  FORMALIZACAO_CATEGORY_ID,
  ASSESSORIA_CONTABIL_CATEGORY_ID,
} from "src/app/utils/constants.enum";
import { PartnerService } from "src/app/services/partner.service";
import { PartnerServicesDTO } from "src/app/dto/partner-services-dto";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  //#region VARIÁVEIS
  // Variável de classe para o card
  card = "card-nossos-parceiros";

  // Variáveis de abertura de modal
  modal1 = "modal1";
  modal2 = "modal2";
  modal3 = "modal3";
  succExcl = "succExcl";

  // Verifica se a exibição está para CNPJ ou não
  verifyCNPJ: boolean = false;

  placeholder: String = "hello";
  disabled = true;
  pagina: String;
  connectedGestao: Array<PartnerDTO> = [];
  connectedAssessoria: Array<PartnerDTO> = [];
  connectedFormalizacao: Array<PartnerDTO> = [];
  partnerEdit: Array<any> = [];
  partnerId: number;
  modalSuspend = "modalSuspend";
  tControl: Tutorialcontrol;
  svgControl: SvgControl;
  suspendType: String;
  gestaoLength: number;
  assessoriaLength: number;
  formalizacaoLength: number;

  customerCnpj: string = "";
  customerName: string = "";
  isOnboardingCnpj: Boolean = false;
  //#endregion
  currentTab;
  seta_svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24.738" height="12.793" viewBox="0 0 24.738 12.793"><g id="Group_1616" data-name="Group 1616" transform="translate(-17049.969 17167.383) rotate(90)"><path id="Path_2825" data-name="Path 2825" d="M-17331.609-17066.2l5.689-6.924,5.551,6.924" transform="translate(165)" fill="none" stroke="#3b69ff" stroke-width="2"/><path id="Path_2826" data-name="Path 2826" d="M-17121.986-17073.121v23.152" transform="translate(-38.963)" fill="none" stroke="#3b69ff" stroke-width="2"/></g></svg>';
  partners: Array<PartnerDTO> = [];
  gestaoServicos: any[] = [];
  assessoriaServicos: any[] = [];
  formalizacaoServicos: any[] = [];
  cookie;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private onboard: OnboardStateService,
    private customerService: CustomerService,
    private partnerService: PartnerService
  ) {
    const categories = [
      FORMALIZACAO_CATEGORY_ID,
      ASSESSORIA_CONTABIL_CATEGORY_ID,
      GESTAO_NEGOCIO_CATEGORY_ID,
    ];
    this.partnerService
      .findActivePartnerServicesByCategory(categories)
      .subscribe((items) => {
        this.partners = items;
        this.ajusteServicosGestao();
        this.ajusteServicosContabil();
        this.ajusteServicosFormalizacao();
      });
  }

  //#region LIFECYCLE METHODS
  ngOnInit() {
    this.customerService.getCustomerDTO().subscribe((customer) => {
      if (customer) {
        this.customerCnpj = customer.additionalData.cnpj;
      }
    });

    ///verifica msg walk trought
    setTimeout(() => {
      if (this.customerCnpj == " " || this.customerCnpj == undefined) {
        this.verifyCNPJ = false;
      } else {
        this.verifyCNPJ = true;
      }
    }, 1000);

    this.customerService.getCustomerName().subscribe((value) => {
      this.customerName = value;
    });

    let tipo = "";
    this.route.queryParams.subscribe((params) => {
      tipo = params["tipo"];
    });
    this.currentTab = "gestao";
    switch (tipo) {
      case "gestao":
        $('.nav-tabs a[href="#gestao"]').tab("show");
        break;
      case "formalizacao":
        $('.nav-tabs a[href="#formalizacao"]').tab("show");
        this.currentTab = tipo;
        break;
      case "assessoria":
        $('.nav-tabs a[href="#assessoria"]').tab("show");
        this.currentTab = tipo;
        break;
      default:
        $('.nav-tabs a[href="#gestao"]').tab("show");
    }

    this.connectedAssessoria = this.assessoriaServicos.filter(function (
      parceiro
    ) {
      return parceiro.active === 0;
    });

    this.assessoriaLength = this.connectedAssessoria.length;

    $(function () {
      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      });
    });
  }

  ngAfterViewInit(): void {
    $(
      "modal-pequeno #modal2 .modal-dialog .modal-content .modal-footer app-button #id-app-button"
    ).css("margin-bottom", "2.5rem");
    this.cookie = this.getCookie("mei-home-logado-first-visit");
    let elementCard: string;
    let tipo = "";
    this.route.queryParams.subscribe((params) => {
      tipo = params["tipo"];
    });
    let s = this;
    $("#hl-svg").click(function () {
      if (s.svgControl) {
        s.onboard.isOnboardMode = false;
        s.svgControl.highlightOut();
        s.svgControl.exitTooltip();
      }
    });
    this.svgControl = new SvgControl();
    if (
      (tipo == "onboard2" || this.onboard.isOnboardMode2) &&
      this.currentTab == "gestao"
    ) {
      this.onboard.isOnboardMode2 = true;
      const escopo = this;

      var setaSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24.738" height="12.793" viewBox="0 0 24.738 12.793"><g id="Group_1616" data-name="Group 1616" transform="translate(-17049.969 17167.383) rotate(90)"><path id="Path_2825" data-name="Path 2825" d="M-17331.609-17066.2l5.689-6.924,5.551,6.924" transform="translate(165)" fill="none" stroke="#3b69ff" stroke-width="2"/><path id="Path_2826" data-name="Path 2826" d="M-17121.986-17073.121v23.152" transform="translate(-38.963)" fill="none" stroke="#3b69ff" stroke-width="2"/></g></svg>';

      setTimeout(function () {
        if (escopo.gestaoLength > 0) {
          elementCard = "gestao";
        } else if (escopo.assessoriaLength > 0) {
          $('.nav-tabs a[href="#assessoria"]').tab("show");
          elementCard = "assessoria";
        } else if (escopo.formalizacaoLength > 0) {
          $('.nav-tabs a[href="#formalizacao"]').tab("show");
          elementCard = "formalizacao";
        }

        let arrayDesktop = [
          {
            element: "first-card-tutorial-" + elementCard,
            text: [
              "Quando quiser acessar os serviços do parceiro conectado, você consegue por aqui.",
            ],
            scaleX: 1.1,
            scaleY: 1.1,
            curve: 10,
            pivo: "center",
          },
        ];

        let arrayMobile = [
          {
            element: "first-card-tutorial-assessoria-mobile",
            text: [
              "Quando quiser acessar os serviços do parceiro conectado, você consegue por aqui.",
            ],
            scaleX: 1.05,
            scaleY: 1.05,
            curve: 10,
            fixScroll: -30,
            pivo: "center",
          },
        ];

        escopo.svgControl.start(arrayDesktop, arrayMobile);
        $("body").css("overflow", "hidden");
      }, 700);

      //tira o botao voltar do tooltip
      $(".b-back").css("display", "none");
      $(".b-forward").html("Concluir");
    } else if (tipo == "onboard" || this.onboard.isOnboardMode) {
      document.cookie = "mei-home-logado-first-visit=true";
      this.svgControl = new SvgControl();
      setTimeout(() => {
        $("#modal2").modal("toggle");
      }, 100);
    }
  }
  //#endregion

  //#region TOOLTIP / TUTORIAL
  tClose = () => {
    console.log("close!!");

    if (this.svgControl) {
      this.onboard.isOnboardMode = false;
      this.svgControl.highlightOut();
      this.svgControl.exitTooltip();
    }
  };
  tVoltar = () => {
    this.svgControl.previous();
    this.changeTab();
  };

  tProximo = () => {
    if (!this.onboard.isOnboardMode2) {
      if (this.svgControl.indexElement == 3) {
        this.onboard.isOnboardMode = false;
        this.onboard.isOnboardMode2 = true;
        window.location.href = "#/servicos/assessoria-contabil";
      }
      this.svgControl.next();
      this.changeTab();
    } else {
      this.onboard.isOnboardMode2 = false;
      this.onboard.isOnboardMode = false;

      //this.tControl.hl.highlightOut();
      this.svgControl.highlightOut();
      this.svgControl.exitTooltip();
    }
  };

  changeTab() {
    if (this.svgControl.indexElement == 2) {
      $('.nav-tabs a[href="#assessoria"]').tab("show");
    } else if (this.svgControl.indexElement == 1) {
      $('.nav-tabs a[href="#gestao"]').tab("show");
    } /*else if (this.svgControl.indexElement == 3) {
       $('.nav-tabs a[href="#formalizacao"]').tab("show");
     }*/
  }

  tutorialComCnpj() {
    this.onboard.isOnboardMode = true;
    this.onboard.isOnboardMode2 = false;
    this.isOnboardingCnpj = true;
    var escopo = this;

    setTimeout(function () {
      let arrayDesktop = [
        {
          element: "title-servicos",
          text: [
            "Os serviços com os quais você se conectar aparecem aqui, relacionados pelo nome do parceiro escolhido.",
          ],
          scaleX: 1,
          scaleY: 1,
          padding: 10,
          curve: 10,
          pivo: "center",
        },

        {
          element: "li-gestao",
          text: [
            "Com o Gestão MEI, você gerencia seu negócio sem custo, quando e onde quiser, pelo celular ou computador. Vendas on-line, controle de estoque e emissão de documentos fiscais são algumas das facilidades disponíveis pra você.",
          ],
          scaleX: 1.1,
          scaleY: 1,
          fixPositionX: -9,
          fixPositionY: 5,
          curve: 10,
        },

        {
          element: "li-contabil",
          text: [
            "Você não precisa mais se preocupar com declaração anual, emissão e pagamento do DAS etc. Nosso parceiro te ajuda com esses e outros serviços contábeis, dão dicas de gestão e suporte com especialistas.<br><br>E o melhor: seu custo-benefício é bem melhor do que se contratar um escritório de contabilidade.",
          ],
          scaleX: 1.1,
          scaleY: 1,
          fixPositionX: -9,
          fixPositionY: 5,
          curve: 10,
        },

        {
          element: "add-service-contabil",
          text: [
            "Também é possível adicionar mais serviços. É só clicar em <strong>Adicionar novo serviço</strong> e você é direcionado pra página do serviço escolhido. Depois, basta escolher um parceiro e se conectar!",
          ],
          padding: 8,
          curve: 10,
          tipPosition: "right",
        },
      ];

      //=================
      //====MOBILE=======
      //=================
      let arrayMobile = [
        {
          element: "title-servicos-mobile",
          text: [
            "Os serviços com os quais você se conectar aparecem aqui, relacionados pelo nome do parceiro escolhido.",
          ],
          scaleX: 1,
          scaleY: 1,
          fixPositionX: -8,
          fixPositionY: -10,
          rect_width: 96,
          padding: 10,
          curve: 10,
          pivo: "left",
        },

        {
          element: "li-gestao-mobile",
          text: [
            "Com o Gestão MEI, você gerencia seu negócio sem custo, quando e onde quiser, pelo celular ou computador. Vendas on-line, controle de estoque e emissão de documentos fiscais são algumas das facilidades disponíveis pra você.",
          ],
          scaleX: 1,
          scaleY: 1,
          padding: 8,
          curve: 10,
        },

        {
          element: "li-contabil-mobile",
          text: [
            "Você não precisa mais se preocupar com declaração anual, emissão e pagamento do DAS etc. Nosso parceiro te ajuda com esses e outros serviços contábeis, dão dicas de gestão e suporte com especialistas.<br><br>E o melhor: seu custo-benefício é bem melhor do que se contratar um escritório de contabilidade.",
          ],
          scaleX: 1,
          scaleY: 1,
          padding: 8,
          fixScroll: 80,
          curve: 10,
        },

        {
          element: "add-service-contabil-mobile",
          text: [
            "Também é possível adicionar mais serviços. É só clicar em <strong>Adicionar novo serviço</strong> e você é direcionado pra página do serviço escolhido. Depois, basta escolher um parceiro e se conectar!",
          ],
          padding: 8,
          fixScroll: -120,
          curve: 10,
        },
      ];

      escopo.svgControl.start(arrayDesktop, arrayMobile);
      $("body").css("overflow", "hidden");
    }, 500);

    //tira o botao voltar do tooltip
    $(".b-back").css("display", "none");
    //$(".b-forward").html("Próximo");
  }

  tutorialSemCnpj() {
    this.onboard.isOnboardMode = false;
    this.onboard.isOnboardMode2 = true;
    window.location.href = "#/servicos/formalizacao";
    $("#modal3").modal("toggle");
    //$('.nav-tabs a[href="#formalizacao"]').tab("show");
  }
  //#endregion

  slide2() {
    $("#modal2").modal("toggle");
    if (!this.verifyCNPJ) {
      $("#modal3").modal("toggle");
    } else {
      this.tutorialComCnpj();
    }
  }

  slide3() {
    $("#modal3").modal("toggle");
    this.tutorialComCnpj();
  }

  modal_voltar() {
    $("#modal3").modal("toggle");
    $("#modal2").modal("toggle");
  }

  closeModal() {
    $("#modal1").modal("toggle");
  }

  handleSubmit(partner: PartnerDTO) {
    this.partnerService.setUrllPartnerNavigate(
      partner.agreementId,
      partner.id,
      partner.serviceIdSelected
    );
  }

  mSuspend(idParceiro, type: string) {
    this.suspendType = type;
    $("#modalSuspend").modal("toggle");

    this.suspend(idParceiro);
  }

  suspend(partnerId: number) {
    if (this.suspendType == "gestao") {
      this.connectedGestao = this.gestaoServicos.filter((parceiro) => {
        return parceiro.id !== partnerId;
      });
      this.gestaoLength = this.connectedGestao.length;
    } else if (this.suspendType == "assessoria") {
      this.connectedAssessoria = this.assessoriaServicos.filter((parceiro) => {
        return parceiro.id !== partnerId;
      });
      this.assessoriaLength = this.connectedAssessoria.length;
    } else {
      this.connectedFormalizacao = this.connectedFormalizacao.filter(
        (parceiro) => {
          return parceiro.id !== partnerId;
        }
      );
    }
  }

  ajusteServicosGestao() {
    this.connectedGestao = this.filterParter(GESTAO_NEGOCIO_CATEGORY_ID);

    this.connectedGestao.forEach((item) => {
      item.servicesDescription = item.services
        .filter(
          (filtered) => filtered.categoryId === GESTAO_NEGOCIO_CATEGORY_ID
        )
        .map((value) => " " + value.name)
        .toString()
        .trim();
    });

    this.gestaoLength = this.connectedGestao.length;
  }

  ajusteServicosContabil() {
    const connecteds = this.filterParter(ASSESSORIA_CONTABIL_CATEGORY_ID);
    this.connectedAssessoria = this.splitPartnerByService(
      connecteds,
      ASSESSORIA_CONTABIL_CATEGORY_ID
    );
    this.assessoriaLength = this.connectedAssessoria.length;
  }

  ajusteServicosFormalizacao() {
    const connecteds = this.filterParter(FORMALIZACAO_CATEGORY_ID);
    this.connectedFormalizacao = this.splitPartnerByService(
      connecteds,
      FORMALIZACAO_CATEGORY_ID
    );
    this.formalizacaoLength = this.connectedFormalizacao.length;
  }

  splitPartnerByService(items: Array<PartnerDTO>, categoryId: number) {
    const splited: Array<PartnerDTO> = [];
    const services: Array<PartnerServicesDTO> = [];
    items.forEach((item) => {
      item.services.forEach((x) => {
        if (x.categoryId === categoryId) {
          services.push(x);
        }
      });
    });
    services.forEach((service) => {
      const p = items.filter(
        (f) => f.services.filter((s) => s.id === service.id).length > 0
      );
      if (p.length > 0) {
        const newItem = { ...p[0] };
        newItem.servicesDescription = service.name;
        newItem.description = service.description;
        newItem.serviceIdSelected = service.id;
        splited.push(newItem);
      }
    });

    return splited;
  }

  filterParter(categoryId: number) {
    const filtered = this.partners.filter(
      (partner) =>
        partner.connected &&
        partner.services.filter((service) => service.categoryId === categoryId)
          .length > 0
    );
    return filtered;
  }

  sanitizePartnerLogo(urlData: any) {
    return this.partnerService.sanitizePartnerLogo(urlData);
  }

  getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
