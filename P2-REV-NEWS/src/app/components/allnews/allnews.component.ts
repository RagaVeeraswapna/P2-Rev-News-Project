import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Newsservice } from 'src/app/services/news.service';
import { CategoryService } from 'src/app/services/category.service';
import { Apollo } from 'apollo-angular';
import { ShareiconsComponent } from '../shareicons/shareicons.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-allnews',
    templateUrl: './allnews.component.html',
    styleUrls: ['./allnews.component.css']
})
export class AllnewsComponent {
    news: any[] = [];
    paginatedNews: any[] = [];
    fromDate: Date = new Date();
    toDate: Date = new Date();
    query: string = 'apple';
    sortBy: string = 'popularity';
    pageSize: number = 12;
    pageSizeOptions: number[] = [12, 24, 60];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private newsService: Newsservice,
        private categoryService: CategoryService,
        private apollo: Apollo,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.fromDate.setDate(this.fromDate.getDate() - 1);
        this.categoryService.searchQuery$.subscribe((query) => {
            if (query) {
                this.query = query;
                this.fetchEverythingNews(query, this.fromDate, this.toDate, this.sortBy);
            } else {
                this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
            }
        });
    }

    fromDateChange(date: Date) {
        this.fromDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
    }

    toDateChange(date: Date) {
        this.toDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
    }

    selectSortBy(sortBy: string) {
        this.sortBy = sortBy;
        this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
    }

    fetchEverythingNews(query: string, fromDate: Date, toDate: Date, sortBy: string) {
        this.newsService.fetchEverythingNews(query, fromDate, toDate, sortBy).subscribe(
            (data: any) => {
                this.news = data.articles;
                this.paginatedNews = this.news.slice(0, this.pageSize);
                this.paginator.pageIndex = 0;
                this.paginator.length = this.news.length;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    saveArticle(article: any) {
        const userEmail = sessionStorage.getItem('userEmail');

        fetch('http://localhost:3030/savedArticles')
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
                    fetch(`http://localhost:3030/savedArticles/${user.id}`, {
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
                    fetch('http://localhost:3030/savedArticles', {
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

    openShareDialog(article: any): void {
        const dialogRef = this.dialog.open(ShareiconsComponent, {
          width: '500px',
          height: '200px',
          data: {
            article: article
          }
        });
      
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      }

    onPageChange(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.paginatedNews = this.news.slice(startIndex, endIndex);
    }
}
