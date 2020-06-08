import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NossosParceirosComponent } from './nossos-parceiros.component';
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
import { ServiceBannerComponent } from 'src/app/components/service-banner/service-banner.component';
import { TooltipComponent } from 'src/app/components/tooltip/tooltip.component';
import { ModalParceiroContentComponent } from 'src/app/components/modal/modal-parceiro-content/modal-parceiro-content.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { parceiros } from 'src/app/services/parceiros';
import { HeaderComponent } from '../header/header.component';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('NossosParceirosComponent', () => {
  let component: NossosParceirosComponent;
  let fixture: ComponentFixture<NossosParceirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NossosParceirosComponent,
        HeaderComponent,
        HighlightCanvasComponent,
        HighlightSvgComponent,
        ButtonComponent,
        TooltipComponent,
        ModalParceiroContentComponent,
        CardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgxMaskModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        {
          provide: 'PARCEIROS', useValue:
            [{}]

        },
        { provide: ServiceBannerComponent, useValue: { } },
        DatePipe,
        DeviceDetectorService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NossosParceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
