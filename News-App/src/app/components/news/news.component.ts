import { Component, PipeTransform } from '@angular/core';
import { Newsservice } from 'src/app/services/news.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  news: any[] = [];
  filteredNews: any[] = [];
  selectedCategory: string='';

  constructor(private newsService: Newsservice, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
      const selectedCountry = this.categoryService.getSelectedCountry();
      this.fetchNews(category, selectedCountry);
    });

    this.categoryService.selectedCountry$.subscribe(country => {
      const selectedCategory = this.categoryService.getSelectedCategory();
      this.fetchNews(selectedCategory, country);
    });

    this.categoryService.searchQuery$.subscribe(query => {
      console.log(query);
      this.filterNews(query);
    });
  }

  fetchNews(category: string, country: string) {
    this.newsService.fetchNews(category, country).subscribe(
      (data: any) => {
        this.news = data.articles;
        this.filterNews();
      },
      (error: any) => {
        console.error('Error fetching news:', error);
      }
    );
  }

  
  filterNews(query: string = '') {
    console.log('Filtering news with query:', query);
    const lowerCaseQuery = query.toLowerCase();
    this.filteredNews = this.news.filter(article => {
      console.log('Processing article:', article);
      if (article) {
        console.log('Article is not null. Processing properties:', Object.values(article));
        const articleProperties = Object.values(article).map(property => {
          return String(property).toLowerCase();
        });
        return articleProperties.some(property => property.includes(lowerCaseQuery));
      }
      return false;
    });
  }
  
  openArticle(url: string): void {
    window.open(url, '_blank');
  }
  getCategoryDisplayName(): string {
    switch (this.selectedCategory) {
      case 'health':
        return 'Health News';
      case 'sports':
        return 'Sports News';
      case 'business':
        return 'Business News';
      case 'entertainment':
        return 'Entertainment News';
      case 'science':
        return 'Science News';
      case 'technology':
        return 'Technology News';
      default:
        return 'General News';
    }
  }
}