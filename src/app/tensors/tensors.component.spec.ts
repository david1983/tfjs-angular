import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TensorsComponent } from './tensors.component';

describe('TensorsComponent', () => {
  let component: TensorsComponent;
  let fixture: ComponentFixture<TensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
