import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewComponent } from './webview.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PartnerService } from 'src/app/services/partner.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderNotificacoesComponent } from 'src/app/pages/header-notificacoes/header-notificacoes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';

describe('WebviewComponent', () => {
  let component: WebviewComponent;
  let fixture: ComponentFixture<WebviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewComponent,
        HeaderComponent,
        FooterComponent,
        HeaderNotificacoesComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          FormBuilder,
          HttpClient,
          HttpHandler,
          PartnerService,
          DatePipe,
          DeviceDetectorService
        ],
        imports: [
          RouterTestingModule.withRoutes([]),
          BrowserModule,
          FormsModule
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
