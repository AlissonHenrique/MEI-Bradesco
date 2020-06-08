import { Component, OnInit } from "@angular/core";
import { NotificationsDTO } from "src/app/dto/notifications-dto";
import { CustomerService } from "src/app/services/customer.service";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from '@angular/router';
import { PartnerDTO } from 'src/app/dto/partner-dto';
import { PartnerService } from 'src/app/services/partner.service';
declare var $: any;

@Component({
  selector: "app-notificacoes",
  templateUrl: "./notificacoes.component.html",
  styleUrls: ["./notificacoes.component.scss"]
})
export class NotificacoesComponent implements OnInit {
  page = 0; // Página atual
  totalElemets = 3; // quantidade de notificações não lidas
  pageFinally = false; // Quandidade de total notificações lidas e não lidas.
  pageSize = 3; // qtd de itens por pagina.
  listNotifications: NotificationsDTO[] = [];


  showMore() {
    this.showNotifications(true);
  }

  constructor(
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private router: Router,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
    this.showNotifications(false);
  }

  showNotifications(showMessage: boolean) {
    this.customerService
      .getNotifications(this.page, this.pageSize)
      .subscribe(response => {
        if(response.content.length == 3){
          $('.notificacoes-footer').show();
        } else {
          $('.notificacoes-footer').hide();
          this.pageFinally = true;
        }
        if (
          response.content.length === 0
        ) {
          this.pageFinally = true;
        }
        this.fillNotifications(
          response.content,
          response.totalElements,
          this.page === 0 ? true : false,
          showMessage
        );
        this.page++;
      });
  }

  fillNotifications(
    customersList: Array<NotificationsDTO>,
    totalElements: number,
    overwrite: boolean,
    showMessage: boolean
  ) {
    if (overwrite) {
      this.listNotifications = customersList;
    } else {
      for (let i = 0; i < customersList.length; i++) {
        this.listNotifications.push(customersList[i]);
      }
    }
    this.totalElemets = totalElements;
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

  validConection(itemNotification: NotificationsDTO) {
    setTimeout(() => {
      // se não lido a notificação
      if (itemNotification.status === 0) {
        this.setReadStatus(itemNotification);
      }

      this.customerService.getPartner(itemNotification.metadata.partnerId).subscribe(
        (partnerDto) => {
          // se aceito os termos
          if (partnerDto.connected) {
            this.partnerService.setUrllPartnerNavigate(partnerDto.agreementId, partnerDto.id, null);
          } else {
            sessionStorage.setItem('paginaConexao', 'notificacoes');
            this.router.navigate(['/nossos-parceiros-form'], { queryParams: { partnerId: itemNotification.metadata.partnerId } });
          }
        }
      );
    }, 1500);
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
