import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from 'src/app/users/users/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Users | undefined;
  resetPassword: string = '';
  resetConfirmPassword: string = '';
  resetError: string | null = null;

  

  constructor(private apollo: Apollo,private router:Router) {}

  ngOnInit(): void {
    const loggedInUserId = sessionStorage.getItem('userId');

    if (loggedInUserId) {
      const GET_USER = gql`
        query GetUser($userFilter: UserFilter!) {
          allUsers(filter: $userFilter) {
            id
            firstName
            lastName
            email
            country
          }
        }
      `;

      this.apollo
        .watchQuery<{ allUsers: Users[] }>({
          query: GET_USER,
          variables: { userFilter: { id: loggedInUserId } },
        })
        .valueChanges.pipe(
          map((result) => result.data?.allUsers),
          map((users) => users?.[0])
        )
        .subscribe((user) => {
          this.user = user;
        });
    }
  }

  deleteUser() {
    const DELETE_USER = gql`
      mutation ($id: ID!) {
        removeUser(id: $id) {
          id
          firstName
          lastName
          email
          country
        }
      }
    `;

    this.apollo
      .mutate<{ removeUser: Users }>({
        mutation: DELETE_USER,
        variables: { id: this.user?.id },
      })
      .subscribe((result) => {
        // Handle the result after deleting the user
        console.log(result);
        this.router.navigateByUrl('/login');

      });
  }
//update function
updateUser() {
  const loggedInUserId = sessionStorage.getItem('userId');

  if (!loggedInUserId || !this.user) {
    return;
  }

  const { firstName, lastName, email, country } = this.user;
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $id: ID!
      $firstName: String!
      $lastName: String!
      $email: String!
      $country: String!
    ) {
      updateUser(
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        country: $country
      ) {
        id
        firstName
        lastName
        email
        country
      }
    }
  `;

  this.apollo
    .mutate<{ updateUser: Users }>({
      mutation: UPDATE_USER,
      variables: {
        id: loggedInUserId,
        firstName,
        lastName,
        email,
        country
      }
    })
    .subscribe((result) => {
      const updatedUser = result.data?.updateUser;
      if (updatedUser) {
        this.user = { ...updatedUser }; // Update the user object with the updated values
      }
    });


}

//reset function

resetUserPassword() {
  if (!this.resetPassword || !this.resetConfirmPassword) {
    this.resetError = 'Please enter a new password and confirm it.';
    return;
  }

  if (this.resetPassword !== this.resetConfirmPassword) {
    this.resetError = 'Passwords do not match.';
    return;
  }

  const RESET_PASSWORD = gql`
    mutation ResetPassword($id: ID!, $password: String!, $confirmPassword: String!) {
      updateUser(id: $id, password: $password, confirmPassword: $confirmPassword) {
        id
        firstName
        lastName
        email
        country
      }
    }
  `;

  this.apollo
    .mutate<{ updateUser: Users }>({
      mutation: RESET_PASSWORD,
      variables: {
        id: this.user?.id,
        password: this.resetPassword,
        confirmPassword: this.resetConfirmPassword,
      },
    })
    .subscribe(
      (result) => {
        const updatedUser = result.data?.updateUser;
        if (updatedUser) {
          this.user = { ...updatedUser }; // Update the user object with the updated values
        }
        this.resetPassword = '';
        this.resetConfirmPassword = '';
        this.resetError = null;
      },
      (error) => {
        console.error(error);
        // Handle error if the password reset fails
        this.resetError = 'An error occurred while resetting the password. Please try again.';
      }
    );
}
}







  

