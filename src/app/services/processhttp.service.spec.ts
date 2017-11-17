import { TestBed, inject } from '@angular/core/testing';

import { ProcesshttpService } from './processhttp.service';

describe('ProcesshttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesshttpService]
    });
  });

  it('should be created', inject([ProcesshttpService], (service: ProcesshttpService) => {
    expect(service).toBeTruthy();
  }));
});
