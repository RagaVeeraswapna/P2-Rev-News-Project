import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apollo:Apollo,private router:Router){}

  userForm={
    email:'',
    password:''
  }
  ngOnInit(): void {
    
  }
  login(loginForm:any){
    console.log(loginForm.value);
  }

}
