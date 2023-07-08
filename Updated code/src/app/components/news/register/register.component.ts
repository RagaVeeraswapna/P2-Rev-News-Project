import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Users } from 'src/app/users/users/users';

import { CREATE_User } from 'src/app/users/users/gql/users-mutation';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { GET_USERS } from 'src/app/users/users/gql/users-query';

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  userCountry!: string;
  apiKey = '3a1be8a602e141c4bd7ad01b6431cb92';
  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apollo: Apollo,
    private router: Router
  ) {}

  usersForm: Users = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
  };

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/),
          ],
        ],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  get registrationFormControl() {
    return this.form.controls;
  }

  getUserCountry(): void {
    this.http
      .get<any>(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`)
      .subscribe(
        (response) => {
          this.userCountry = response.country.iso_code.toLowerCase();
          console.log('User Country ISO Code:', this.userCountry);
        },
        (error) => {
          console.error('Error retrieving user country:', error);
        }
      );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ match: true });
    } else {
      if (confirmPasswordControl) {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  create() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const firstName = formValues.firstName;
      const lastName = formValues.lastName;
      const email = formValues.email;
      const password = formValues.password;
      const phone = formValues.phone;
      const country = formValues.country;

      this.apollo
        .watchQuery<{ allUsers: Users[] }>({
          query: GET_USERS,
        })
        .valueChanges.subscribe(({ data }) => {
          const userByEmail = data.allUsers.find(
            (user: Users) => user.email === email
          );

          if (userByEmail) {
            alert('An account with this email already exists. Please login.');
            this.router.navigate(['/login']);
          } else {
            this.apollo
              .mutate<{ createUser: Users }>({
                mutation: CREATE_User,
                variables: {
                  firstName,
                  lastName,
                  email,
                  password,
                  phone,
                  country,
                },
              })
              .subscribe(({ data }) => {
                const newUser = data?.createUser;

                this.http
                  .post('http://localhost:3030/users', newUser)
                  .subscribe(
                    (response) => {
                      console.log('User data saved successfully', response);
                    },
                    (error) => {
                      console.error('Error saving user data:', error);
                    }
                  );

                this.router.navigate(['/login']);
              });
          }
        });
    } else {
      console.log('Form is invalid');
      alert('Registration Unsuccessful!');
    }
  }
}
