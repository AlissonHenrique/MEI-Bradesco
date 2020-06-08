import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tutorialcontrol } from "src/app/highlight/tutorialcontrol";
import { Highlight } from "src/app/highlight/highlight";
import { OnboardStateService } from "src/app/services/onboard-state.service";
import { SvgControl } from "src/app/components/highlight-svg/control/svg-control";
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { PartnerService } from 'src/app/services/partner.service';
import { FORMALIZACAO_CATEGORY_ID, DISORDERLY_LIST_SELECTOR, LIST_ITEM_SELECTOR, ORDERED_LIST_SELECTOR, PARAGRAPH_SELECTOR, DISORDERLY_LIST_REPLACE_SERVICES_PAGE, ORDERED_LIST_REPLACE, LIST_ITEM_REPLACE_SERVICES_PAGE, PARAGRAPH_REPLACE, DISORDERLY_LIST_REPLACE, LIST_ITEM_REPLACE } from 'src/app/utils/constants.enum';
declare let $: any;

@Component({
  selector: "app-formalizacao",
  templateUrl: "./formalizacao.component.html",
  styleUrls: ["./formalizacao.component.scss"]
})
export class FormalizacaoComponent implements OnInit {
  // notCNPJ: Array<any> = [];
  parceiroList: Array<any> = [];
  comoFazer: Array<any> = [];
  cardModel2 = "card-model-2";
  cardModel3 = "card-model-3";
  card = "card-nossos-parceiros";
  tControl: Tutorialcontrol;
  svgControl: SvgControl;
  parceiros: Array<PartnerDTO> = [];
  positionToScroll = 0;

  toolProximo = () => {
    window.location.href = "#/nossos-parceiros";
  };

  constructor(
    private route: ActivatedRoute,
    private onboard: OnboardStateService,
    private router: Router,
    private partnerService: PartnerService
  ) {
    this.partnerService.findServicesByCategory(FORMALIZACAO_CATEGORY_ID).subscribe(
      (dto) => {
        this.parceiros = dto.partners;
        this.parceiros.forEach(item => {
          item.description = this.sanitizePartnerDescription(item.description);
          item.services = item.services.filter(filtered => filtered.categoryId === FORMALIZACAO_CATEGORY_ID);
          item.servicesDescription = '';
          item.serviceIdSelected = undefined;
          if (item.services.length > 0) {
            item.servicesDescription = item.services[0].name;
            item.serviceIdSelected = item.services[0].id;
          }

        });

        setTimeout(() => {
          this.createSlick();
          this.positionToScroll = $('.servicos-parceiros').offset().top - $('.banner').offset().top;
        }, 500);
      }
    );
    // this.notCNPJ = this.parceiros;

    // this.notCNPJ = this.parceiros.filter(function(parceiros) {
    //   return parceiros.needCNPJ === false;
    // });

    this.comoFazer = [
      {
        id: 0,
        text: "<b>RG e CPF</b>",
        icon: "assets/images/icon-formalizacao-rg-cpf.png"
      },
      {
        id: 1,
        text:
          "<b>Endereço residencial e comercial</b> – se o local de trabalho for diferente do residencial",
        icon: "assets/images/svg/icon-formalizacao-endereco.svg"
      },
      {
        id: 2,
        text: "<b>Número do recibo de entrega da última declaração do Imposto de Renda Pessoa Física</b> – se declarado nos últimos 2 anos",
        icon: "assets/images/svg/icon-formalizacao-numero.svg"
      },
      {
        id: 3,
        text: "<b>Título de eleitor – </b>se não tiver declarado o IR",
        icon: "assets/images/svg/icon-formalizacao-eleitor.svg"
      }
    ];
  }

  ngOnInit() { }
  handleParamIcon() {
    console.log("sdasd");
  }
  handleNoScroll(): void {
    const body = document.querySelector("body")
    body.removeAttribute("style")
  }
  createSlick() {
    $(function () {
      $(".regular3").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

      $(".regular3", document).slick("resize");

      $(".regular4").slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });

    //comentado o onboarding dessa pagina
    /*
    let tipo = "";
    this.route.queryParams.subscribe(params => {
      tipo = params["tipo"];
    });

    if (tipo == "onboard" || this.onboard.isOnboardMode) {
      this.onboard.isOnboardMode = true;
      this.svgControl = new SvgControl();
      var escopo = this;
      setTimeout(function () {

        var arrayTest = [
          {
            element: "btn-banner",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            scaleX: 1.2,
            scaleY: 2,
            curve: 10
          }
        ];

        escopo.svgControl.start(arrayTest);
      }, 700);

      //tira o botao voltar do tooltip
      $(".b-back").css("display", "none");
    }
    */




  }

  params(tipo) {
    this.router.navigate(["/conecte-se"], {
      queryParams: { pagina: "Dicas Mei" }
    });

    if (tipo == 'todos') {
      this.router.navigate(['/nossos-parceiros']);
    }
  }

  link(partner: PartnerDTO) {
    if (!partner.connected) {
      sessionStorage.setItem('paginaConexao', 'formalizacao');
      this.router.navigate(["/nossos-parceiros-form"], {
        queryParams: { partnerId: partner.id, serviceId: partner.serviceIdSelected }
      });
    } else {
      this.partnerService.setUrllPartnerNavigate(partner.agreementId, partner.id, partner.serviceIdSelected);
    }
  }

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
      description = description.replace(LIST_ITEM_SELECTOR, LIST_ITEM_REPLACE);
      description = description.replace(PARAGRAPH_SELECTOR, PARAGRAPH_REPLACE);
    }

    return description ? description : '';
  }

}
