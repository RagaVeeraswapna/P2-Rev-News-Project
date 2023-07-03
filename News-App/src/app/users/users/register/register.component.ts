import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users';
import { CREATE_User } from '../gql/users-mutation';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';


interface Country {
    code: string;
    name: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    userCountry!: string;
    apiKey = '3a1be8a602e141c4bd7ad01b6431cb92';
    countries: Country[] = [];
    



    constructor(private formBuilder: FormBuilder, private http: HttpClient,private apollo:Apollo,private router:Router) { }

    usersForm:Users={
        id:0,
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        country:''
    };

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
            ]],
            confirmPassword: ['', Validators.required],
            country: ['', Validators.required]
        }, {
            validators: this.passwordMatchValidator
        });

        // this.getCountries();
    }

    get registrationFormControl() {
        return this.form.controls;
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
    //     this.http.get<any>('https://restcountries.com/v2/all')
    //         .subscribe(
    //             (response) => {
    //                 this.countries = response.map((country: any) => ({
    //                     code: country.alpha2Code,
    //                     name: country.name
    //                 }));
    //                 console.log('Countries:', this.countries);
    //             },
    //             (error) => {
    //                 console.error('Error retrieving countries:', error);
    //             }
    //         );
    // }

    passwordMatchValidator(formGroup: FormGroup) {
        const passwordControl = formGroup.get('password');
        const confirmPasswordControl = formGroup.get('confirmPassword');

        if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ match: true });
        } else {
            if (confirmPasswordControl) {
                confirmPasswordControl.setErrors(null);
            }
        }
    }

    // onCountryInputFocus() {
    //     this.userCountry = this.getUserCountry
    //   }


    // onSubmit() {
    //     const registrationData = this.form.value;
    //     this.http.post('http://localhost:3000/registrations', registrationData)
    //         .subscribe(response => {
    //             console.log('Registration data saved successfully', response);
    //         }, error => {
    //             console.error('Error saving registration data:', error);
    //         });
    // }
    create() {
        if (this.form.valid) {
          const formValues = this.form.value;
          const firstName = formValues.firstName;
          const lastName = formValues.lastName;
          const email = formValues.email;
          const password = formValues.password;
          const confirmPassword = formValues.confirmPassword;
          const country = formValues.country;
      
          // Use the values as needed
          console.log('First Name:', firstName);
          console.log('Last Name:', lastName);
          console.log('Email:', email);
          console.log('Password:', password);
          console.log('Confirm Password:', confirmPassword);
          console.log('Country:', country);
      
          // Call your mutation or perform any other actions with the form values
          this.apollo.mutate<{ createUser: Users}>({
            mutation: CREATE_User,
            variables: {
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              country,
            }
          }).subscribe(({ data }) => {
            // Handle the response from the mutation
            console.log('Added:', data?.createUser);
            // Navigate to another page if needed
             this.router.navigate(['/']);
          });
        } else {
          // Handle invalid form
          console.log('Form is invalid');
        }
      }
}
