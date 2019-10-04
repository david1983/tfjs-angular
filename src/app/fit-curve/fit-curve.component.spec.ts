import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitCurveComponent } from './fit-curve.component';

describe('FitCurveComponent', () => {
  let component: FitCurveComponent;
  let fixture: ComponentFixture<FitCurveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitCurveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
