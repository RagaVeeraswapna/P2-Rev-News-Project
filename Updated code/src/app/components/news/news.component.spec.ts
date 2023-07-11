// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { Apollo, QueryRef } from 'apollo-angular';
// import { CategoryService } from 'src/app/services/category.service';
// import { Newsservice } from 'src/app/services/news.service';
// import { of, Observable } from 'rxjs';
// import { ApolloQueryResult, OperationVariables } from '@apollo/client/core';
// import { NewsComponent } from './news.component';

// describe('NewsComponent', () => {
//   let component: NewsComponent;
//   let fixture: ComponentFixture<NewsComponent>;
//   let newsService: Newsservice;
//   let categoryService: CategoryService;
//   let apollo: Apollo;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [NewsComponent],
//       providers: [Newsservice, CategoryService, Apollo]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NewsComponent);
//     component = fixture.componentInstance;
//     newsService = TestBed.inject(Newsservice);
//     categoryService = TestBed.inject(CategoryService);
//     apollo = TestBed.inject(Apollo);
  
//     spyOn(localStorage, 'getItem').and.returnValue('userCountry');
//     spyOn(categoryService, 'setSelectedCountry');
//     spyOn(categoryService, 'getSelectedCountry').and.returnValue('selectedCountry');
//     spyOn(categoryService, 'getSelectedCategory').and.returnValue('selectedCategory');
//     spyOn(newsService, 'fetchNews').and.returnValue(
//       of({
//         articles: [
//           { title: 'News 1', category: 'general', country: 'userCountry' },
//           { title: 'News 2', category: 'general', country: 'userCountry' }
//         ]
//       })
//     );
  
//     const valueChanges$: Observable<any> = of({
//       data: {
//         allUsers: [{ email: 'userEmail' }]
//       },
//       loading: false,
//       networkStatus: 7
//     });
  
//     spyOn(apollo, 'watchQuery').and.returnValue({
//       valueChanges: valueChanges$ as Observable<ApolloQueryResult<unknown>>,
//       queryId: 'mock-query-id',
//       obsQuery: {} as any,
//       options: {} as any,
//       variables: {} as any
//     } as unknown as QueryRef<unknown, OperationVariables>);
    
//     spyOn(window, 'fetch').and.returnValue(
//       Promise.resolve({
//         json: () => Promise.resolve([{ email: 'userEmail', id: 1, savedArticles: [] }])
//       }) as Promise<Response>
//     );
    
//     fixture.detectChanges();
//   });
    
  
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch news for a user with a selected country', () => {
//     component.ngOnInit();
//     expect(localStorage.getItem).toHaveBeenCalledWith('userCountry');
//     expect(categoryService.setSelectedCountry).toHaveBeenCalledWith('userCountry');
//     expect(categoryService.getSelectedCountry).toHaveBeenCalled();
//     expect(categoryService.getSelectedCategory).toHaveBeenCalled();
//     expect(newsService.fetchNews).toHaveBeenCalledWith('general', 'userCountry');
//     expect(component.news.length).toBe(2);
//     expect(component.filteredNews.length).toBe(2);
//   });

//   it('should fetch news for a user without a selected country', () => {
//     component.ngOnInit();
//     expect(categoryService.getSelectedCountry).toHaveBeenCalled();
//     expect(categoryService.getSelectedCategory).toHaveBeenCalled();
//     expect(newsService.fetchNews).toHaveBeenCalledWith('selectedCategory', 'selectedCountry');
//     expect(component.news.length).toBe(2);
//     expect(component.filteredNews.length).toBe(2);
//   });

//   it('should filter news based on search query', () => {
//     component.news = [
//       { title: 'News 1', description: 'Lorem ipsum', category: 'general', country: 'us' },
//       { title: 'News 2', description: 'Dolor sit amet', category: 'general', country: 'us' },
//       { title: 'Sports News', description: 'Lorem ipsum', category: 'sports', country: 'us' }
//     ];
//     component.filterNews('Lorem');
//     expect(component.filteredNews.length).toBe(2);
//     expect(component.filteredNews[0].title).toBe('News 1');
//     expect(component.filteredNews[1].title).toBe('Sports News');
//   });

//   it('should save an article for an existing user', async () => {
//     spyOn(sessionStorage, 'getItem').and.returnValue('userEmail');
//     await component.saveArticle({ title: 'News 1', category: 'general', country: 'us' });
//     expect(sessionStorage.getItem).toHaveBeenCalledWith('userEmail');
//     expect(window.fetch).toHaveBeenCalledWith('http://localhost:3030/savedArticles');
//     // Add more expectations as needed
//   });

//   it('should save an article for a new user', async () => {
//     // Mock sessionStorage.getItem to return a user email
//     spyOn(sessionStorage, 'getItem').and.returnValue('userEmail');

//     // Set up a mock response object
//     const mockResponse: Response = new Response(JSON.stringify([]), {
//       status: 200,
//       statusText: 'OK',
//       headers: { 'Content-Type': 'application/json' }
//     });

//     // Set up a spy for fetch method to mock the API call
//     spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

//     // Call saveArticle method
//     await component.saveArticle({ title: 'News 1', category: 'general', country: 'us' });

//     // Expectations
//     expect(sessionStorage.getItem).toHaveBeenCalledWith('userEmail');
//     expect(window.fetch).toHaveBeenCalledWith('http://localhost:3030/savedArticles');
//     // Add more expectations as needed
//   });

//   it('should return the correct category display name', () => {
//     component.selectedCategory = 'health';
//     expect(component.getCategoryDisplayName()).toBe('Health News');
//     component.selectedCategory = 'sports';
//     expect(component.getCategoryDisplayName()).toBe('Sports News');
//     component.selectedCategory = 'business';
//     expect(component.getCategoryDisplayName()).toBe('Business News');
//     component.selectedCategory = 'entertainment';
//     expect(component.getCategoryDisplayName()).toBe('Entertainment News');
//     component.selectedCategory = 'science';
//     expect(component.getCategoryDisplayName()).toBe('Science News');
//     component.selectedCategory = 'technology';
//     expect(component.getCategoryDisplayName()).toBe('Technology News');
//     component.selectedCategory = '';
//     expect(component.getCategoryDisplayName()).toBe('General News');
//   });
// });
