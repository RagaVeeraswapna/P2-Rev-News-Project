import { TestBed } from '@angular/core/testing';
import { Newsservice } from './news.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NewsService', () => {
  let service: Newsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,HttpHandler],
    });
    service = TestBed.inject(Newsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});