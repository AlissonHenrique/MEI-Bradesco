import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import smoothscroll from 'smoothscroll-polyfill';
declare var $: any;

@Component({
  selector: 'service-banner',
  templateUrl: './service-banner.component.html',
  styleUrls: ['./service-banner.component.scss']
})
export class ServiceBannerComponent implements OnInit {
  @Input("bannerTitle") nBanner: string;
  @Input("subTitle") nSubTitle: string;
  @Input("subTitle2") nSubTitle2: string;
  @Input("buttonTitle") nBtn: string;
  @Input("buttonId") btnId: string = "btn-banner";
  @Input("imageBanner") nImage: string;
  @Input("btnRoute") btnRoute: string;
  @Input("queryParams") queryParams: string;
  @Input("isAnchor") isAnchor = false;
  @Input("anchorPosition") anchorPosition = 0;

  anchorTag: string;

  constructor(private router: Router) {
    smoothscroll.polyfill();
  }

  // txt = '<b>shkjadghkjsagdk</b>';

  ngOnInit() { }

  scrollToAnchor() {
    $('html, body').animate({scrollTop: this.anchorPosition }, 500);
  }
}
