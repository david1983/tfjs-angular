import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ml5ImageClassificationComponent } from './ml5-image-classification.component';

describe('Ml5ImageClassificationComponent', () => {
  let component: Ml5ImageClassificationComponent;
  let fixture: ComponentFixture<Ml5ImageClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ml5ImageClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ml5ImageClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
