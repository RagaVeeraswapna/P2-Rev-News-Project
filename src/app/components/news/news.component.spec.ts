import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the DashboardComponent
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewsComponent, DashboardComponent], // Add DashboardComponent to the declarations array
        imports: [HttpClientTestingModule, ApolloTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});