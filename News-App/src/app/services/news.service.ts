import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Newsservice {
  private readonly NEWSAPI_ENDPOINT = 'https://newsapi.org/v2/top-headlines?';
  private readonly API_KEY = 'd0cd7345ed584f2f90865577ed27c479';

  constructor(private http: HttpClient) {}
  fetchNews(category: string, country: string) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${this.API_KEY}`;
    return this.http.get(url);
  }
  
}