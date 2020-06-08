import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryViewDTO } from 'src/app/dto/category-view-dto';
import { PartnerService } from 'src/app/services/partner.service';
import { GESTAO_NEGOCIO_CATEGORY_ID, DISORDERLY_LIST_SELECTOR, LIST_ITEM_SELECTOR, ORDERED_LIST_SELECTOR, PARAGRAPH_SELECTOR, DISORDERLY_LIST_REPLACE, ORDERED_LIST_REPLACE, LIST_ITEM_REPLACE, PARAGRAPH_REPLACE, DISORDERLY_LIST_REPLACE_SERVICES_PAGE, LIST_ITEM_REPLACE_SERVICES_PAGE } from 'src/app/utils/constants.enum';
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { ConecteSeComponentData } from 'src/app/dto/conecte-se-component-data';
declare let $: any;
@Component({
  selector: "app-gestao-negocio",
  templateUrl: "./gestao-negocio.component.html",
  styleUrls: ["./gestao-negocio.component.scss"]
})
export class GestaoNegocioComponent implements OnInit {
  card = "card-nossos-parceiros";
  beneficiosContabil: Array<any> = [];
  parceiroList: Array<any> = [];
  cardModel2 = "card-model-2";
  cardModel3 = "card-model-3";
  gestao = "gestaos";
  categoryViewDTO: CategoryViewDTO = new CategoryViewDTO();
  parceiros: Array<PartnerDTO> = [];
  positionToScroll = 0;

  constructor(private router: Router, private partnerService: PartnerService) {
    this.partnerService.findServicesByCategory(GESTAO_NEGOCIO_CATEGORY_ID).subscribe(
      (dto) => {
        this.categoryViewDTO = dto;
        this.beneficiosContabil = this.categoryViewDTO.services;
        this.parceiros = this.categoryViewDTO.partners;
        if (this.parceiros) {
          this.parceiros.forEach(item => {
            item.descriptionAux = this.sanitizePartnerDescription(item.description);
            item.services = item.services.filter(filtered => filtered.categoryId === GESTAO_NEGOCIO_CATEGORY_ID);
          });
        }
        setTimeout(() => {
          this.createSlick();
          this.positionToScroll = $('.beneficios').offset().top - $('.banner').offset().top;
        }, 500);
      }
    );
    // this.beneficiosContabil = [
    //   {
    //     id: 0,
    //     name: "ERP",
    //     description: "Plataforma gratuita e on-line de gestão e vendas.",
    //     btn: "Acessar",
    //     title: "ERP – Enterprise Resource Planning – é um software com sistema de gestão que permite acesso rápido e integrado aos dados da empresa e ajuda em medidas para redução de custos e aumento da produção."
    //   },
    //   {
    //     id: 1,
    //     name: "Loja virtual",
    //     description:
    //       "Venda seus produtos pela internet e garanta a conveniência que o cliente quer.",
    //     btn: "Acessar",
    //     title: ""
    //   },
    //   {
    //     id: 2,
    //     name: "PDV",
    //     description:
    //       "Automação no controle de estoque, emissão de nota fiscal eletrônica e muito mais.",
    //     btn: "Acessar",
    //     title: "PDV – Ponto de Venda – sistema que reúne em um só lugar todas as funções que os estabelecimentos precisam, como: controle de estoque, fluxo de caixa etc.   "
    //   }
    // ];
  }

  ngOnInit() { }
  handleNoScroll(): void {
    const body = document.querySelector("body")
    body.removeAttribute("style")
  }
  createSlick() {
    $(function () {
      $(".regular2").slick({
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

      $(".regular2", document).slick("resize");
    });
  }

  params(tipo) {
    this.router.navigate(['/conecte-se'], { queryParams: { pagina: '', tipo: '', servico: '' } });
    if (tipo == 'todos') {
      this.router.navigate(['/nossos-parceiros']);
    }
  }

  link(partner: PartnerDTO) {
    if (partner.connected) {
      this.handleSubmit(partner);
    } else {
      const data = new ConecteSeComponentData();
      data.categoryId = GESTAO_NEGOCIO_CATEGORY_ID;
      data.partners = this.parceiros;
      this.partnerService.setConecteSeData(data);
      sessionStorage.setItem('paginaConexao', 'gestaoNegocio');
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

}
