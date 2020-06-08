import { Component, OnInit, Inject } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { FaqCategoryDTO } from "src/app/dto/faq-category-dto";
import { FaqDTO } from "src/app/dto/faq-dto";
declare var $: any;
@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"]
})
export class FaqComponent implements OnInit {
  categoryList: Array<FaqCategoryDTO> = new Array<FaqCategoryDTO>();
  emptyResult = null;

  start = 0;
  formalizacaoEnd = 5;
  assessoriaEnd = 5;
  gestaoEnd = 5;
  loremEnd = 5;
  ipsumEnd = 5;

  highlight: number;

  currentCollapse;
  currentCollapseGroup;

  formalizacao: Array<FaqDTO> = [];
  assessoria: Array<FaqDTO> = [];
  gestao: Array<FaqDTO> = [];
  plataforma: Array<FaqDTO> = [];
  conta: Array<FaqDTO> = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.FillFaq("", null);
  }

  ngAfterViewInit() {
    let escopo = this;
    $(".panel-title > a").click(function () {
      if (escopo.currentCollapse != this) {
        escopo.resetCurrentCollapse();
      }

      escopo.currentCollapse = this;
    });
    $(".panel-title").click(function () {
      $(this)
        .find($(".down"))
        .toggleClass("rotate");
    });
    $(".panel-group").click(function () {
      if (
        escopo.currentCollapseGroup != null &&
        escopo.currentCollapseGroup != this
      ) {
        let theCollapse = $(escopo.currentCollapseGroup).find(".collapse");
        $(theCollapse).collapse("hide");
        escopo.resetCurrentCollapse();
      }
      escopo.currentCollapseGroup = this;
    });
  }
  resetCurrentCollapse() {
    if (this.currentCollapse != null) {
      let theCollapse = $(this.currentCollapse)
        .parent()
        .parent()
        .parent()
        .find(".collapse");
      $(this.currentCollapse)
        .parent()
        .parent()
        .removeClass("box-title-azul");
      $(theCollapse).collapse("hide");
      let el_img = $(this.currentCollapse).find("img");
      $(el_img[0]).show();
      $(el_img[1]).hide();
    }
  }

  FillFaq(question: string, faqId: string) {
    this.emptyResult = null;
    this.categoryList = [];
    this.customerService.fillFaq(question, faqId).subscribe(resp => {
      if (resp.length === 0) {
        // this.emptyResult = 'Sua pesquisa \'+question+"\" não foi encontrada nos registros";
        // this.notificationService.info(REGISTER_NOT_FOUND);
      } else {
        this.categoryList = resp;
        $("#li" + this.categoryList[0].id).addClass("active");
        this.highlight = this.categoryList[0].id;
        this.fillformalizacao();
      }
    });
  }

  fillformalizacao() {
    this.categoryList.forEach(category => {
      switch (category.id) {
        case 1: {
          this.formalizacao = category.faqs;
          break;
        }
        case 2: {
          this.assessoria = category.faqs;
          break;
        }
        case 3: {
          this.gestao = category.faqs;
          break;
        }
        case 4: {
          this.plataforma = category.faqs;
          break;
        }
        case 5: {
          this.conta = category.faqs;
          break;
        }
      }
    });
  }
  scrollingElement = document.scrollingElement || $("html");
  scrollSmoothToTop() {
    $(this.scrollingElement).animate(
      {
        scrollTop: 0
      },
      500
    );
  }
}
