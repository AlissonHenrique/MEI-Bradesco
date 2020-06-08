import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightSvgComponent } from './highlight-svg.component';

describe('HighlightSvgComponent', () => {
  let component: HighlightSvgComponent;
  let fixture: ComponentFixture<HighlightSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
