import { TestBed } from '@angular/core/testing';

import { SingletonService } from './singleton.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SingletonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SingletonService = TestBed.get(SingletonService);
    expect(service).toBeTruthy();
  });
});
