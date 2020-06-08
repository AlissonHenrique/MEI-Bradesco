import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightCanvasComponent } from './highlight-canvas.component';

describe('HighlightCanvasComponent', () => {
  let component: HighlightCanvasComponent;
  let fixture: ComponentFixture<HighlightCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
