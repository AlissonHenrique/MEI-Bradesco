import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTimerLogoutComponent } from './header-timer-logout.component';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { LogoutTimerService } from 'src/app/services/logout-timer.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import './ node_modules / jquery - mask - plugin / dist / jquery.mask.min.js';

describe('HeaderTimerLogoutComponent', () => {
  let component: HeaderTimerLogoutComponent;
  let fixture: ComponentFixture<HeaderTimerLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTimerLogoutComponent],
      providers: [ApplicationStateService, LogoutTimerService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTimerLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
