import { TestBed } from '@angular/core/testing';

import { SyncStorageClientService } from './client.service';

describe('ClientService', () => {
  let service: SyncStorageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncStorageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
