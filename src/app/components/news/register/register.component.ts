import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Users } from 'src/app/users/users/users';

import { CREATE_User } from 'src/app/users/users/gql/users-mutation';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { GET_USERS } from 'src/app/users/users/gql/users-query';

interface Country {
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
    passwordFieldType: string = 'password';

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private apollo: Apollo,
        private router: Router
    ) { }

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
                lastName: [''],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/
                        ),
                    ],
                ],
                confirmPassword: ['', Validators.required],
                phone: ['', [ Validators.pattern('^[0-9]{10}$')]],
                country: ['', Validators.required],
            },
            {
                validators: this.passwordMatchValidator.bind(this),
            }
        );

        this.getCountries();
    }

    get registrationFormControl() {
        return this.form.controls;
    }

    getCountries() {
        this.http
            .get<any>('https://restcountries.com/v2/all')
            .subscribe(
                (response) => {
                    this.countries = response.map((country: any) => ({
                        name: country.name,
                    }));
                    // console.log('Countries:', this.countries);
                },
                (error) => {
                    console.error('Error retrieving countries:', error);
                }
            );
    }

    showPassword: boolean = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    showConfirmPassword: boolean = false;
    toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
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
            confirmPasswordControl?.setErrors(null);
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
                .query<{ allUsers: Users[] }>({
                    query: GET_USERS,
                })
                .subscribe(({ data }) => {
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
                                            alert("Registration Successful!")
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
