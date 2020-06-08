import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
declare let $: any;

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class ErrorComponent implements OnInit {
  @Input("errTitle") errTitle: string;
  @Input("errText1") errText1: string;
  @Input("errText2") errText2: string;
  @Input("errId") id: string;
  @Input("afterCloseAction") afterCloseAction: string;

  constructor() {}

  ngOnInit() {}

  closeDialog() {
    if ("logout" === this.afterCloseAction) {
      window.location.href = environment.appUrl;
    }
  }
}
