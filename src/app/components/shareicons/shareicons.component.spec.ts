import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareiconsComponent } from './shareicons.component';

describe('ShareiconsComponent', () => {
  let component: ShareiconsComponent;
  let fixture: ComponentFixture<ShareiconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareiconsComponent]
    });
    fixture = TestBed.createComponent(ShareiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
