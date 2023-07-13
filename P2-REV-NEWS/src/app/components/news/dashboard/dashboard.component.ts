import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Newsservice } from 'src/app/services/news.service';
import { CategoryService } from 'src/app/services/category.service';
import { Country, countries } from '../../model_classes/countries';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	isLoggedIn: boolean = false;
	countries: Country[] = countries;
	news: any[] = [];
    paginatedNews: any[] = [];
    fromDate: Date = new Date();
    toDate: Date = new Date();
    query: string = 'general';
    sortBy: string = 'popularity';
    pageSize: number = 12;
    pageSizeOptions: number[] = [12, 24, 60];

	searchQuery: string = '';
	selectedCountry: string = 'us';
	userCountry!: string;
	// countries: any[] = [];
	apiKey = '3a1be8a602e141c4bd7ad01b6431cb92';

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(private newsService: Newsservice,private categoryService: CategoryService, private http: HttpClient, private router: Router,private authGuard:AuthGuard) { }

	ngOnInit() {
		this.getUserCountry();
		// this.getCountries();
		const loggedInUserId = sessionStorage.getItem('userEmail');
		this.isLoggedIn = loggedInUserId !== null;
		this.authGuard.setLoggedInStatus(this.isLoggedIn);
		this.categoryService.searchQuery$.subscribe((query) => {
            if (query) {
                this.query = query;
                this.fetchEverythingNews(query, this.fromDate, this.toDate, this.sortBy);
            } else {
                this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
            }
        });

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

	selectCategory(selectedCategory: string) {
		this.categoryService.setSelectedCategory(selectedCategory);
		this.categoryService.setSearchQuery(this.searchQuery);
	}

	selectCountry(selectedCountry: string) {
		this.selectedCountry = selectedCountry;
		this.categoryService.setSelectedCountry(selectedCountry);
		this.categoryService.setSearchQuery(this.searchQuery);
	}

	searchNews() {
		console.log(this.searchQuery);
		this.categoryService.setSearchQuery(this.searchQuery);
	}
	selectSortBy(sortBy: string) {
        this.sortBy = sortBy;
        this.fetchEverythingNews(this.query, this.fromDate, this.toDate, this.sortBy);
    }

	getUserCountry(): void {
		this.http.get<any>(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`).subscribe(
			(response) => {
				this.userCountry = response.country.iso_code.toLowerCase();
				console.log('User Country ISO Code:', this.userCountry);
			},
			(error) => {
				console.error('Error retrieving user country:', error);
			}
		);
	}

	// getCountries() {
	// 	this.http.get<any>('https://restcountries.com/v2/all').subscribe(
	// 		(response) => {
	// 			this.countries = response.map((country: any) => ({
	// 				code: country.alpha2Code,
	// 				name: country.name
	// 			}));
	// 		},
	// 		(error) => {
	// 			console.error('Error retrieving countries:', error);
	// 		}
	// 	);
	// }

	// updateSelectedCountry() {
	// 	this.categoryService.setSelectedCountry(this.selectedCountry);
	// }

	openMenu(event: Event): void {
		event.preventDefault();
		const sidebar = document.getElementById("sidebar");

		if (sidebar) {
			sidebar.style.display = "block";
		}
	}

	closeMenu(event: Event): void {
		event.preventDefault();
		const sidebar = document.getElementById("sidebar");

		if (sidebar) {
			sidebar.style.display = "none";
		}
	}

	logout() {
		sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userEmail");
  this.authGuard.setLoggedInStatus(false);
  this.router.navigate(['/']);
	}


}
