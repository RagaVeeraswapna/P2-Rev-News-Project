import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Users } from 'src/app/users/users/users';
import { GET_Search } from 'src/app/users/users/gql/users-query';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  userCountry!: string;
  apiKey = '3a1be8a602e141c4bd7ad01b6431cb92';

  constructor(private apollo: Apollo, private router: Router, private http: HttpClient,private categoryService:CategoryService) {}

  ngOnInit(): void {}

  login(loginForm: any) {
    // console.log(loginForm.email);
    // console.log(loginForm.password);
    this.apollo
      .watchQuery<{ allUsers: Users[] }>({
        query: GET_Search,
        variables: { userFilter: { email: loginForm.email } },
      })
      .valueChanges.subscribe(({ data }) => {
        var userByEmail = data.allUsers[0];
        sessionStorage.setItem("userDetails", JSON.stringify(userByEmail)); 
        sessionStorage.setItem("userEmail",userByEmail.email);
        this.router.navigate(['/news']);
      });

      this.getUserCountry();
  }

  getUserCountry(): void {
    this.http.get<any>(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`).subscribe(
        (response) => {
            this.userCountry = response.country.iso_code.toLowerCase();
            console.log('User Country ISO Code:', this.userCountry);
            sessionStorage.setItem("LiveCountry",this.userCountry);
            this.categoryService.setLiveCountry(this.userCountry);
        },
        (error) => {
            console.error('Error retrieving user country:', error);
        }
    );
    
}
}