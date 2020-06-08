import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldDateComponent } from './field-date.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import 'jquery-mask-plugin';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

describe('FieldDateComponent', () => {
  let component: FieldDateComponent;
  let fixture: ComponentFixture<FieldDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldDateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes([]), BrowserAnimationsModule,
        MatDatepickerModule, MatNativeDateModule, MatMomentDateModule
      ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
