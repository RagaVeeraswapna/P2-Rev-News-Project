import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, of } from 'rxjs';
import { Users } from '../users';
import { GET_USERS } from '../gql/users-query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apollo:Apollo){}

  allUsers$: Observable<Users[]> = of([]);

  ngOnInit(): void {
    this.allUsers$=this.apollo
    .watchQuery<{allUsers: Users[]}>({ query:GET_USERS})
    .valueChanges.pipe(map((result)=> result.data.allUsers));
  }

}