import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteProfileComponent } from './delete-profile.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteProfileComponent', () => {
  let component: DeleteProfileComponent;
  let fixture: ComponentFixture<DeleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProfileComponent],
      imports: [ApolloTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}, // Provide any necessary data here
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});