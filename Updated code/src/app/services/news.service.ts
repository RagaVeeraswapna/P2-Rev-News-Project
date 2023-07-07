import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Newsservice {
  private readonly NEWSAPI_ENDPOINT = 'https://newsapi.org/v2/top-headlines?';
   private readonly API_KEY = 'd0cd7345ed584f2f90865577ed27c479';
 // private readonly API_KEY = '83de244909ac40ff9d878a9bb23ed4e5';

  constructor(private http: HttpClient) {}
  fetchNews(category: string, country: string) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${this.API_KEY}`;
    return this.http.get(url);
  }

  fetchSavedArticles: EventEmitter<void> = new EventEmitter<void>();
  
}