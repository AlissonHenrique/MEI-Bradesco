import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-collapse",
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"]
})
export class CollapseComponent implements OnInit {
  @Input("title") title: string;
  @Input("text") textDescription: string;
  @Input("idCollapse") idCollapse: string;
  @Input("valor") jqValor: string;
  constructor() { }

  ngOnInit() {
    $(".panel-title > a").click(function () {
      if ($(this).attr("aria-expanded") === "false") {
        $(this).find(".img-less").show();
        $(this).find(".img-more").hide();
        $(this).parent().parent().addClass("box-title-azul");

      } else {
        $(this).find(".img-more").show();
        $(this).find(".img-less").hide();

        $(this).parent().parent().removeClass("box-title-azul");
      }
    });
  }

}
