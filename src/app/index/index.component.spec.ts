import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { MatCardModule } from '@angular/material/card'; // Import the MatCardModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from '../components/news/dashboard/dashboard.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent,DashboardComponent],
      imports: [MatCardModule, HttpClientTestingModule], // Add MatCardModule and HttpClientTestingModule here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});