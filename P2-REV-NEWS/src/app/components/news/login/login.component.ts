import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Users } from 'src/app/users/users/users';
import { GET_Search } from 'src/app/users/users/gql/users-query';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { AuthGuard } from 'src/app/auth.guard';

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

  constructor(private apollo: Apollo, private router: Router, private http: HttpClient,private categoryService:CategoryService,private authGuard:AuthGuard) {}

  ngOnInit(): void {}

  login(loginForm: any) {
    this.apollo
  .watchQuery<{ allUsers: Users[] }>({
    query: GET_Search,
    variables: { userFilter: { email: loginForm.email, password: loginForm.password } },
  })
  .valueChanges.subscribe(({ data }) => {
    const userByEmailAndPassword = data.allUsers[0];
    if (userByEmailAndPassword) {
      sessionStorage.setItem("userDetails", JSON.stringify(userByEmailAndPassword));
      // sessionStorage.setItem("userId",userByEmailAndPassword.email);
      sessionStorage.setItem("userEmail", userByEmailAndPassword.email);
      console.log(userByEmailAndPassword.email);
      this.authGuard.setLoggedInStatus(true);
      this.router.navigate(['/news']);
    } else {
      alert("Invalid email or password");
    }
  });
      this.getUserCountry();
  }

  getUserCountry(): void {
    this.http.get<any>(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`).subscribe(
      (response) => {
        this.userCountry = response.country.iso_code.toLowerCase();
        console.log('User Country ISO Code:', this.userCountry);
        this.categoryService.setLiveCountry(this.userCountry);
        localStorage.setItem('userCountry', this.userCountry);
      },
      (error) => {
        console.error('Error retrieving user country:', error);
      }
    );
  }
}