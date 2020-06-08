import { Component, OnInit, HostListener } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { NotificationsDTO } from "src/app/dto/notifications-dto";
import { Router } from '@angular/router';
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { PartnerService } from 'src/app/services/partner.service';
declare var $: any;

@Component({
  selector: "app-header-notificacoes",
  templateUrl: "./header-notificacoes.component.html",
  styleUrls: ["./header-notificacoes.component.scss"]
})
export class HeaderNotificacoesComponent implements OnInit {
  totalElemets: number;
  listNotifications: NotificationsDTO[] = [];
  pageSize = 3;

  constructor(private customerService: CustomerService,
              private router: Router,
              private partnerService: PartnerService) { }

  ngOnInit() {
    if (window.innerHeight < 568) {
      this.pageSize = 2;
    }
    $(".close-notifi").click(function () {
      $(".dropdown").removeClass("open");
    });
    this.showNotifications();
  }

  ngAfterViewInit() {
    if (window.innerHeight < 568) {
      this.pageSize = 2;
      $(".content-notification").addClass("small");
      $(".title-notification").addClass("small");
      $(".bg-header-notificacoes").addClass("small");
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerHeight < 414) {
      this.pageSize = 2;
      $(".content-notification").addClass("small");
      $(".title-notification").addClass("small");
      $(".bg-header-notificacoes").addClass("small");
    } else {
      this.pageSize = 3;
      $(".content-notification").removeClass("small");
      $(".title-notification").removeClass("small");
      $(".bg-header-notificacoes").removeClass("small");
    }
  }

  showNotifications() {
    // this.qtdshow = 10;
    // this.customerService.getNotifications(this.page, this.pageSize).subscribe((response) => {
    //     if (response.content.length === 0) {
    //         // this.notificationService.info(HomeConstants.listNotificationsEmpty);
    //     }

    //     this.fillNotifications(response.content, response.totalElements, (this.page === 0 ? true : false));
    //     this.page++;
    // });
    this.customerService.getInitialNotifications().subscribe(response => {
      if (response) {
        this.listNotifications = response.content;
        this.totalElemets = response.totalElements;
      }
    });
  }

  validConection(itemNotification: NotificationsDTO) {
    setTimeout(() => {
      // se não lido a notificação
      if (itemNotification.status === 0) {
        this.setReadStatus(itemNotification);
      }

      this.customerService.getPartner(itemNotification.metadata.partnerId).subscribe(
        async (partnerDto) => {
          // se aceito os termos
          if (partnerDto.connected) {
            this.partnerService.setUrllPartnerNavigate(partnerDto.agreementId, partnerDto.id, null);
          } else {
            sessionStorage.setItem('paginaConexao', 'notificacoes');
            await this.router.navigate(['/notificacoes']);
            // Navega primeiro para a tela de notificacoes.
            // Assim, caso o usuario utilizar o botao 'voltar' na tela 'nossos-parceiros-form', ele é redirecionado para essa tela.
            this.router.navigate(['/nossos-parceiros-form'], { queryParams: { partnerId: itemNotification.metadata.partnerId } });
          }
        }
      );
    }, 1000);
  }

  setReadStatus(itemNotification: any) {
    this.customerService.setNotificationsRead(itemNotification.id).subscribe(() => {

      this.customerService.getNotifications(this.customerService.page, this.customerService.pageSize).subscribe(
        (response) => {
          this.customerService.setInitialNotifications(response);
        }
      );
    });
  }

}
