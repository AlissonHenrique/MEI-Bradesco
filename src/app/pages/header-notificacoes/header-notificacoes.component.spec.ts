import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderNotificacoesComponent } from './header-notificacoes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBarModule, MatInputModule } from '@angular/material';
import { FooterComponent } from '../footer/footer.component';
import { RestService } from 'src/app/services/rest.service';

describe('HeaderNotificacoesComponent', () => {
  let component: HeaderNotificacoesComponent;
  let fixture: ComponentFixture<HeaderNotificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNotificacoesComponent,
        ButtonComponent,
        FooterComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes([]), BrowserAnimationsModule, MatSnackBarModule, MatInputModule
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        CustomerService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNotificacoesComponent);
    component = fixture.componentInstance;
    component.listNotifications = [{
      id: 1,
      title: 'Titulo',
      message: 'Menssagem',
      creation: new Date(),
      status: 1,
      metadata: new Object(),
      type: 1
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
