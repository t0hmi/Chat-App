import { TestBed } from '@angular/core/testing';

import { UrlResolverService } from './url-resolver.service';

describe('UrlResolverService', () => {
  let service: UrlResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
