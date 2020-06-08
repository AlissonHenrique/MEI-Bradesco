import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// MATERIAL MODULES
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";

// PÁGINAS
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderNotificacoesComponent } from "./pages/header-notificacoes/header-notificacoes.component";
import { HeaderTimerLogoutComponent } from "./pages/header-timer-logout/header-timer-logout.component";
import { NossosParceirosComponent } from "./pages/nossos-parceiros/nossos-parceiros.component";
import { ConecteSeComponent } from "./pages/conecte-se/conecte-se.component";
import { FaqComponent } from "./pages/FAQ/faq.component";
import { NotificacoesComponent } from "./pages/notificacoes/notificacoes.component";
import { ContabilComponent } from "./pages/services-pages/contabil/contabil.component";
import { GestaoNegocioComponent } from "./pages/services-pages/gestao-negocio/gestao-negocio.component";
import { FormalizacaoComponent } from "./pages/services-pages/formalizacao/formalizacao.component";
import { NossosParceirosTermoComponent } from "./pages/nossos-parceiros-termo/nossos-parceiros-termo.component";
import { NossosParceirosFormComponent } from "./pages/nossos-parceiros-form/nossos-parceiros-form.component";
import { EditFormComponent } from "./pages/edit-form/edit-form.component";
import { TermoseDadosComponent } from "./pages/termos-e-dados/termos-e-dados.component";

// COMPONENTES
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { ModalSmallComponent } from "./components/modal/modal-small/modal-small.component";
import { ModalParceiroComponent } from "./components/modal/modal-parceiro/modal-parceiro.component";
import { ModalParceiroContentComponent } from "./components/modal/modal-parceiro-content/modal-parceiro-content.component";
import { FieldEmailComponent } from "./pages/fields/field-email/field-email.component";
import { CardComponent } from "./components/card/card.component";
import { FieldDefaultComponent } from "./pages/fields/field-default/field-default.component";
import { FieldPhoneComponent } from "./pages/fields/field-phone/field-phone.component";
import { FieldCpfComponent } from "./pages/fields/field-cpf/field-cpf.component";
import { FieldCnpjComponent } from "./pages/fields/field-cnpj/field-cnpj.component";
import { FieldDateComponent } from "./pages/fields/field-date/field-date.component";
import { FieldSocialComponent } from "./pages/fields/field-social/field-social.component";
import { CollapseComponent } from "./components/collapse/collapse.component";
import { ServiceBannerComponent } from "./components/service-banner/service-banner.component";
import { FieldComponent } from "./pages/fields/field/field.component";
import { ButtonComponent } from "./components/button/button.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { WebviewComponent } from "./components/webview/webview.component";
import { FieldPasswordComponent } from "./pages/fields/field-password/field-password.component";
import { SelectBoxComponent } from "./components/select-box/select-box.component";
import { SelectBoxComponentV2 } from "./components/select-box-v2/select-box-v2.component";
import { SelectBoxComponentV3 } from './components/select-box-v3/select-box-v3.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { HighlightCanvasComponent } from './highlight/highlight-canvas/highlight-canvas.component';


import { HighlightSvgComponent } from './components/highlight-svg/highlight-svg.component';

import { FieldCepComponent } from './pages/fields/field-cep/field-cep.component';
import { ErrorComponent } from './components/error/error.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

// SERVIÇOS

import { parceiros } from './services/parceiros';
import { gestaoServicos, assessoriaServicos, formalizacaoServicos } from './services/servicos';
import { paises } from './services/form/paises';
import { estadosCidades } from './services/form/estadosCidades';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/rest.service';
import { NotificationService } from './services/notification.service';
import { CustomerService } from './services/customer.service';
import { httpInterceptorProviders } from './services/http-interceptors';
import { registerLocaleData, DatePipe } from '@angular/common';
import { PostalCodeService } from './services/postal-code.service';
import { UtilsService } from './services/utils.service';
import { NgxMaskModule } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
import { FieldNameComponent } from './pages/fields/field-name/field-name.component';
import { SelectBoxAutocompleteComponent } from './components/select-box-autocomplete/select-box-autocomplete.component';
import { MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { WindowRef } from './services/windowRef';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PartnerService } from './services/partner.service';
import { FieldCnhComponent } from './pages/fields/field-cnh/field-cnh.component';
import { PdfPipe } from './utils/pdf.pipe';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
registerLocaleData(ptBr);


export const MY_FORMATS = {

  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserInfoComponent,
    HeaderNotificacoesComponent,
    HeaderTimerLogoutComponent,
    ModalSmallComponent,
    ModalParceiroComponent,
    ModalParceiroContentComponent,
    FieldEmailComponent,
    CardComponent,
    NossosParceirosComponent,
    ConecteSeComponent,
    FieldDefaultComponent,
    FieldPhoneComponent,
    FieldCpfComponent,
    FieldCnpjComponent,
    FieldDateComponent,
    FieldSocialComponent,
    CollapseComponent,
    FaqComponent,
    NotificacoesComponent,
    ServiceBannerComponent,
    ContabilComponent,
    GestaoNegocioComponent,
    FormalizacaoComponent,
    FieldComponent,
    NossosParceirosFormComponent,
    NossosParceirosTermoComponent,
    ButtonComponent,
    LoadingComponent,
    WebviewComponent,
    EditFormComponent,
    FieldPasswordComponent,
    TermoseDadosComponent,
    SelectBoxComponent,
    SelectBoxComponentV2,
    SelectBoxComponentV3,
    TooltipComponent,
    HighlightCanvasComponent,
    HighlightSvgComponent,
    FieldCepComponent,
    ErrorComponent,
    FieldNameComponent,
    SelectBoxAutocompleteComponent,
    FieldCnhComponent,
    PdfPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    PdfViewerModule,
    PdfJsViewerModule,
    DeviceDetectorModule.forRoot(),
    NgxExtendedPdfViewerModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: "PARCEIROS", useValue: parceiros },
    { provide: "PAISES", useValue: paises },
    { provide: "ESTADOS", useValue: estadosCidades },
    { provide: "GESTAOSERVICOS", useValue: gestaoServicos },
    { provide: "ASSESSORIASERVICOS", useValue: assessoriaServicos },
    { provide: "FORMALIZACAOSERVICOS", useValue: formalizacaoServicos },

    { provide: MAT_DATE_LOCALE, useValue: 'pt' }, // you can change useValue

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    WindowRef,
    DatePipe,
    RestService,
    NotificationService,
    CustomerService,
    PartnerService,
    PostalCodeService,
    UtilsService,
    httpInterceptorProviders,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

