import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalSmallComponent } from './components/modal/modal-small/modal-small.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalParceiroComponent } from './components/modal/modal-parceiro/modal-parceiro.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { UtilsService } from './services/utils.service';
import { DatePipe } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        LoadingComponent,
        ErrorComponent,
        ModalSmallComponent,
        ButtonComponent,
        ModalParceiroComponent
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        CustomerService,
        UtilsService,
        DatePipe,
        DeviceDetectorService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'bradesco-mei-logado'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('bradesco-mei-logado');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to bradesco-mei-logado!');
  // });
});
