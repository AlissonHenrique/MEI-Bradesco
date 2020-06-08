import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { CustomerPlataformTermDTO } from './dto/customer-plataform-term-dto';
import { environment } from 'src/environments/environment';
import { PDF_VIEWER_PATH } from './utils/constants.enum';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { TermViewType } from './enums/term-view-type';
import { PartnerTermType } from './enums/partner-term-type';
import { UtilsService } from './services/utils.service';
import { CustomerAgreementTermDTO } from './dto/customer-agreement-term-dto';
import { PlataformTermType } from './enums/plataform-term-type';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  defaultMessageTermsChanged = "defaultMessageTermsChanged";
  pendingCustomerTerms: Array<CustomerPlataformTermDTO>;
  showTerm: Boolean = false;
  customerAgreementTermDTO: CustomerAgreementTermDTO = new CustomerAgreementTermDTO();
  downloadUrl = '';
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit(): void {
    $('.modal-logout').find('.close').css('display','none');
    $('#modalError').find('.close').css('display','block');
    
    // consulta inicial dos dados do usuário e outras informações
    this.customerService.loadCustomerInformation().subscribe();
    this.verifyTermsAccepted();
    

    

    const subscriberStatus = this.customerService.getCustomerStatus().subscribe(
      (isTempPassword) => {
        if (isTempPassword) {
          setTimeout(() => {
            this.router.navigate(['perfil']);
          }, 400);
          subscriberStatus.unsubscribe();
        }
      }
    );
  }

  verifyTermsAccepted(){
    const subscriberTerms = this.customerService.getPendingCustomerTerms().subscribe(
      (pendingTerms) => {
        if (pendingTerms && pendingTerms.length > 1) {
          $('#defaultMessageTermsChanged').modal(
            {
              keyboard: false,
              backdrop: 'static'
            }
          );
          $('#defaultMessageTermsChanged').modal('show');
          this.pendingCustomerTerms = pendingTerms;

          if(this.showTerm == true){
              this.pendingCustomerTerms.reverse().forEach(term => {
              this.displayDialog(term);
            });
          }
          
        } else if (pendingTerms && pendingTerms.length == 1) {
            this.pendingCustomerTerms = pendingTerms;
            this.pendingCustomerTerms.reverse().forEach(term => {
            this.displayDialog(term);
          });
          subscriberTerms.unsubscribe();
         
        } else {
          
          setTimeout(() => {
            $('#backendErrorMessage').find('.close').css('display','block');
            $('#backendErrorMessage').modal(
              {
                show: false,
                keyboard: false,
                backdrop: 'static'
              }
            );
            $('#backendErrorMessage').find('.close').click(() => {
              this.customerService.exitApplication();
            });
          }, 250); 
        }
      }
    );
  }

  showTerms(){
      this.showTerm = true;
      this.verifyTermsAccepted();
      $('#defaultMessageTermsChanged').modal('hide');
  }

  displayDialog(term: CustomerPlataformTermDTO) {
    const termUrl = environment.apiUrl + PDF_VIEWER_PATH + term.termType;
    setTimeout(() => {
      $('#iframeTerm' + term.id).attr('src', termUrl);
      $('#termoPendente' + term.id).find('.close').css('display','none');
    }, 250);


    setTimeout(() => {
      $('#termoPendente' + term.id).modal(
        {
          show: true,
          keyboard: false,
          backdrop: 'static'
        }
      );
    }, 500);
  }

  acceptTerm(id: number) {

    this.customerService.acceptCustomerPlataformTerm(id).subscribe(
      () => {
        $('#termoPendente' + id).modal('hide');
        $('.modal-grande').css('overflow', 'auto');
        $('#defaultMessageTermsChanged').modal('hide');
      }
    );
  }

  declineAccept(termType: number) {
    $('#defaultMessageTermAdesao').modal(
      {
        backdrop: 'static'
      }
    );
    if(termType == 1){
      $('#defaultMessageTermAdesao').find('#text')
      .text('O aceite do Termo de Adesão é um processo obrigatório. Você será direcionado para a área institucional. Quer continuar assim mesmo?');
    }else{
      $('#defaultMessageTermAdesao').find('#text')
      .text('O aceite da “Política de Privacidade” é um processo obrigatório. Você será direcionado para a área institucional. Quer continuar assim mesmo?');
    }
    $('#defaultMessageTermAdesao').modal('show');
    $('#defaultMessageTermAdesao').css('z-index','1051');
  }

  closeModal(){
    $('#defaultMessageTermAdesao').css('z-index','1049');
    $('.modal-grande').css('overflow', 'auto');
    
  }

  exitApp(){
    this.customerService.exitApplication();
  }

  downloadTerms(typeTerm){
    if(typeTerm == 1){
      PlataformTermType.ADHESION_TERM;
    }else{
      PlataformTermType.PRIVACY_TERM;
    }
    this.downloadUrl = this.utilsService.getUrlTermsPlataform(typeTerm);
  }

 

}
