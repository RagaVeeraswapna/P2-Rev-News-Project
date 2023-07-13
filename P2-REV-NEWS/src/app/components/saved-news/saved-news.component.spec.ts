import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedNewsComponent } from './saved-news.component';
import { DashboardComponent } from '../news/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SavedNewsComponent', () => {
  let component: SavedNewsComponent;
  let fixture: ComponentFixture<SavedNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedNewsComponent, DashboardComponent],
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});