import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSocialComponent } from './field-social.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import 'jquery-mask-plugin';


describe('FieldSocialComponent', () => {
  let component: FieldSocialComponent;
  let fixture: ComponentFixture<FieldSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldSocialComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        NgxMaskModule.forRoot(),
        RouterTestingModule.withRoutes([]), BrowserAnimationsModule
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
    fixture = TestBed.createComponent(FieldSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
