import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { GraphQLModule } from './graphql.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NewsComponent } from './components/news/news.component';
import { CategoryService } from './services/category.service';
import { Newsservice } from './services/news.service';
import { RegisterComponent } from './components/news/register/register.component';
import { LoginComponent } from './components/news/login/login.component';
import { ProfileComponent } from './components/news/profile/profile.component';
import { SavedNewsComponent } from './components/saved-news/saved-news.component';

import { DashboardComponent } from './components/news/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SavedNewsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    GraphQLModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
    
  ],
  providers: [CategoryService,Newsservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
