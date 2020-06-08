import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConecteSeComponent } from './conecte-se.component';

describe('ConecteSeComponent', () => {
  let component: ConecteSeComponent;
  let fixture: ComponentFixture<ConecteSeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConecteSeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConecteSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
