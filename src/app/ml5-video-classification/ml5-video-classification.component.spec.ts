import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ml5VideoClassificationComponent } from './ml5-video-classification.component';

describe('Ml5VideoClassificationComponent', () => {
  let component: Ml5VideoClassificationComponent;
  let fixture: ComponentFixture<Ml5VideoClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ml5VideoClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ml5VideoClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
