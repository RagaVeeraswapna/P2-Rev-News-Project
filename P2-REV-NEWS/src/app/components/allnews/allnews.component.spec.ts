import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllnewsComponent } from './allnews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { DashboardComponent } from '../news/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AllnewsComponent', () => {
  let component: AllnewsComponent;
  let fixture: ComponentFixture<AllnewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllnewsComponent,DashboardComponent],
      imports:[HttpClientTestingModule,ApolloTestingModule,MatCardModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatPaginatorModule,FormsModule,BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(AllnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
