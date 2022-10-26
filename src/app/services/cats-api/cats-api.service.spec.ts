import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { CatsApiService } from './cats-api.service';

describe('CatsApiServiceService', () => {
  let service: CatsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(CatsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
