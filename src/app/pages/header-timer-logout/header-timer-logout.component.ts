import { Component, OnInit, HostListener } from "@angular/core";
import { ApplicationStateService } from "../../services/application-state.service";
import { LogoutTimerService } from "../../services/logout-timer.service";

declare var $: any;

@Component({
  selector: "app-header-timer-logout",
  templateUrl: "./header-timer-logout.component.html",
  styleUrls: ["./header-timer-logout.component.scss"]
})
export class HeaderTimerLogoutComponent implements OnInit {
  public tempoTotal: number = 600; //Tempo para o logout em segundos
  public tempo: number;
  public medida: string;
  public timer: any;
  public modalLogout = "modalLogout";
  public isMobileResolution: boolean;
  //public logoutTimer:LogoutTimerService;

  constructor(
    private applicationStateService: ApplicationStateService,
    private logoutTimer: LogoutTimerService
  ) {
    this.isMobileResolution = applicationStateService.getIsMobileResolution();
  }

  ngOnInit() {
    if (!this.logoutTimer.isRunning) {
      this.logoutTimer.tempoTotal = this.tempoTotal;
      this.logoutTimer.tempoAtual = 0;
    }
    this.startTimer();
  }

  ngAfterViewInit() {
    this.startTimerAnimation();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  startTimer() {
    this.logoutTimer.start();
    var minutes = Math.floor(
      (this.logoutTimer.tempoTotal - this.logoutTimer.tempoAtual) / 60
    );

    if (minutes > 0) {
      this.tempo = minutes;
      this.medida = "MIN";
    } else {
      this.tempo = this.logoutTimer.tempoTotal - this.logoutTimer.tempoAtual;
      this.medida = "SEG";
    }

    this.startTimerAnimation();

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);

    //console.log( this.timer );
  }

  startTimerAnimation() {
    $("#timer").css("animationDuration", this.logoutTimer.tempoTotal + "s");
    $("#timer").css("animationDelay", "-" + this.logoutTimer.tempoAtual + "s");
    $("#timer").addClass("start");
  }

  updateTimer() {
    if (this.logoutTimer.tempoAtual == this.logoutTimer.tempoTotal) {
      //this.logout();
    } else {
      this.logoutTimer.tempoAtual++;

      var minutes = Math.floor(
        (this.logoutTimer.tempoTotal - this.logoutTimer.tempoAtual) / 60
      );

      if (minutes > 0) {
        this.tempo = minutes;
        this.medida = "MIN";
      } else {
        this.tempo = this.logoutTimer.tempoTotal - this.logoutTimer.tempoAtual;
        this.medida = "SEG";
      }
    }
  }

  resetTimer() {
    var el = $("#iconTimer");
    var newel = el.clone(true);
    el.before(newel);
    $("." + el.attr("class") + ":last").remove();

    this.startTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
    this.logoutTimer.tempoAtual = 0;
    this.logoutTimer.stop();
  }

  logout() {
    this.stopTimer();

    $("#modalLogout").modal("toggle");

    if (
      $("body")
        .children()
        .eq(8)
        .hasClass("modal-backdrop fade in")
    ) {
      document.body.children[8].classList.add("dsp-none");
    }
  }

  renovarTempo() {
    this.resetTimer();
    $("#modalLogout").modal("hide");
  }

  sair() {
    $("#modalLogout").modal("hide");
    console.log("sair");
  }
}
