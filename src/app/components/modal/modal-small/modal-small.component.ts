import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'modal-pequeno',
  styleUrls: ['./modal-small.component.scss',],
  //  O template recebe todo conteúdo HTML da página a ser componentizada e a tag ng-content recebe o conteúdo dinâmico das páginas filho
  template:
    `
       <div [id]="myModal" class="modal-small modal fade bs-example-modal-md" tabindex="-1" role="dialog">
            <div class="first modal-dialog modal-md" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18.388" height="18.385" viewBox="0 0 18.388 18.385">
                    <g id="Grupo_5492" data-name="Grupo 5492" transform="translate(1729.585 25426.852) rotate(45)">
                      <line id="Linha_67" data-name="Linha 67" x2="24" transform="translate(-19201.5 -16756.498)" fill="none" stroke="#3b69ff" stroke-width="2" />
                      <line id="Linha_68" data-name="Linha 68" y2="24" transform="translate(-19189.498 -16768.5)" fill="none" stroke="#3b69ff" stroke-width="2" />
                    </g>
                  </svg>
                </button>
              </div>  
             <ng-content></ng-content>
          </div>
       </div>
    </div>
     `,
})
export class ModalSmallComponent implements OnInit {
  // @Input() myModal transmite de uma página a outra o valor dinâmico do ID
  @Input() myModal: string = 'modal';
  constructor() { }

  ngOnInit() {
 
  }

}


