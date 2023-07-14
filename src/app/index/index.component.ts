import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Newsservice } from 'src/app/services/news.service';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  news: any[] = [];

  

  constructor(
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    const url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=88a1bb30eec34d83958f297263c3de9b&pageSize=12`;
    this.http.get(url).subscribe((data: any) => {
      this.news = data.articles;

    });
}
}