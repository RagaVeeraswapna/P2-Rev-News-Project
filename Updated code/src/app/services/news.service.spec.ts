import { TestBed } from '@angular/core/testing';
import { Newsservice } from './news.service';

describe('NewsService', () => {
  let service: Newsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Newsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
