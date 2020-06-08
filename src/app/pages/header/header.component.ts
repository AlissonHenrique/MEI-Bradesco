import { Component, OnInit, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../services/application-state.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { CHAT_URL } from 'src/app/utils/constants.enum';
import { UtilsService } from 'src/app/services/utils.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public isMobileResolution: boolean;
  subscription: Subscription;
  count = 0;
  customerName = '';
  companyTradeName = '';
  block:boolean = false;

  constructor(private applicationStateService: ApplicationStateService, private router: Router,
              private customerService: CustomerService, private util: UtilsService) {
    this.isMobileResolution = applicationStateService.getIsMobileResolution();
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      $("body").css("overflow", "visible");
      if (window.innerWidth < 768) {
        this.isMobileResolution = true;
      }
    });
  }

  //#region LIFECYCLE METHODS
  ngOnInit() {
    this.customerService.getCustomerStatus().subscribe(
      (value) => {
        this.block = value;
      });
    this.customerService.getCustomerName().subscribe(
      (name) => {
        this.customerName = name;
      }
    );
    this.customerService.getCompanyTradeName().subscribe(
      (companyName) => {
        this.companyTradeName = companyName;
      }
    );
    this.customerService.getCustomerDTO().subscribe(
      (dto) => {
        if (!dto) { return; }
        const chatUrl = this.util.formatString(CHAT_URL,
          [dto.name, dto.email, this.util.onlyNumbers(dto.cpf), this.util.onlyNumbers(dto.phoneNumber)]);
        setTimeout(() => {
            $('#abrirChat').click(function () {
              const left = ($(window).width() - 465) / 2;
              const top = ($(window).height() - 610) / 2;
              window.open(
                chatUrl,
                'ChatOnline',
                'scrollbars=no, width=465, height=610, left=' + left + ', top=' + top
              );
            });
          }, 800);
      }
    );
    setTimeout(function () {
      $("#bt-mobile-menu").on('click touch', function () {
        if ($("body").css("overflow") != "hidden") {
          $("body").css("overflow", "hidden");
        } else {
          $("body").css("overflow", "visible");
        }

      });
    }, 800);

    // ANIMAÇÃO DO BOTAO
  }
  ngAfterViewInit() {
    if (this.router.url == "/") {
      $("#homeMobile").addClass("active-link");
      $("#homeDesk").addClass("active-link");
    } else {
      $("#homeMobile").removeClass("active-link");
      $("#homeDesk").removeClass("active-link");
    }
    $("#seta1").click(function() {
      $("#caret").toggleClass("rotate");
    });
    $("#seta2").click(function() {
      $(".setcaret").toggleClass("rotate");
    });
  }

  routerLinkLogo(){
    if(!this.block){
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) { }
    this.subscription.unsubscribe();
  }
  //#endregion

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 768) {
      if (!this.isMobileResolution) {
        this.isMobileResolution = true;
        setTimeout(function () {
          $("#bt-mobile-menu").on('click touch', function () {
            if ($("body").css("overflow") != "hidden") {
              $("body").css("overflow", "hidden");
            } else {
              $("body").css("overflow", "visible");
            }
          });
        }, 800);

      }
    } else {
      if (this.isMobileResolution) {
        this.isMobileResolution = false;
        $("body").css("overflow", "visible");
      }
    }
  }

  sair() {
    this.customerService.exitApplication();
  }

}
