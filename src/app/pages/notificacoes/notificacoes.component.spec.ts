
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacoesComponent } from './notificacoes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import 'jquery-mask-plugin';
import 'slick-carousel';
import { HighlightCanvasComponent } from 'src/app/highlight/highlight-canvas/highlight-canvas.component';
import { HighlightSvgComponent } from 'src/app/components/highlight-svg/highlight-svg.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TooltipComponent } from 'src/app/components/tooltip/tooltip.component';
import { ModalParceiroContentComponent } from 'src/app/components/modal/modal-parceiro-content/modal-parceiro-content.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatSnackBarModule } from '@angular/material';
import { HeaderNotificacoesComponent } from '../header-notificacoes/header-notificacoes.component';
import { FooterComponent } from '../footer/footer.component';
import { PartnerService } from 'src/app/services/partner.service';

describe('NotificacoesComponent', () => {
  let component: NotificacoesComponent;
  let fixture: ComponentFixture<NotificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacoesComponent
        , ButtonComponent,
        HeaderNotificacoesComponent, FooterComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes([]), BrowserAnimationsModule, MatSnackBarModule
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        CustomerService,
        NotificationService,
        PartnerService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
