import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent implements OnInit {
  @Input("nomeUsuario") nUsuario: string;
  @Input("nomeEmpresa") nEmpresa: string;
  @Input("nomeText") nText: string;

  @Input("pageTitle") nPageTitle: string;
  @Input("pageDescription") nPageDescription: string;
  
  constructor(public router: Router) {}

  ngOnInit() {

  }
}
