import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: "app-webview",
  templateUrl: "./webview.component.html",
  styleUrls: ["./webview.component.scss"]
})

export class WebviewComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private partnerService: PartnerService) { }
  pagina: string;
  urlPartner: any;
  show = "";

  ngOnInit() {
    let tempUrl = sessionStorage.getItem('tempUrl');
    this.route.queryParams.subscribe((queryParams: any) => {
      this.pagina = queryParams["pagina"];
      const sub = this.partnerService.getUrllPartnerNavigate().subscribe(
        (url) => {
          
          if (url) {
            sessionStorage.setItem('tempUrl', url);
            if (sub) { sub.unsubscribe(); }
            this.urlPartner = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          } else {
            if (sub) { sub.unsubscribe(); }
            this.urlPartner = this.sanitizer.bypassSecurityTrustResourceUrl(tempUrl);
          }
        }
      );

      if (this.pagina === "error") {
        this.show = "error";
      }
    });
  }

  ngOnDestroy() {
    // component destroyed
    this.partnerService.setUrllPartnerNavigate(null, null, null);
  }

  goBack() {
    this.location.back();
  }
}
