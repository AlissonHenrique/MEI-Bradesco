import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { PartnerServicesDTO } from "src/app/dto/partner-services-dto";
import { PartnerService } from 'src/app/services/partner.service';
import { PartnerDTO } from 'src/app/dto/partner-dto';
declare var $: any;
@Component({
  selector: "modal-parceiro-content",
  templateUrl: "./modal-parceiro-content.component.html",
  styleUrls: ["./modal-parceiro-content.component.scss"]
})
export class ModalParceiroContentComponent implements OnInit {
  @Input("tSobre") textSobre: string;
  @Input("tContato") textContato: string;
  @Input("urlImg") img: any;
  @Input("tId") id: string;
  @Input("tName") textName: string;
  @Input("tPage") textPage: string;
  @Input("tIdSwitch") idSwitch: string;
  @Input("services") services: PartnerServicesDTO[] = [];
  @Input("isConnected") isConnected: boolean;
  @Input("urlPartner") urlPartner: string;
  @Input("partnerId") partnerId: number;
  @Input("agreementId") agreementId: number;

  btns = document.getElementById("btns");

  constructor(private router: Router, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private partnerService: PartnerService) {}

  ngOnInit() {
    if (this.img) {
      this.img = this.sanitizer.bypassSecurityTrustResourceUrl(this.img);
    }
    if (this.services) {
      this.services.forEach(item => {
        item.categoryIcon = this.sanitizer.bypassSecurityTrustResourceUrl(
          item.categoryIcon
        );
      });
    }
  }

  link() {
    if (this.id && !this.isConnected) {
        this.router.navigate(["/nossos-parceiros-form"], {
          queryParams: { partnerServiceId: null, partnerId: this.id.replace(/\D/g, '') }
        });
    }else {
      this.partnerService.setUrllPartnerNavigate(this.agreementId, this.partnerId, null);
    }
  }
  

  hideBackdrop() {
    $(".modal-backdrop").toggle();
  }
}
