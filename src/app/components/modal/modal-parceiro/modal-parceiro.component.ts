import { Component, OnInit, Input } from "@angular/core";
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: "modal-grande",
  styleUrls: ["./modal-parceiro.component.scss"],
  //   O template recebe todo conteúdo HTML da página a ser componentizada e a tag ng-content recebe o conteúdo dinâmico das páginas filho
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div
            [id]="idModal"
            class="modal modal-grande fade "
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- CLOSE -->
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <img (click)="hideBackdrop()" id="close_btn" src="assets/images/svg/icon-close.svg" alt="" tabindex="0">
                  </button>
                </div>
                <ng-content></ng-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalParceiroComponent implements OnInit {
  // @Input() myModal transmite de uma página a outra o valor dinâmico do ID
  @Input("IDModal") idModal: string;
  @Input("afterCloseAction") afterCloseAction: string;
  constructor() { }

  ngOnInit() {
    //  $('.modal').modal('show')
  }
  
  hideBackdrop() {
    $(".modal-backdrop").toggle();
  }
}
