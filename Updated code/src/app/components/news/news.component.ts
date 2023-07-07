import { Users } from './../../users/users/users';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Newsservice } from 'src/app/services/news.service';
import { CategoryService } from 'src/app/services/category.service';
import { GET_USERS } from 'src/app/users/users/gql/users-query';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  filteredNews: any[] = [];
  selectedCategory: string = '';
  currentUser: any;

  constructor(
    private newsService: Newsservice,
    private categoryService: CategoryService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_USERS,
    }).valueChanges.subscribe(({ data }) => {
      const userEmail = sessionStorage.getItem('userEmail');

      if (userEmail) {
        this.currentUser = data.allUsers.find(
          (user: any) => user.email === userEmail
        );
        console.log('Current User:', this.currentUser);
      }
    });

    this.categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
      const selectedCountry = this.categoryService.getSelectedCountry();
      this.fetchNews(category, selectedCountry);
    });

    this.categoryService.selectedCountry$.subscribe((country) => {
      console.log(country);
      const selectedCategory = this.categoryService.getSelectedCategory();
      this.fetchNews(selectedCategory, country);
    });

    this.categoryService.searchQuery$.subscribe((query) => {
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
    this.filteredNews = this.news.filter((article) => {
      if (article) {
        const articleProperties = Object.values(article).map((property) => {
          return String(property).toLowerCase();
        });
        return articleProperties.some((property) =>
          property.includes(lowerCaseQuery)
        );
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
  saveArticle(article: any) {
    const userEmail = sessionStorage.getItem('userEmail');
  
    fetch('http://localhost:3030/users')
      .then((response) => response.json())
      .then((users) => {
        console.log('Fetched data:', users);
        const user = users.find((user: any) => user.email === userEmail);
        console.log('User:', user);
  
        if (user) {
          if (!user.savedArticles) {
            user.savedArticles = [];
          }
          user.savedArticles.push(article);
          fetch(`http://localhost:3030/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
            .then((response) => response.json())
            .then((updatedData) => {
              console.log('Updated data:', updatedData);
              alert('Article saved successfully!');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          const newUser = {
            email: userEmail,
            savedArticles: [article],
          };
          fetch('http://localhost:3030/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then((createdData) => {
              console.log('Created data:', createdData);
              alert('Article saved successfully!');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
}