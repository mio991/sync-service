import { TestBed } from '@angular/core/testing';

import { SettingsLoaderService } from './settings-loader.service';

describe('SettingsLoaderService', () => {
  let service: SettingsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
