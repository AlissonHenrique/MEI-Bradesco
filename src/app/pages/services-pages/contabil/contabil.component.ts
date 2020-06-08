import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as smoothscroll from 'smoothscroll-polyfill';
import { Tutorialcontrol } from 'src/app/highlight/tutorialcontrol';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardStateService } from 'src/app/services/onboard-state.service';
import { SvgControl } from 'src/app/components/highlight-svg/control/svg-control';
import { PartnerService } from 'src/app/services/partner.service';
import { ASSESSORIA_CONTABIL_CATEGORY_ID, DISORDERLY_LIST_SELECTOR, LIST_ITEM_SELECTOR, ORDERED_LIST_SELECTOR, PARAGRAPH_SELECTOR, DISORDERLY_LIST_REPLACE_SERVICES_PAGE, ORDERED_LIST_REPLACE, PARAGRAPH_REPLACE, LIST_ITEM_REPLACE_CONTABIL_PAGE, DISORDERLY_LIST_REPLACE, LIST_ITEM_REPLACE } from 'src/app/utils/constants.enum';
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { CategoryViewDTO } from 'src/app/dto/category-view-dto';
import { PartnerServicesDTO } from 'src/app/dto/partner-services-dto';
import { ConecteSeComponentData } from 'src/app/dto/conecte-se-component-data';
declare var $: any;


@Component({
  selector: "services-contabil",
  templateUrl: "./contabil.component.html",
  styleUrls: ["./contabil.component.scss"]
})
export class ContabilComponent implements OnInit {

  beneficiosContabil: Array<any> = [];
  parceiroList: Array<any> = [];
  cardModel2 = "card-model-2";
  cardModel3 = "card-model-3";
  card = "card-nossos-parceiros";
  tControl: Tutorialcontrol;
  svgControl: SvgControl;
  categoryViewDTO: CategoryViewDTO = new CategoryViewDTO();
  parceiros: Array<PartnerDTO> = [];
  positionToScroll = 0;

  toolProximo = () => {
    if (this.svgControl.indexElement == 1) {
      window.location.href = "#/conecte-se?pagina=Dicas%20Mei";
    }

    this.svgControl.next();
  }
  toolVoltar = () => {
    if (this.svgControl.indexElement == 0) {
      window.location.href = "#/";
    } else {
      this.svgControl.previous();
    }


  }

  constructor(private partnerService: PartnerService, private route: ActivatedRoute, private onboard: OnboardStateService, private router: Router) {
    smoothscroll.polyfill();
    this.partnerService.findServicesByCategory(ASSESSORIA_CONTABIL_CATEGORY_ID).subscribe(
      (dto) => {
        this.categoryViewDTO = dto;
        this.parceiros = this.categoryViewDTO.partners;
        this.beneficiosContabil = this.categoryViewDTO.services;
        this.parceiros.forEach(item => {
          item.descriptionAux = this.sanitizePartnerDescription(item.description);
          item.services = item.services.filter(filtered => filtered.categoryId === ASSESSORIA_CONTABIL_CATEGORY_ID);
        });

        setTimeout(() => {
          this.createSlick();
          this.positionToScroll = $('.beneficios').offset().top - $('.banner').offset().top;
        }, 500);
      }
    );

    // this.beneficiosContabil = [
    //   {
    //     id: 0,
    //     name: "Emissão de nota fiscal",
    //     description:"Todo o suporte que sua empresa precisa para emitir notas eletrônicas ou em talões.",
    //     btn: "Acessar",
    //     title: ""
    //   },
    //   {
    //     id: 1,
    //     name: "Extrato do DAS",
    //     description:
    //       "Consulte o histórico de parcelas em aberto ou quitadas.",
    //     btn: "Acessar",
    //     title: "DAS – Documento de Arrecadação do Simples Nacional – reúne o recolhimento de impostos em um único tributo e repassa os valores automaticamente para as contas do estado, do município e da União."
    //   },
    //   {
    //     id: 2,
    //     name: "Parcelamento de DAS em atraso",
    //     description:
    //       "Facilidade para pagar os boletos atrasados.",
    //     btn: "Acessar",
    //     title: "DAS – Documento de Arrecadação do Simples Nacional – reúne o recolhimento de impostos em um único tributo e repassa os valores automaticamente para as contas do estado, do município e da União."
    //   },
    //   {
    //     id: 3,
    //     name: "Emissão de DASN",
    //     description:
    //       "Sua declaração emitida sem burocracia.",
    //     btn: "Acessar",
    //     title: "DASN – Declaração Anual do Simples Nacional – é emitida anualmente, obrigatória para quem é MEI e informa o faturamento e as contratações da empresa do ano anterior."
    //   },
    //   {
    //     id: 4,
    //     name: "DASN em atraso",
    //     description:
    //       "Regularize as declarações em atraso de forma fácil.",
    //     btn: "Acessar",
    //     title: "DASN – Declaração Anual do Simples Nacional – é emitida anualmente, obrigatória para quem é MEI e informa o faturamento e as contratações da empresa do ano anterior."
    //   },
    // ];
  }
  ngOnInit() { }
  handleNoScroll(): void {
    const body = document.querySelector("body")
    body.removeAttribute("style")
  }
  createSlick() {
    $(function () {
      $(".regular1").slick({
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

      $('.regular1', document).slick('resize');
    });

    //Comentado onboarding dessa pagina.
    /*
    let tipo = "";
    this.route.queryParams.subscribe(params => {
      tipo = params["tipo"];
    });

    if (tipo == "onboard" || this.onboard.isOnboardMode) {
      this.onboard.isOnboardMode = true;

      var escopo = this;
      setTimeout(function(){

        var arrayTest = [
          {element:"btn-banner",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
          scaleX:1.2, scaleY:2, curve:10,tipPosition:'right'},
          {element:"0",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
          scaleX:1.1, scaleY:1.1, curve:10,tipPosition:'right'}
        ];
        escopo.svgControl = new SvgControl();
        escopo.svgControl.start(arrayTest);

      },700);

      //tira o botao voltar do tooltip
      //$(".b-back").css("display", "none");



    }
    */
  }

  params(tipo) {
    this.router.navigate(['/conecte-se'], { queryParams: { pagina: 'Dicas Mei' } });

    if (tipo == 'todos') {
      this.router.navigate(['/nossos-parceiros']);
    }
  }

  link(partner: PartnerDTO) {
    if (partner.connected) {
      this.handleSubmit(partner);
    } else {
      sessionStorage.setItem('paginaConexao', 'assessoriaContabil');
      this.router.navigate(["/nossos-parceiros-form"], {
        queryParams: { partnerId: partner.id }
      });
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

  handleSubmit(partner: PartnerDTO) {
    this.partnerService.setUrllPartnerNavigate(partner.agreementId, partner.id, null);
  }

  handleSubmitService(service: PartnerServicesDTO) {
    const data = new ConecteSeComponentData();
    data.categoryId = ASSESSORIA_CONTABIL_CATEGORY_ID;
    // this.parceiros.forEach(item => {
    //   console.log(item.services);
    //   if (item.services && item.services.filter(f => f.id === service.id).length > 0) {
    //     data.partners.push(item);
    //   }
    // });
    data.partners = this.parceiros.filter(filtered => filtered.services.filter(f => f.id === service.id).length > 0);
    data.serviceDescription = service.name;
    data.serviceId = service.id;
    this.partnerService.setConecteSeData(data);
  }

}
