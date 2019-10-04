import { TestBed } from '@angular/core/testing';

import { ImageClassifierService } from './image-classifier.service';

describe('ImageClassifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageClassifierService = TestBed.get(ImageClassifierService);
    expect(service).toBeTruthy();
  });
});
