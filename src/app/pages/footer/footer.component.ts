import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.seta();
  }
  seta() {
    $(".click-footer").click(function() {
      $(".btn-footer").toggleClass("rotated");
      $(".info-footer-2").slideToggle(800);
    });
  }
}
