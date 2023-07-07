import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Newsservice } from 'src/app/services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;

 searchQuery: string = '';
	selectedCountry: string = 'us';
	userCountry!: string;
	countries: any[] = [];
	apiKey = '3a1be8a602e141c4bd7ad01b6431cb92';

	constructor(private categoryService: CategoryService, private http: HttpClient,private router:Router) { }

	ngOnInit() {
		this.getUserCountry();
		this.getCountries();
    const loggedInUserId = sessionStorage.getItem('userEmail');
    this.isLoggedIn = loggedInUserId !== null;

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

	getCountries() {
		this.http.get<any>('https://restcountries.com/v2/all').subscribe(
			(response) => {
				this.countries = response.map((country: any) => ({
					code: country.alpha2Code,
					name: country.name
				}));
			},
			(error) => {
				console.error('Error retrieving countries:', error);
			}
		);
	}

	updateSelectedCountry() {
		this.categoryService.setSelectedCountry(this.selectedCountry);
	}

  logout() {
    sessionStorage.getItem("userId");
    sessionStorage.removeItem("userId"); 
    
    sessionStorage.removeItem("userEmail");
    this.router.navigate(['/login']);
  }
  

}
